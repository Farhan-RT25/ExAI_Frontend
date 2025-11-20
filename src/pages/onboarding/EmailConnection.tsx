import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Check, X, Mail, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addEmails, EmailAccountRequest } from "@/lib/api/emails";
import { getAuthStatusAndRedirect } from "@/lib/api/auth";

interface EmailEntry {
  address: string;
  provider: 'google' | 'microsoft' | 'zoho' | '';
  type: 'work' | 'personal' | '';
  validated: boolean;
}

const EmailConnection = () => {
  const navigate = useNavigate();
  const { emailAccounts, setEmailAccounts } = useOnboarding();
  const { toast } = useToast();
  const initializedFromContext = useRef(false);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Initialize single email from context if available (from OAuth signup)
  const [email, setEmail] = useState<EmailEntry>(() => {
    if (emailAccounts && emailAccounts.length > 0) {
      const firstAccount = emailAccounts[0];
      return {
        address: firstAccount.address,
        provider: firstAccount.provider,
        type: firstAccount.type,
        validated: firstAccount.validated
      };
    }
    return { address: '', provider: '', type: '', validated: false };
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setAuthLoading(true);
        
        const { isAuthenticated, redirect } = await getAuthStatusAndRedirect();
        
        if (!isAuthenticated) {
          // Not authenticated - redirect to login
          navigate('/login', { replace: true });
          return;
        }
        
        if (redirect === 'dashboard') {
          // User has already completed onboarding - redirect to dashboard
          toast({
            title: "Setup Complete",
            description: "Your account is already set up",
            variant: "default",
          });
          navigate('/dashboard', { replace: true });
          return;
        }
        
        // User is authenticated and should be in onboarding - continue
        
      } catch (error) {
        console.error("Auth check failed:", error);
        
        toast({
          title: "Authentication Error",
          description: "Please login again",
          variant: "destructive",
        });
        
        navigate('/login', { replace: true });
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, [navigate, toast]);

  // Update email when context changes (e.g., when navigating from OAuth)
  useEffect(() => {
    if (emailAccounts && emailAccounts.length > 0 && !initializedFromContext.current) {
      const firstAccount = emailAccounts[0];
      setEmail({
        address: firstAccount.address,
        provider: firstAccount.provider,
        type: firstAccount.type,
        validated: firstAccount.validated
      });
      initializedFromContext.current = true;
    }
  }, [emailAccounts]);

  const validateEmail = (emailAddress: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailAddress);
  };

  // Auto-detect provider based on email domain
  const detectProvider = (emailAddress: string): 'google' | 'microsoft' | 'zoho' | '' => {
    const domain = emailAddress.toLowerCase().split('@')[1];
    
    if (!domain) return '';
    
    // Google domains
    if (domain === 'gmail.com' || domain === 'googlemail.com') {
      return 'google';
    }
    
    // Microsoft domains
    if (domain === 'outlook.com' || domain === 'hotmail.com' || 
        domain === 'live.com' || domain === 'msn.com') {
      return 'microsoft';
    }
    
    // Zoho domains
    if (domain === 'zoho.com' || domain === 'zohomail.com') {
      return 'zoho';
    }
    
    // For custom domains, don't auto-select
    return '';
  };

  const handleEmailChange = (value: string) => {
    const isValid = validateEmail(value);
    const detectedProvider = isValid ? detectProvider(value) : '';
    
    setEmail(prev => ({
      ...prev,
      address: value,
      validated: isValid,
      // Auto-set provider if detected, otherwise keep existing selection
      provider: detectedProvider || prev.provider
    }));
  };

  const handleProviderChange = (value: string) => {
    setEmail(prev => ({
      ...prev,
      provider: value as 'google' | 'microsoft' | 'zoho'
    }));
  };

  const handleTypeChange = (value: string) => {
    setEmail(prev => ({
      ...prev,
      type: value as 'work' | 'personal'
    }));
  };

  const canContinue = email.validated && email.provider && email.type;

  // Helper function to map frontend provider to API service_provider
  const mapProviderToServiceProvider = (provider: 'google' | 'microsoft' | 'zoho'): 'gmail' | 'microsoft' | 'zoho' => {
    if (provider === 'google') return 'gmail';
    return provider;
  };

  const handleContinue = async () => {
    if (!canContinue) {
      toast({
        title: "Incomplete information",
        description: "Please provide a valid email address, select a provider, and choose an email type",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Map to API format
      const emailRequest: EmailAccountRequest = {
        email: email.address,
        service_provider: mapProviderToServiceProvider(email.provider as 'google' | 'microsoft' | 'zoho'),
        type: email.type as 'personal' | 'work'
      };

      // Save email to database
      await addEmails([emailRequest]);

      // Update context with the email
      setEmailAccounts([{
        address: email.address,
        provider: email.provider as 'google' | 'microsoft' | 'zoho',
        type: email.type as 'work' | 'personal',
        validated: true
      }]);
      
      toast({
        title: "Email saved!",
        description: "Successfully added your email account",
      });

      // Navigate to OAuth authorization
      navigate('/onboarding/oauth-auth');

    } catch (error) {
      console.error('Failed to save email:', error);
      toast({
        title: "Failed to save email",
        description: error instanceof Error ? error.message : "Could not save email account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="animate-pulse space-y-8">
            <div className="w-full h-6 bg-muted rounded"></div>
            <div className="w-full h-96 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Progress Indicator */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-muted"></div>
          <div className="w-3 h-3 rounded-full bg-muted"></div>
          <div className="w-3 h-3 rounded-full bg-muted"></div>
          <div className="w-3 h-3 rounded-full bg-muted"></div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">Step 1 of 5</p>
      </div>

      <Card className="w-full max-w-2xl p-8 shadow-card-hover">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-gradient-primary rounded-xl">
            <Mail className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">Connect Your Email Account</h1>
        <p className="text-muted-foreground text-center mb-8">
          Add your primary email account that you want Ex AI to manage
        </p>

        <div className="space-y-6">
          <Card className="p-6 border-2">
            <h3 className="font-semibold mb-4">Email Account</h3>
            
            <div className="space-y-4">
              <div className="relative">
                <Label className="mb-2 block">Email Address:</Label>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email.address}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className="pr-10"
                  disabled={isLoading}
                />
                {email.address && (
                  <div className="absolute right-3 top-[38px] -translate-y-1/2">
                    {email.validated ? (
                      <Check className="h-5 w-5 text-success" />
                    ) : (
                      <X className="h-5 w-5 text-danger" />
                    )}
                  </div>
                )}
                {email.validated && email.provider && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Provider auto-detected: {email.provider === 'google' ? 'Google' : email.provider === 'microsoft' ? 'Microsoft' : 'Zoho'}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2 block">Provider:</Label>
                <RadioGroup
                  value={email.provider}
                  onValueChange={handleProviderChange}
                  className="flex gap-4"
                  disabled={isLoading}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="google" id="google" />
                    <Label htmlFor="google" className="cursor-pointer">Google</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="microsoft" id="microsoft" />
                    <Label htmlFor="microsoft" className="cursor-pointer">Microsoft</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="zoho" id="zoho" />
                    <Label htmlFor="zoho" className="cursor-pointer">Zoho</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="mb-2 block">Email Type:</Label>
                <RadioGroup
                  value={email.type}
                  onValueChange={handleTypeChange}
                  className="flex gap-4"
                  disabled={isLoading}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="work" id="work" />
                    <Label htmlFor="work" className="cursor-pointer">Work</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="personal" id="personal" />
                    <Label htmlFor="personal" className="cursor-pointer">Personal</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </Card>

          {/* Commented out for future multi-account support
          <Button
            variant="outline"
            className="w-full"
            onClick={addEmail}
          >
            + Add Another Email
          </Button>
          */}
        </div>

        <div className="flex items-center justify-between mt-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/signup')}
            disabled={isLoading}
          >
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!canContinue || isLoading}
            className="min-w-32"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EmailConnection;