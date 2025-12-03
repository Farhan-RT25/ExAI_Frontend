const API_BASE = import.meta.env.VITE_API_BASE;
import { getAccessToken } from "./auth";

// =====================================================
// TYPES
// =====================================================

export interface UserProfileRequest {
  role: string;
  industry: string;
  emailVolume: string;
  communicationStyle: string;
  emailsTo: string;
}

export interface CategoryRecommendation {
  id: string;
  name: string;
  description: string;
  recommended: boolean;
  reason: string;
}

export interface CategoryRecommendationResponse {
  categories: CategoryRecommendation[];
  user_profile: UserProfileRequest;
}

export interface SaveCategoriesRequest {
  selected_category_ids: string[];
  user_profile: UserProfileRequest;
  is_categories_agree: boolean;
}

export interface OrganizeAccountResponse {
  email_account_id: number;
  account_email: string;
  organized_count: number;
  total_emails: number;
  categories_used: string[];
  status: string; // 'success', 'skipped', 'error'
}

export interface OrganizeResponse {
  total_accounts_processed: number;
  accounts: OrganizeAccountResponse[];
  message: string;
}

export interface AITaskResponse {
  task_id: number;
  user_id: number;
  step_name: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  result_data?: Record<string, any>;
  started_at?: string;
  completed_at?: string;
}

// =====================================================
// STEP 1: CATEGORY RECOMMENDATION & SELECTION
// =====================================================

/**
 * Get AI-recommended categories based on user profile
 */
export const recommendCategories = async (
  profile: UserProfileRequest
): Promise<CategoryRecommendationResponse> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const response = await fetch(`${API_BASE}/ai-onboarding/recommend-categories`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to get category recommendations" 
    }));
    throw new Error(error.detail || error.message || "Failed to get category recommendations");
  }

  return response.json();
};

/**
 * Save user's selected categories to database
 */
export const saveUserCategories = async (
  userId: number,
  data: SaveCategoriesRequest
): Promise<any> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const response = await fetch(`${API_BASE}/ai-onboarding/save-categories?user_id=${userId}`, {
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
      detail: "Failed to save categories" 
    }));
    throw new Error(error.detail || error.message || "Failed to save categories");
  }

  return response.json();
};

/**
 * Get user's previously selected categories
 */
export const getUserCategories = async (
  userId: number
): Promise<any> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const response = await fetch(`${API_BASE}/ai-onboarding/get-categories/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to fetch categories" 
    }));
    throw new Error(error.detail || error.message || "Failed to fetch categories");
  }

  return response.json();
};

// =====================================================
// STEP 2: EMAIL ORGANIZATION
// =====================================================

/**
 * Organize ALL email accounts for a user
 * Fetches last 15 days of emails and categorizes them using AI
 */
export const organizeAllEmails = async (
  userId: number
): Promise<OrganizeResponse> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const response = await fetch(`${API_BASE}/ai-onboarding/organize-all-emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ user_id: userId }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to organize emails" 
    }));
    throw new Error(error.detail || error.message || "Failed to organize emails");
  }

  return response.json();
};

/**
 * Organize a SPECIFIC email account
 * Fetches last 15 days of emails and categorizes them using AI
 */
export const organizeSpecificEmail = async (
  userId: number,
  emailAccountId: number
): Promise<OrganizeAccountResponse> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const response = await fetch(`${API_BASE}/ai-onboarding/organize-emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ 
      user_id: userId,
      email_account_id: emailAccountId 
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to organize specific email account" 
    }));
    throw new Error(error.detail || error.message || "Failed to organize specific email account");
  }

  return response.json();
};

// =====================================================
// REALTIME EMAIL POLLING
// =====================================================

/**
 * Start realtime email polling for a user
 * This enables automatic email categorization and notifications
 */
export const startRealtimeEmailPolling = async (
  userId: number
): Promise<any> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const response = await fetch(`${API_BASE}/api/realtime-email/start-polling/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to start realtime email polling" 
    }));
    throw new Error(error.detail || error.message || "Failed to start realtime email polling");
  }

  return response.json();
};

// =====================================================
// ONBOARDING TASK MANAGEMENT
// =====================================================

/**
 * Initialize all onboarding tasks for a user
 */
export const startAIOnboarding = async (
  userId: number
): Promise<AITaskResponse[]> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const response = await fetch(`${API_BASE}/ai-onboarding/start?user_id=${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to start onboarding" 
    }));
    throw new Error(error.detail || error.message || "Failed to start onboarding");
  }

  return response.json();
};

/**
 * Get onboarding progress for a user
 */
export const getOnboardingProgress = async (
  userId: number
): Promise<AITaskResponse[]> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const response = await fetch(`${API_BASE}/ai-onboarding/progress/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to fetch onboarding progress" 
    }));
    throw new Error(error.detail || error.message || "Failed to fetch onboarding progress");
  }

  return response.json();
};