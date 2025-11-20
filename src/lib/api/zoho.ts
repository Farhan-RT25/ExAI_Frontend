const API_BASE = import.meta.env.VITE_API_BASE;

export const initiateZohoLogin = (): void => {
  const timestamp = Date.now();
  window.location.href = `${API_BASE}/auth/zoho/login?intent=login&t=${timestamp}`;
};

export const initiateZohoSignup = (): void => {
  const timestamp = Date.now();
  window.location.href = `${API_BASE}/auth/zoho/login?intent=signup&t=${timestamp}`;
};

export const handleZohoCallback = (): { 
  token?: string; 
  error?: string; 
  redirect?: string;
  shouldRedirectToOnboarding?: boolean;
} => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const error = params.get('error');
  const message = params.get('message');
  
  // Clear the URL parameters
  if (window.history && window.history.replaceState) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
  
  if (error) {
    console.error('Zoho OAuth Error:', decodeURIComponent(error));
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
      shouldRedirectToOnboarding: true
    };
  }
  
  return { error: 'No token received from Zoho authentication' };
};