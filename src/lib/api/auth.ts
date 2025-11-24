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

/*
  Call backend /auth/status
 * Returns:
 *  {
 *    isAuthenticated: boolean,
 *    hasEmailAccount: boolean
 *  }
 */
export const getAuthStatus = async () => {
  try {
    const res = await fetch("/auth/status", {
      method: "GET",
      credentials: "include", // ⬅ important for cookies
    });
 
    if (!res.ok) {
      return { isAuthenticated: false };
    }
 
    return await res.json();
  } catch (error) {
    console.error("Error fetching auth status:", error);
    return { isAuthenticated: false };
  }
};
 
 
/*
  FRONTEND REDIRECT LOGIC
 * - Check session + onboarding
 * - Redirect to: login, onboarding/email, dashboard
 */
export const getAuthStatusAndRedirect = async () => {
  const status = await getAuthStatus();
 
  // 1️⃣ Not authenticated → go to login
  if (!status.isAuthenticated) {
    window.location.href = "/login";
    return;
  }
 
  // 2️⃣ Authenticated but NO email accounts → onboarding
  if (!status.hasEmailAccount) {
    window.location.href = "/onboarding/email";
    return;
  }
 
  // 3️⃣ Fully ready → dashboard
  window.location.href = "/dashboard";
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

// API Functions
export const signup = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Signup failed' }));
    throw new Error(error.detail || 'Signup failed');
  }

  return response.json();
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Login failed' }));
    throw new Error(error.detail || 'Login failed');
  }

  return response.json();
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
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
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

  const response = await fetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  // Clear local storage
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
};


// Helper functions for token management
export const saveAuthData = (authResponse: AuthResponse): void => {
  localStorage.setItem('access_token', authResponse.access_token);
  localStorage.setItem('user', JSON.stringify(authResponse.user));
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem('access_token');
};

export const getUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};