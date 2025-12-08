const API_BASE = import.meta.env.VITE_API_BASE;
import { getAccessToken } from "./auth";

// =====================================================
// TYPES
// =====================================================

export interface ConnectionAccount {
  email_account_id: number;
  email: string;
  connected: boolean;
  sync_status?: string;
  last_synced_at?: string;
}

export interface ConnectionProvider {
  id: string;
  provider: string;
  description: string;
  accounts: ConnectionAccount[];
}

export interface ConnectionsResponse {
  providers: ConnectionProvider[];
}

// =====================================================
// API FUNCTIONS
// =====================================================

/**
 * Get all email connections grouped by service provider
 */
export const getConnections = async (): Promise<ConnectionsResponse> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const response = await fetch(`${API_BASE}/connections`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to fetch connections" 
    }));
    throw new Error(error.detail || error.message || "Failed to fetch connections");
  }

  return response.json();
};

/**
 * Get OAuth authorization URL for an email account
 */
export const getAuthorizationUrl = async (emailAccountId: number): Promise<string> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const response = await fetch(`${API_BASE}/oauth/authorize/email/${emailAccountId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to get authorization URL" 
    }));
    throw new Error(error.detail || error.message || "Failed to get authorization URL");
  }

  const data = await response.json();
  return data.authorization_url;
};

/**
 * Delete/disconnect an email account
 */
export const disconnectEmailAccount = async (emailAccountId: number): Promise<void> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const response = await fetch(`${API_BASE}/emails/${emailAccountId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to disconnect email account" 
    }));
    throw new Error(error.detail || error.message || "Failed to disconnect email account");
  }
};

