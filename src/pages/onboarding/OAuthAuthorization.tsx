import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Mail, Loader2, Check } from "lucide-react";

interface ProviderStatus {
  provider: 'google' | 'microsoft' | 'zoho';
  emails: string[];
  status: 'waiting' | 'authorizing' | 'done';
}

const OAuthAuthorization = () => {
  const navigate = useNavigate();
  const { emailAccounts } = useOnboarding();
  const [providers, setProviders] = useState<ProviderStatus[]>([]);
  const [allDone, setAllDone] = useState(false);

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

    // Start authorization process
    authorizeProviders(providerList);
  }, [emailAccounts]);

  const authorizeProviders = async (providerList: ProviderStatus[]) => {
    for (let i = 0; i < providerList.length; i++) {
      // Set to authorizing
      setProviders(prev => prev.map((p, idx) => 
        idx === i ? { ...p, status: 'authorizing' } : p
      ));

      // Simulate 2.5 second delay
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Set to done
      setProviders(prev => prev.map((p, idx) => 
        idx === i ? { ...p, status: 'done' } : p
      ));
    }

    setAllDone(true);
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
        <h1 className="text-3xl font-bold text-center mb-2">Authorizing Email Accounts</h1>
        <p className="text-muted-foreground text-center mb-8">
          Please wait while we connect to your email providers
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
                <div className="flex-shrink-0">
                  {provider.status === 'waiting' && (
                    <span className="text-sm text-muted-foreground">Waiting...</span>
                  )}
                  {provider.status === 'authorizing' && (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      <span className="text-sm text-primary">Authorizing...</span>
                    </div>
                  )}
                  {provider.status === 'done' && (
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-success" />
                      <span className="text-sm text-success font-semibold">Done</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {allDone && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => navigate('/onboarding/questions')}
              className="min-w-32"
            >
              Continue
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default OAuthAuthorization;
