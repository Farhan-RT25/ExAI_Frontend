const API_BASE = import.meta.env.VITE_API_BASE;

export const initiateGoogleLogin = (): void => {
  // Add timestamp to prevent caching and indicate this is a login attempt
  const timestamp = Date.now();
  window.location.href = `${API_BASE}/auth/google/login?intent=login&t=${timestamp}`;
};

export const initiateGoogleSignup = (): void => {
  // Add timestamp to prevent caching and indicate this is a signup attempt
  const timestamp = Date.now();
  window.location.href = `${API_BASE}/auth/google/login?intent=signup&t=${timestamp}`;
};

// Enhanced callback handler with better error handling
export const handleGoogleCallback = (): { 
  token?: string; 
  error?: string; 
  redirect?: string;
  shouldRedirectToOnboarding?: boolean;
} => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const error = params.get('error');
  const message = params.get('message');
  
  // Clear the URL parameters to prevent re-processing
  if (window.history && window.history.replaceState) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
  
  if (error) {
    console.error('Google OAuth Error:', decodeURIComponent(error));
    return { 
      error: decodeURIComponent(error),
      redirect: error.includes('Sign up first') ? 'signup' : 'login'
    };
  }
  
  if (message && message.includes('Sign up first')) {
    return { 
      error: 'Invalid User – Sign up first',
      redirect: 'signup'
    };
  }
  
  if (token) {
    return { 
      token,
      shouldRedirectToOnboarding: true // We'll check this after login
    };
  }
  
  return { error: 'No token received from Google authentication' };
};