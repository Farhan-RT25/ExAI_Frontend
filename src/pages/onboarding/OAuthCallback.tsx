// pages/OAuthCallback.tsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { handleOAuthCallbackWithRedirect } from "@/lib/api/auth";
import { handleGoogleCallback } from "@/lib/api/google";
import { handleMicrosoftCallback } from "@/lib/api/microsoft";
import { handleZohoCallback } from "@/lib/api/zoho";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Loader2 } from "lucide-react";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { setFullName, setEmail, setEmailAccounts } = useOnboarding();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Prevent any caching
        if (window.history && window.history.replaceState) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }

        // Extract provider from pathname (e.g., /auth/google/callback)
        let provider: string | null = null;
        const pathname = location.pathname.toLowerCase();
        
        if (pathname.includes('/auth/google/callback')) {
          provider = 'google';
        } else if (pathname.includes('/auth/microsoft/callback')) {
          provider = 'microsoft';
        } else if (pathname.includes('/auth/zoho/callback')) {
          provider = 'zoho';
        } else if (pathname.includes('/oauth/callback')) {
          // Fallback: try to get from query params
          const params = new URLSearchParams(location.search);
          provider = params.get('provider');
        }

        if (!provider) {
          setError("Unknown authentication provider");
          setIsProcessing(false);
          setTimeout(() => navigate('/login', { replace: true }), 3000);
          return;
        }

        console.log('Processing OAuth callback for provider:', provider);

        // Get result from appropriate callback handler
        let result;
        switch (provider) {
          case 'google':
            result = handleGoogleCallback();
            break;
          case 'microsoft':
            result = handleMicrosoftCallback();
            break;
          case 'zoho':
            result = handleZohoCallback();
            break;
          default:
            result = { error: 'Unknown provider' };
        }

        console.log('Callback result:', result);

        // Handle errors from callback
        if (result.error) {
          setError(result.error);
          setIsProcessing(false);
          
          // Show error toast
          toast({
            title: "Authentication Failed",
            description: result.error,
            variant: "destructive",
          });

          // Redirect based on error type
          setTimeout(() => {
            if (result.redirect === 'signup') {
              navigate('/signup', { replace: true });
            } else {
              navigate('/login', { replace: true });
            }
          }, 3000);
          return;
        }

        // Handle successful authentication
        if (result.token) {
          console.log('Token received, processing...');
          
          // Use the enhanced callback handler that determines redirect
          const redirectInfo = await handleOAuthCallbackWithRedirect(result.token);
          
          console.log('Redirect info:', redirectInfo);
          
          // Get user data for onboarding context
          const userStr = localStorage.getItem('user');
          if (userStr && redirectInfo.redirect === 'onboarding') {
            const user = JSON.parse(userStr);
            
            // Pre-populate onboarding context
            setFullName(user.full_name || '');
            setEmail(user.email || '');
            
            // Pre-populate the first email account with the OAuth email
            if (user.email) {
              const emailProvider = provider as 'google' | 'microsoft' | 'zoho';
              
              setEmailAccounts([{
                address: user.email,
                provider: emailProvider,
                type: 'personal',
                validated: true
              }]);
            }

            toast({
              title: "Account created!",
              description: `Welcome! Let's connect your email accounts`,
            });
          } else if (redirectInfo.redirect === 'dashboard') {
            const user = userStr ? JSON.parse(userStr) : null;
            toast({
              title: "Logged in successfully!",
              description: `Welcome back, ${user?.full_name || user?.email || 'User'}`,
            });
          }
          
          // Navigate to appropriate page
          navigate(`/${redirectInfo.redirect}`, { replace: true });
          
        } else {
          setError('No authentication token received');
          setIsProcessing(false);
          setTimeout(() => navigate('/login', { replace: true }), 3000);
        }

      } catch (error) {
        console.error('OAuth callback error:', error);
        
        setError(error instanceof Error ? error.message : 'Authentication processing failed');
        setIsProcessing(false);
        
        toast({
          title: "Authentication Error",
          description: error instanceof Error ? error.message : "Failed to complete authentication",
          variant: "destructive",
        });
        
        setTimeout(() => navigate('/login', { replace: true }), 3000);
      }
    };

    handleCallback();
  }, [location, navigate, toast, setFullName, setEmail, setEmailAccounts]);

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">
            Processing your authentication...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-6 rounded-lg">
            <h2 className="font-bold text-lg mb-2">Authentication Error</h2>
            <p className="mb-4">{error}</p>
            <p className="text-sm opacity-75">Redirecting you back...</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default OAuthCallback;