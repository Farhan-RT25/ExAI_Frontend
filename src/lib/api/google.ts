const API_BASE = import.meta.env.VITE_API_BASE;

export const initiateGoogleLogin = (): void => {
  // Redirect to backend OAuth endpoint
  // Backend will redirect to /auth/google/callback after OAuth completes
  window.location.href = `${API_BASE}/auth/google/login`;
};

export const initiateGoogleSignup = (): void => {
  // Same as login for OAuth - backend will create account if needed
  // Backend will redirect to /auth/google/callback after OAuth completes
  window.location.href = `${API_BASE}/auth/google/login`;
};

// This function extracts the token from the callback URL
export const handleGoogleCallback = (): { token?: string; error?: string } => {
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