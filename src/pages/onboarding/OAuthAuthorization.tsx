import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Mail, Loader2, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAuthorizationUrl } from "@/lib/api/oauth";

interface ProviderStatus {
  provider: 'google' | 'microsoft' | 'zoho';
  emails: string[];
  status: 'waiting' | 'authorizing' | 'done' | 'error';
}

const OAuthAuthorization = () => {
  const navigate = useNavigate();
  const { emailAccounts } = useOnboarding();
  const { toast } = useToast();
  const [providers, setProviders] = useState<ProviderStatus[]>([]);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    // Check if we're returning from OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const authSuccess = urlParams.get('auth_success');
    const provider = urlParams.get('provider');
    
    if (authSuccess === 'true' && provider) {
      // Mark this provider as done
      setProviders(prev => prev.map(p => 
        p.provider === provider ? { ...p, status: 'done' } : p
      ));
      
      toast({
        title: "Authorization successful!",
        description: `${provider} accounts connected successfully.`,
      });
      
      // Clean up URL
      window.history.replaceState({}, '', '/onboarding/oauth-auth');
      
      // Continue with next provider if any
      continueAuthorization();
    } else if (authSuccess === 'false') {
      const error = urlParams.get('error');
      toast({
        title: "Authorization failed",
        description: error || "Could not connect accounts. Please try again.",
        variant: "destructive",
      });
      
      // Mark current authorizing provider as error
      setProviders(prev => prev.map(p => 
        p.status === 'authorizing' ? { ...p, status: 'error' } : p
      ));
      
      window.history.replaceState({}, '', '/onboarding/oauth-auth');
    }
  }, []);

  useEffect(() => {
    // Group emails by provider
    const grouped = emailAccounts.reduce((acc, email) => {
      if (!acc[email.provider]) {
        acc[email.provider] = [];
      }
      acc[email.provider].push(email.address);
      return acc;
    }, {} as Record<string, string[]>);

    const providerList: ProviderStatus[] = Object.entries(grouped).map(([provider, emails]) => ({
      provider: provider as 'google' | 'microsoft' | 'zoho',
      emails,
      status: 'waiting' as const,
    }));

    setProviders(providerList);

    // Start authorization process automatically
    if (providerList.length > 0) {
      startAuthorization(providerList);
    }
  }, [emailAccounts]);

  const startAuthorization = async (providerList: ProviderStatus[]) => {
    // Find first provider that needs authorization
    const firstProvider = providerList[0];
    if (firstProvider) {
      await authorizeProvider(firstProvider.provider);
    }
  };

  const continueAuthorization = async () => {
    // Find next provider that needs authorization
    const nextProvider = providers.find(p => p.status === 'waiting');
    if (nextProvider) {
      await authorizeProvider(nextProvider.provider);
    } else {
      // All done
      const allSuccessful = providers.every(p => p.status === 'done');
      if (allSuccessful) {
        setAllDone(true);
      }
    }
  };

  const authorizeProvider = async (provider: 'google' | 'microsoft' | 'zoho') => {
    try {
      // Set to authorizing
      setProviders(prev => prev.map(p => 
        p.provider === provider ? { ...p, status: 'authorizing' } : p
      ));

      // Get authorization URL from API
      const data = await getAuthorizationUrl(provider);
      
      // Redirect to OAuth provider (they will redirect back to /oauth/callback)
      window.location.href = data.authorization_url;
      
    } catch (error) {
      console.error('Error initiating authorization:', error);
      toast({
        title: "Authorization failed",
        description: error instanceof Error ? error.message : "Could not start authorization process",
        variant: "destructive",
      });
      
      setProviders(prev => prev.map(p => 
        p.provider === provider ? { ...p, status: 'error' } : p
      ));
    }
  };

  const retryProvider = async (provider: 'google' | 'microsoft' | 'zoho') => {
    await authorizeProvider(provider);
  };

  const getProviderLogo = (provider: string) => {
    switch (provider) {
      case 'google':
        return (
          <svg className="h-8 w-8" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        );
      case 'microsoft':
        return (
          <svg className="h-8 w-8" viewBox="0 0 24 24">
            <path fill="#F25022" d="M1 1h10v10H1z"/>
            <path fill="#00A4EF" d="M13 1h10v10H13z"/>
            <path fill="#7FBA00" d="M1 13h10v10H1z"/>
            <path fill="#FFB900" d="M13 13h10v10H13z"/>
          </svg>
        );
      case 'zoho':
        return <Mail className="h-8 w-8 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Progress Indicator */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-muted"></div>
          <div className="w-3 h-3 rounded-full bg-muted"></div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">Step 2 of 4</p>
      </div>

      <Card className="w-full max-w-2xl p-8 shadow-card-hover">
        <h1 className="text-3xl font-bold text-center mb-2">
          {allDone ? "Authorization Complete!" : "Authorizing Email Accounts"}
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          {allDone 
            ? "All your email accounts are connected and ready"
            : "Connecting to your email providers securely"
          }
        </p>

        <div className="space-y-4">
          {providers.map((provider, index) => (
            <Card key={index} className="p-6 border-2">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {getProviderLogo(provider.provider)}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold capitalize mb-1">{provider.provider}</h3>
                  <div className="text-sm text-muted-foreground">
                    {provider.emails.map((email, i) => (
                      <div key={i}>{email}</div>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2">
                  {provider.status === 'waiting' && (
                    <span className="text-sm text-muted-foreground">Waiting...</span>
                  )}
                  {provider.status === 'authorizing' && (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      <span className="text-sm text-primary">Authorizing...</span>
                    </>
                  )}
                  {provider.status === 'done' && (
                    <>
                      <Check className="h-5 w-5 text-success" />
                      <span className="text-sm text-success font-semibold">Connected</span>
                    </>
                  )}
                  {provider.status === 'error' && (
                    <>
                      <AlertCircle className="h-5 w-5 text-destructive" />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => retryProvider(provider.provider)}
                      >
                        Retry
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {!allDone && (
          <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3 mt-6">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium mb-1">Secure Authorization</p>
              <p className="text-muted-foreground">
                You'll be redirected to each provider's login page. Ex AI never sees your passwords.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/onboarding/email-connection')}
            disabled={providers.some(p => p.status === 'authorizing')}
          >
            Back
          </Button>
          {allDone && (
            <Button
              onClick={() => navigate('/onboarding/questions')}
              className="min-w-32"
            >
              Continue
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default OAuthAuthorization;