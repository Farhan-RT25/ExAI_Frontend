// pages/OAuthCallback.tsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { saveAuthData, getProfile, createUserFromToken } from "@/lib/api/auth";
import { handleGoogleCallback } from "@/lib/api/google";
import { handleMicrosoftCallback } from "@/lib/api/microsoft";
import { handleZohoCallback } from "@/lib/api/zoho";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { startRealtimeEmailPolling } from "@/lib/api/onboarding";
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
          toast({
            title: "Authentication Error",
            description: "Unknown provider",
            variant: "destructive",
          });
          navigate('/login');
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
          
          toast({
            title: "Authentication Failed",
            description: result.error,
            variant: "destructive",
          });

          setTimeout(() => {
            if (result.redirect === 'signup') {
              navigate('/signup', { replace: true });
            } else {
              navigate('/login', { replace: true });
            }
          }, 3000);
          return;
        }

        if (result.token) {
          // Save token first
          localStorage.setItem('access_token', result.token);
          
          // Extract redirect path from URL (provided by backend)
          const params = new URLSearchParams(location.search);
          const redirectPath = params.get('redirect') || 'dashboard'; // Default to dashboard
          
          // Try to fetch user info from backend
          let user;
          try {
            user = await getProfile(result.token);
          } catch (profileError) {
            console.error('Failed to fetch profile:', profileError);
            
            // Fallback: Try to decode user info from JWT token
            const tokenUser = createUserFromToken(result.token);
            if (tokenUser) {
              console.log('Using user info from JWT token as fallback');
              user = tokenUser;
              toast({
                title: "Authentication Warning",
                description: "Could not fetch full profile, but authentication succeeded. Some features may be limited.",
                variant: "default",
              });
            } else {
              // If we can't decode token either, show error and redirect to login
              toast({
                title: "Authentication Error",
                description: profileError instanceof Error ? profileError.message : "Could not authenticate. Please try again.",
                variant: "destructive",
              });
              navigate('/login');
              return;
            }
          }
          
          // Save auth data
          saveAuthData({
            access_token: result.token,
            token_type: 'bearer',
            user,
          });

          // Use backend-provided redirect path
          if (redirectPath === 'onboarding/email-connection') {
            // New user - pre-populate onboarding context
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
              description: `Welcome, ${user.full_name || 'User'}! Let's connect your email accounts`,
            });
          } else if (redirectPath === 'dashboard') {
            // Existing user - start realtime polling
            try {
              console.log("🚀 Starting realtime email polling for user:", user.user_id);
              await startRealtimeEmailPolling(user.user_id);
              console.log("✅ Realtime email polling started successfully");
            } catch (pollingError: any) {
              console.warn("⚠️ Failed to start realtime email polling:", pollingError);
              // Don't block login if polling fails
            }
            
            toast({
              title: "Logged in successfully!",
              description: `Welcome back, ${user.full_name || user.email || 'User'}`,
            });
          }
          
          // Navigate to appropriate page
          navigate(`/${redirectPath}`, { replace: true });
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