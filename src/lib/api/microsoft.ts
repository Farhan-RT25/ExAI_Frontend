const API_BASE = import.meta.env.VITE_API_BASE;

export const initiateMicrosoftLogin = (): void => {
  // Redirect to backend OAuth endpoint
  // Backend will redirect to /auth/microsoft/callback after OAuth completes
  window.location.href = `${API_BASE}/auth/microsoft/login`;
};

export const initiateMicrosoftSignup = (): void => {
  // Same as login for OAuth - backend will create account if needed
  // Backend will redirect to /auth/microsoft/callback after OAuth completes
  window.location.href = `${API_BASE}/auth/microsoft/login`;
};

// This function extracts the token from the callback URL
export const handleMicrosoftCallback = (): { token?: string; error?: string } => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const error = params.get('error');

  if (error) {
    return { error: decodeURIComponent(error) };
  }

  if (token) {
    return { token };
  }

  return { error: 'No token received' };
};