import { getAccessToken } from "./auth";
import type { User } from "./auth";

const API_BASE = import.meta.env.VITE_API_BASE;

export interface ProfileUpdateRequest {
  full_name?: string;
  profile_image_url?: string;
}

export interface PasswordChangeRequest {
  current_password: string;
  new_password: string;
}

/**
 * Get user profile
 */
export const getUserProfile = async (): Promise<User> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const response = await fetch(`${API_BASE}/auth/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to fetch profile" 
    }));
    throw new Error(error.detail || error.message || "Failed to fetch profile");
  }

  return response.json();
};

/**
 * Update user profile
 */
export const updateProfile = async (data: ProfileUpdateRequest): Promise<User> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const response = await fetch(`${API_BASE}/auth/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to update profile" 
    }));
    throw new Error(error.detail || error.message || "Failed to update profile");
  }

  return response.json();
};

/**
 * Change user password
 */
export const changePassword = async (data: PasswordChangeRequest): Promise<{ message: string }> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const response = await fetch(`${API_BASE}/auth/profile/change-password`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to change password" 
    }));
    throw new Error(error.detail || error.message || "Failed to change password");
  }

  return response.json();
};

