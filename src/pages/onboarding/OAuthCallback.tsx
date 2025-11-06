// pages/OAuthCallback.tsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { saveAuthData, getProfile, createUserFromToken } from "@/lib/api/auth";
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

        // Get token from callback handler
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

        if (result.error) {
          toast({
            title: "Authentication Failed",
            description: result.error,
            variant: "destructive",
          });
          navigate('/login');
          return;
        }

        if (result.token) {
          // Save token first
          localStorage.setItem('access_token', result.token);
          
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

          // Log full user object for debugging
          console.log('Full user object:', JSON.stringify(user, null, 2));

          // Determine if this is a new user (signup) or existing user (login)
          // Strategy: Default to signup unless we're certain they've completed onboarding
          let isRecentSignup = false;
          
          // First check: Has user completed onboarding before?
          const onboardingCompleted = localStorage.getItem('onboarding_completed');
          console.log('Onboarding completed flag:', onboardingCompleted);
          
          // SIMPLIFIED LOGIC: If onboarding not completed, always go to onboarding
          // This ensures new users always go through the flow
          if (onboardingCompleted === 'true') {
            // User has completed onboarding, this is definitely a login
            console.log('User has completed onboarding, treating as login');
            isRecentSignup = false;
          } else {
            // No onboarding completion flag - treat as signup
            console.log('No onboarding completion flag found - treating as signup');
            isRecentSignup = true;
            
            // Additional validation: Check account age as a safety check
            // If account is very old (more than 7 days), it might be a returning user
            // But only if they have multiple OAuth accounts
            const accountCreatedAt = user.created_at ? new Date(user.created_at) : null;
            const hasOAuthAccounts = user.oauth_accounts && Array.isArray(user.oauth_accounts) && user.oauth_accounts.length > 0;
            
            if (accountCreatedAt && hasOAuthAccounts) {
              const now = new Date();
              const daysSinceCreation = (now.getTime() - accountCreatedAt.getTime()) / (1000 * 60 * 60 * 24);
              
              console.log(`Account created ${daysSinceCreation.toFixed(2)} days ago`);
              
              // Only treat as login if account is older than 7 days AND has multiple OAuth accounts
              if (daysSinceCreation > 7 && user.oauth_accounts.length > 1) {
                console.log('Account is older than 7 days with multiple OAuth accounts - treating as login');
                isRecentSignup = false;
              } else {
                console.log('Account age check passed - treating as signup');
              }
            }
          }

          console.log('Final signup determination:', isRecentSignup);

          if (isRecentSignup) {
            // This is a signup flow - navigate to onboarding
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
            
            navigate('/onboarding/email-connection');
          } else {
            // This is a login flow - go to dashboard
            toast({
              title: "Logged in successfully!",
              description: `Welcome back, ${user.full_name || user.email || 'User'}`,
            });
            
            navigate('/dashboard');
          }
        } else {
          throw new Error('No token received');
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        toast({
          title: "Authentication Error",
          description: error instanceof Error ? error.message : "Failed to complete authentication",
          variant: "destructive",
        });
        navigate('/login');
      } finally {
        setIsProcessing(false);
      }
    };

    handleCallback();
  }, [location, navigate, toast, setFullName, setEmail, setEmailAccounts]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">
          {isProcessing ? "Completing authentication..." : "Redirecting..."}
        </p>
      </div>
    </div>
  );
};

export default OAuthCallback;