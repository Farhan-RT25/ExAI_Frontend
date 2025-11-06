const API_BASE = import.meta.env.VITE_API_BASE;
import { getAccessToken } from "./auth";

// Types
export interface QAData {
    role: string;
    industry: string;
    emailVolume: string;
    communicationStyle: string;
    emailsTo: string;
}

export interface AITaskResponse {
    id: number;
    user_id: number;
    step_name: string;
    status: "pending" | "in_progress" | "completed" | "failed";
    result_data?: Record<string, any>;
    started_at?: string;
    completed_at?: string;
}

// Types
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
}


// -----------------------------
// Start AI Onboarding
// -----------------------------
export const startAIOnboarding = async (userId: number): Promise<AITaskResponse[]> => {
    const token = getAccessToken();

    if (!token) throw new Error("Not authenticated. Please login again.");
    if (!API_BASE) throw new Error("API base URL is not configured");

    const response = await fetch(`${API_BASE}/ai-onboarding/start?user_id=${userId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: "Failed to start onboarding" }));
        throw new Error(error.detail || error.message || "Failed to start onboarding");
    }

    return response.json();
};

// -----------------------------
// Run Specific AI Step
// -----------------------------
// Improved error handling in runAIStep
// -----------------------------
// Run Specific AI Step
// -----------------------------
export const runAIStep = async (
    userId: number,
    stepName: string,
    qaData: QAData
): Promise<AITaskResponse> => {
    const token = getAccessToken();

    if (!token) throw new Error("Not authenticated. Please login again.");
    if (!API_BASE) throw new Error("API base URL is not configured");

    // ✅ FIX: Only send qa_data in body, user_id goes in query params
    const requestBody = {
        qa_data: qaData,
    };

    // ✅ FIX: Add user_id as query parameter (like in startAIOnboarding)
    const response = await fetch(`${API_BASE}/ai-onboarding/run/${stepName}?user_id=${userId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        let errorMessage = "Failed to run AI step";
        try {
            const error = await response.json();
            // Handle different error formats
            if (error.detail) {
                errorMessage = typeof error.detail === 'string'
                    ? error.detail
                    : JSON.stringify(error.detail);
            } else if (error.message) {
                errorMessage = error.message;
            }
        } catch (e) {
            // If JSON parsing fails, use status text
            errorMessage = `${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
    }

    return response.json();
};

// -----------------------------
// Get Onboarding Progress
// -----------------------------
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
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: "Failed to fetch onboarding progress" }));
        throw new Error(error.detail || error.message || "Failed to fetch onboarding progress");
    }

    // Parse JSON with error handling
    try {
        return await response.json();
    } catch (parseError) {
        console.error("Failed to parse progress response:", parseError);
        throw new Error("Received invalid response from server. Please try again.");
    }
};

// -----------------------------
// Get AI-Recommended Categories
// -----------------------------
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
        const error = await response.json().catch(() => ({ detail: "Failed to get category recommendations" }));
        throw new Error(error.detail || error.message || "Failed to get category recommendations");
    }

    return response.json();
};

// -----------------------------
// Save User's Selected Categories
// -----------------------------
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
        const error = await response.json().catch(() => ({ detail: "Failed to save categories" }));
        throw new Error(error.detail || error.message || "Failed to save categories");
    }

    return response.json();
};

// -----------------------------
// Get User's Saved Categories
// -----------------------------
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
        const error = await response.json().catch(() => ({ detail: "Failed to fetch categories" }));
        throw new Error(error.detail || error.message || "Failed to fetch categories");
    }

    return response.json();
};