const API_BASE = import.meta.env.VITE_API_BASE;
import { getAccessToken } from './auth';

export interface EmailInfo {
  email_account_id: number;
  email: string;
  created_at?: string;
}

export interface PendingProvider {
  provider: string;
  count: number;
  emails: EmailInfo[];
  authorization_url: string;
}

export interface PendingAuthResponse {
  total_pending: number;
  providers: PendingProvider[];
}

export interface AuthorizationUrlResponse {
  authorization_url: string;
  provider: string;
  email_accounts: string[];
  count: number;
  message: string;
  state: string;
}

export interface EmailAccountStatus {
  email_account_id: number;
  email: string;
  is_authorized: boolean;
  token_expired: boolean;
  sync_status: string;
  last_synced_at?: string;
}

export interface ProviderAuthStatus {
  provider: string;
  total: number;
  authorized: number;
  pending: number;
  emails: EmailAccountStatus[];
}

export interface AuthStatusResponse {
  providers: ProviderAuthStatus[];
}

export interface RefreshTokenResponse {
  message: string;
  provider: string;
  expires_in: number;
}

export interface RevokeAuthResponse {
  message: string;
  provider: string;
  revoked_accounts: string[];
}

/**
 * Get pending OAuth authorizations grouped by provider
 */
export const getPendingAuthorizations = async (): Promise<PendingAuthResponse> => {
  const token = getAccessToken();
  
  if (!token) {
    throw new Error('Not authenticated. Please login again.');
  }

  if (!API_BASE) {
    throw new Error('API base URL is not configured');
  }

  const response = await fetch(`${API_BASE}/oauth/pending`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to fetch pending authorizations' }));
    throw new Error(error.detail || error.message || 'Failed to fetch pending authorizations');
  }

  return response.json();
};

/**
 * Get authorization URL for a specific provider
 */
export const getAuthorizationUrl = async (provider: string): Promise<AuthorizationUrlResponse> => {
  const token = getAccessToken();
  
  if (!token) {
    throw new Error('Not authenticated. Please login again.');
  }

  if (!API_BASE) {
    throw new Error('API base URL is not configured');
  }

  console.log('Requesting authorization for provider:', provider);
  console.log('API_BASE:', API_BASE);
  console.log('Token exists:', !!token);

  const response = await fetch(`${API_BASE}/oauth/authorize/provider/${provider}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true', // Skip ngrok browser warning
    },
  });

  console.log('Response status:', response.status);
  console.log('Response headers:', Object.fromEntries(response.headers.entries()));

  // Get the response text first to see what we're actually getting
  const responseText = await response.text();
  console.log('Response body:', responseText.substring(0, 500)); // First 500 chars

  if (!response.ok) {
    // Try to parse as JSON if possible
    let errorMessage = `Server error (${response.status}): ${response.statusText}`;
    
    try {
      const errorData = JSON.parse(responseText);
      errorMessage = errorData.detail || errorData.message || errorMessage;
    } catch {
      // Not JSON, use the status text
      console.error('Non-JSON error response:', responseText);
    }
    
    throw new Error(errorMessage);
  }

  // Try to parse the successful response
  try {
    return JSON.parse(responseText);
  } catch (e) {
    console.error('Failed to parse response as JSON:', e);
    console.error('Response was:', responseText);
    throw new Error('Invalid response from server');
  }
};

/**
 * Get authorization status for all email accounts
 */
export const getAuthorizationStatus = async (): Promise<AuthStatusResponse> => {
  const token = getAccessToken();
  
  if (!token) {
    throw new Error('Not authenticated. Please login again.');
  }

  if (!API_BASE) {
    throw new Error('API base URL is not configured');
  }

  const response = await fetch(`${API_BASE}/oauth/status`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to fetch authorization status' }));
    throw new Error(error.detail || error.message || 'Failed to fetch authorization status');
  }

  return response.json();
};

/**
 * Refresh access token for a provider
 */
export const refreshProviderToken = async (provider: string): Promise<RefreshTokenResponse> => {
  const token = getAccessToken();
  
  if (!token) {
    throw new Error('Not authenticated. Please login again.');
  }

  if (!API_BASE) {
    throw new Error('API base URL is not configured');
  }

  const response = await fetch(`${API_BASE}/oauth/refresh/${provider}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to refresh token' }));
    throw new Error(error.detail || error.message || 'Failed to refresh token');
  }

  return response.json();
};

/**
 * Revoke authorization for a provider
 */
export const revokeProviderAuthorization = async (provider: string): Promise<RevokeAuthResponse> => {
  const token = getAccessToken();
  
  if (!token) {
    throw new Error('Not authenticated. Please login again.');
  }

  if (!API_BASE) {
    throw new Error('API base URL is not configured');
  }

  const response = await fetch(`${API_BASE}/oauth/revoke/provider/${provider}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to revoke authorization' }));
    throw new Error(error.detail || error.message || 'Failed to revoke authorization');
  }

  return response.json();
};