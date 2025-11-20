const API_BASE = import.meta.env.VITE_API_BASE;

// Types
export interface SignupRequest {
  email: string;
  full_name: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  email: string;
  full_name: string;
  user_id: number;
  status: string;
  profile_image_url: string;
  created_at: string;
  last_login: string;
  oauth_accounts: any[];
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
  redirect?: string;
}

export interface EmailAccount {
  email_account_id: number;
  email: string;
  provider: string;
  is_authorized: boolean;
  created_at: string;
}

export interface EmailAccountsResponse {
  email_accounts: EmailAccount[];
  total: number;
}

// Helper function to decode JWT token (basic decoding without verification)
export const decodeJWT = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to decode JWT:', e);
    return null;
  }
};

// Helper function to create a minimal User object from JWT token
export const createUserFromToken = (token: string): User | null => {
  const payload = decodeJWT(token);
  if (!payload || !payload.sub || !payload.user_id) {
    return null;
  }
  
  return {
    email: payload.sub,
    full_name: payload.sub.split('@')[0] || '', // Fallback to email prefix
    user_id: payload.user_id,
    status: 'active',
    profile_image_url: '',
    created_at: new Date().toISOString(), // Fallback - we don't have this in token
    last_login: new Date().toISOString(),
    oauth_accounts: [],
  };
};

// Helper function to create request headers with cache prevention
const createNoCacheHeaders = (token?: string): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'ngrok-skip-browser-warning': 'true',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Check if user has any email accounts added
 */
export const checkUserEmailAccounts = async (): Promise<boolean> => {
  const token = getAccessToken();
  if (!token) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE}/emails`, {
      method: 'GET',
      headers: createNoCacheHeaders(token),
    });

    if (!response.ok) {
      console.error('Failed to check email accounts');
      return false;
    }

    const data: EmailAccountsResponse = await response.json();
    return data.email_accounts && data.email_accounts.length > 0;
  } catch (error) {
    console.error('Error checking email accounts:', error);
    return false;
  }
};

// API Functions
export const signup = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: createNoCacheHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Signup failed' }));
    
    // Handle specific error cases
    if (error.message && error.message.includes('You already have an account')) {
      throw new Error('You already have an account. Please login instead.');
    }
    
    throw new Error(error.detail || error.message || 'Signup failed');
  }

  return response.json();
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: createNoCacheHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Login failed' }));
    
    // Handle specific error cases
    if (error.error && error.error.includes('Invalid User – Sign up first')) {
      throw new Error('Invalid User – Sign up first');
    }
    
    throw new Error(error.detail || error.error || error.message || 'Login failed');
  }

  return response.json();
};

/**
 * Enhanced login function that determines correct redirect
 */
export const loginAndGetRedirect = async (credentials: LoginRequest): Promise<AuthResponse & { redirect: string }> => {
  try {
    // Perform login
    const response = await login(credentials);
    
    if (response.access_token) {
      // Store token temporarily to check email accounts
      const currentToken = getAccessToken();
      localStorage.setItem('access_token', response.access_token);
      
      // Check if user has email accounts
      const hasEmailAccounts = await checkUserEmailAccounts();
      
      // Restore previous token if login failed
      if (!hasEmailAccounts && currentToken) {
        localStorage.setItem('access_token', currentToken);
      }
      
      return {
        ...response,
        redirect: hasEmailAccounts ? 'dashboard' : 'onboarding'
      };
    }
    
    return {
      ...response,
      redirect: 'login'
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Enhanced signup function that determines correct redirect
 */
export const signupAndGetRedirect = async (data: SignupRequest): Promise<AuthResponse & { redirect: string }> => {
  try {
    const response = await signup(data);
    
    if (response.access_token) {
      // Store token temporarily to check email accounts
      localStorage.setItem('access_token', response.access_token);
      
      // Check if user has email accounts (unlikely for new user, but check anyway)
      const hasEmailAccounts = await checkUserEmailAccounts();
      
      return {
        ...response,
        redirect: hasEmailAccounts ? 'dashboard' : 'onboarding'
      };
    }
    
    return {
      ...response,
      redirect: 'signup'
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Handle OAuth callback and determine redirect
 */
export const handleOAuthCallbackWithRedirect = async (token: string): Promise<{ redirect: string }> => {
  try {
    // Store the token
    localStorage.setItem('access_token', token);
    
    // Fetch user profile to store user data
    try {
      const user = await getProfile(token);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (profileError) {
      console.warn('Failed to fetch profile after OAuth:', profileError);
      // Continue anyway, we have the token
    }
    
    // Check if user has email accounts
    const hasEmailAccounts = await checkUserEmailAccounts();
    
    return {
      redirect: hasEmailAccounts ? 'dashboard' : 'onboarding'
    };
  } catch (error) {
    console.error('Error handling OAuth callback:', error);
    // Clear invalid token
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    throw error;
  }
};

export const getProfile = async (token: string): Promise<User> => {
  // Check if API_BASE is configured
  if (!API_BASE) {
    console.error('VITE_API_BASE is not configured');
    throw new Error('API base URL is not configured. Please check your environment variables.');
  }

  const url = `${API_BASE}/auth/profile`;
  console.log('Fetching profile from:', url);

  const response = await fetch(url, {
    method: 'GET',
    headers: createNoCacheHeaders(token),
  });

  // Check content type before parsing
  const contentType = response.headers.get('content-type');
  const isJSON = contentType && contentType.includes('application/json');
  console.log('Profile response status:', response.status, 'Content-Type:', contentType);

  if (!response.ok) {
    let errorMessage = 'Failed to fetch profile';
    
    if (isJSON) {
      try {
        const error = await response.json();
        errorMessage = error.detail || error.message || errorMessage;
      } catch (e) {
        // If JSON parsing fails, use default message
      }
    } else {
      // If response is HTML (like an error page), try to get status text
      errorMessage = response.statusText || `HTTP ${response.status}: Failed to fetch profile`;
      
      // If it's a 401, the token is likely invalid
      if (response.status === 401) {
        errorMessage = 'Authentication failed. The token may be invalid or expired.';
      } else if (response.status === 404) {
        errorMessage = 'Profile endpoint not found. Please check your API configuration.';
      } else if (response.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      }
    }
    
    throw new Error(errorMessage);
  }

  if (!isJSON) {
    throw new Error('Invalid response format. Expected JSON but received HTML or other format. The backend may be returning an error page.');
  }

  try {
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error('Failed to parse profile response');
  }
};

export const logout = async (): Promise<void> => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: createNoCacheHeaders(token),
    });

    if (!response.ok) {
      console.warn('Logout request failed, but clearing local data anyway');
    }
  } catch (error) {
    console.warn('Logout request error, but clearing local data anyway:', error);
  }

  // Always clear local storage regardless of API call success
  clearAuthData();
};

// Helper functions for token management
export const saveAuthData = (authResponse: AuthResponse): void => {
  localStorage.setItem('access_token', authResponse.access_token);
  localStorage.setItem('user', JSON.stringify(authResponse.user));
};

export const clearAuthData = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem('access_token');
};

export const getUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  if (!token) return false;
  
  // Basic token validation - check if it's expired
  try {
    const payload = decodeJWT(token);
    if (!payload || !payload.exp) return false;
    
    // Check if token is expired (with 30 second buffer)
    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp < currentTime + 30) {
      clearAuthData();
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Token validation error:', error);
    clearAuthData();
    return false;
  }
};

/**
 * Validate current session and clear if invalid
 */
export const validateSession = async (): Promise<boolean> => {
  const token = getAccessToken();
  if (!token) return false;
  
  try {
    // Try to fetch profile to validate token
    await getProfile(token);
    return true;
  } catch (error) {
    console.warn('Session validation failed:', error);
    clearAuthData();
    return false;
  }
};

/**
 * Get user authentication status and redirect path
 */
export const getAuthStatusAndRedirect = async (): Promise<{ 
  isAuthenticated: boolean; 
  redirect: string;
  user?: User | null;
}> => {
  const token = getAccessToken();
  
  if (!token) {
    return {
      isAuthenticated: false,
      redirect: 'login'
    };
  }
  
  try {
    // Validate session
    const user = await getProfile(token);
    
    // Check if user has email accounts
    const hasEmailAccounts = await checkUserEmailAccounts();
    
    return {
      isAuthenticated: true,
      redirect: hasEmailAccounts ? 'dashboard' : 'onboarding',
      user
    };
  } catch (error) {
    console.warn('Auth status check failed:', error);
    clearAuthData();
    return {
      isAuthenticated: false,
      redirect: 'login'
    };
  }
};