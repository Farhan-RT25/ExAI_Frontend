const API_BASE = import.meta.env.VITE_API_BASE;
import { getAccessToken } from "./auth";

// =====================================================
// TYPES
// =====================================================

export interface EmailAccountInfo {
  id: string;
  name: string;
  email: string;
  color: string;
}

export interface KPIMetric {
  title: string;
  value: number;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: string;
  color: string;
  suffix?: string;
}

export interface VolumeDataPoint {
  month: string;
  emails: number;
  responded: number;
}

export interface CategoryDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface ProcessingTimeDataPoint {
  category: string;
  amount: number;
  color: string;
}

export interface AIInsight {
  text: string;
  trend: "up" | "down" | "neutral";
}

export interface DashboardData {
  accounts: EmailAccountInfo[];
  kpi: KPIMetric[];
  volumeData: VolumeDataPoint[];
  categoryData: CategoryDataPoint[];
  spendingData: ProcessingTimeDataPoint[];
  aiInsights: AIInsight[];
  mainInsight?: string;
}

// =====================================================
// API FUNCTIONS
// =====================================================

/**
 * Get all dashboard data in a single request
 */
export const getDashboardData = async (
  accountId?: string
): Promise<DashboardData> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  
  if (!API_BASE || API_BASE.trim() === "") {
    console.error("API_BASE is not configured. Current value:", API_BASE);
    throw new Error("API base URL is not configured. Please set VITE_API_BASE in your .env file.");
  }

  const url = accountId 
    ? `${API_BASE}/dashboard/data?account_id=${accountId}`
    : `${API_BASE}/dashboard/data`;

  console.log("Fetching dashboard data from:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to fetch dashboard data" 
    }));
    throw new Error(error.detail || error.message || "Failed to fetch dashboard data");
  }

  return response.json();
};

/**
 * Get email accounts for dashboard
 */
export const getDashboardAccounts = async (): Promise<EmailAccountInfo[]> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const response = await fetch(`${API_BASE}/dashboard/accounts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to fetch email accounts" 
    }));
    throw new Error(error.detail || error.message || "Failed to fetch email accounts");
  }

  const data = await response.json();
  return data.accounts;
};

/**
 * Get KPI metrics
 */
export const getDashboardKPIs = async (
  accountId?: string
): Promise<KPIMetric[]> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const url = accountId 
    ? `${API_BASE}/dashboard/kpis?account_id=${accountId}`
    : `${API_BASE}/dashboard/kpis`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to fetch KPIs" 
    }));
    throw new Error(error.detail || error.message || "Failed to fetch KPIs");
  }

  const data = await response.json();
  return data.kpi;
};

/**
 * Get email volume trend data
 */
export const getDashboardVolume = async (
  accountId?: string
): Promise<VolumeDataPoint[]> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const url = accountId 
    ? `${API_BASE}/dashboard/volume?account_id=${accountId}`
    : `${API_BASE}/dashboard/volume`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to fetch volume data" 
    }));
    throw new Error(error.detail || error.message || "Failed to fetch volume data");
  }

  const data = await response.json();
  return data.volumeData;
};

/**
 * Get category distribution data
 */
export const getDashboardCategories = async (
  accountId?: string
): Promise<CategoryDataPoint[]> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const url = accountId 
    ? `${API_BASE}/dashboard/categories?account_id=${accountId}`
    : `${API_BASE}/dashboard/categories`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to fetch category data" 
    }));
    throw new Error(error.detail || error.message || "Failed to fetch category data");
  }

  const data = await response.json();
  return data.categoryData;
};

/**
 * Get processing time data
 */
export const getDashboardProcessing = async (
  accountId?: string
): Promise<ProcessingTimeDataPoint[]> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const url = accountId 
    ? `${API_BASE}/dashboard/processing?account_id=${accountId}`
    : `${API_BASE}/dashboard/processing`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to fetch processing data" 
    }));
    throw new Error(error.detail || error.message || "Failed to fetch processing data");
  }

  const data = await response.json();
  return data.spendingData;
};

/**
 * Get AI insights
 */
export const getDashboardInsights = async (
  accountId?: string
): Promise<{ aiInsights: AIInsight[]; mainInsight?: string }> => {
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login again.");
  if (!API_BASE) throw new Error("API base URL is not configured");

  const url = accountId 
    ? `${API_BASE}/dashboard/insights?account_id=${accountId}`
    : `${API_BASE}/dashboard/insights`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: "Failed to fetch insights" 
    }));
    throw new Error(error.detail || error.message || "Failed to fetch insights");
  }

  return response.json();
};

