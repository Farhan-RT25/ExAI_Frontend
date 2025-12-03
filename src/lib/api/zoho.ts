const API_BASE = import.meta.env.VITE_API_BASE;

export const initiateZohoLogin = (): void => {
  // Redirect to backend OAuth endpoint
  // Backend will redirect to /auth/zoho/callback after OAuth completes
  window.location.href = `${API_BASE}/auth/zoho/login`;
};

export const initiateZohoSignup = (): void => {
  // Same as login for OAuth - backend will create account if needed
  // Backend will redirect to /auth/zoho/callback after OAuth completes
  window.location.href = `${API_BASE}/auth/zoho/login`;
};

// This function extracts the token and redirect from the callback URL
export const handleZohoCallback = (): { 
  token?: string; 
  error?: string;
  redirect?: string;
} => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const redirect = params.get('redirect'); // Backend-provided redirect path
  const error = params.get('error');

  if (error) {
    return { error: decodeURIComponent(error) };
  }

  if (token) {
    return { 
      token,
      redirect: redirect || undefined // Include redirect if provided by backend
    };
  }

  return { error: 'No token received' };
};