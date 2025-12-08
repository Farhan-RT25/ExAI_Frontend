const API_BASE = import.meta.env.VITE_API_BASE;
import { getAccessToken } from "./auth";

// =====================================================
// TYPES
// =====================================================

export interface DraftCategorySetting {
  id: string;
  name: string;
  enabled: boolean;
}

export interface DraftSettings {
  enabled: boolean;
  notify_on_draft_ready: boolean;
  selected_categories: string[];
  all_categories: DraftCategorySetting[];
  updated_at?: string;
}

export interface DraftSettingsRequest {
  enabled: boolean;
  notify_on_draft_ready: boolean;
  selected_categories: string[];
}

// =====================================================
// API FUNCTIONS
// =====================================================

/**
 * Get user's draft reply settings
 */
export const getDraftSettings = async (
  userId: number
): Promise<DraftSettings> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const response = await fetch(`${API_BASE}/draft-settings/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to fetch draft settings" 
    }));
    throw new Error(error.detail || error.message || "Failed to fetch draft settings");
  }

  return response.json();
};

/**
 * Save user's draft reply settings
 */
export const saveDraftSettings = async (
  userId: number,
  settings: DraftSettingsRequest
): Promise<any> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const response = await fetch(`${API_BASE}/draft-settings/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(settings),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to save draft settings" 
    }));
    throw new Error(error.detail || error.message || "Failed to save draft settings");
  }

  return response.json();
};

