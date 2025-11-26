import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Check, X, Mail, Loader2, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addEmails, EmailAccountRequest } from "@/lib/api/emails";

interface EmailEntry {
  address: string;
  provider: 'google' | 'microsoft' | 'zoho' | '';
  type: 'work' | 'personal' | '';
  validated: boolean;
}

const steps = [
  { number: 1, label: "Email Connection" },
  { number: 2, label: "OAuth Authorization" },
  { number: 3, label: "User Questions" },
  { number: 4, label: "Categories" },
  { number: 5, label: "Processing" },
];

const EmailConnection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { emailAccounts, setEmailAccounts } = useOnboarding();
  const { toast } = useToast();
  const initializedFromContext = useRef(false);
  
  const validateEmail = (emailAddress: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailAddress);
  };

  const detectProvider = (emailAddress: string): 'google' | 'microsoft' | 'zoho' | '' => {
    const domain = emailAddress.toLowerCase().split('@')[1];
    
    if (!domain) return '';
    
    if (domain === 'gmail.com' || domain === 'googlemail.com') {
      return 'google';
    }
    
    if (domain === 'outlook.com' || domain === 'hotmail.com' || 
        domain === 'live.com' || domain === 'msn.com') {
      return 'microsoft';
    }
    
    if (domain === 'zoho.com' || domain === 'zohomail.com') {
      return 'zoho';
    }
    
    return '';
  };
  
  const [email, setEmail] = useState<EmailEntry>(() => {
    const emailFromUrl = searchParams.get('email');
    if (emailFromUrl) {
      const decoded = decodeURIComponent(emailFromUrl);
      const isValid = validateEmail(decoded);
      const provider = isValid ? detectProvider(decoded) : '';
      
      return {
        address: decoded,
        provider: provider,
        type: '',
        validated: isValid
      };
    }
    
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

  const handleEmailChange = (value: string) => {
    const isValid = validateEmail(value);
    const detectedProvider = isValid ? detectProvider(value) : '';
    
    setEmail(prev => ({
      ...prev,
      address: value,
      validated: isValid,
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
      const emailRequest: EmailAccountRequest = {
        email: email.address,
        service_provider: mapProviderToServiceProvider(email.provider as 'google' | 'microsoft' | 'zoho'),
        type: email.type as 'personal' | 'work'
      };

      await addEmails([emailRequest]);

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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-card shadow-card-hover rounded-xl overflow-hidden border-border">
        {/* Progress Breadcrumb */}
        <div className="bg-secondary/50 px-8 py-6 border-b border-border">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step.number === 1 
                      ? 'bg-primary text-primary-foreground shadow-glow' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.number}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    step.number === 1 ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="h-5 w-5 text-muted-foreground mx-2 mb-6" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Connect Your Email Account</h1>
            <p className="text-muted-foreground">
              Add your primary email account that you want Nyx to manage
            </p>
          </div>

          <div className="space-y-6 max-w-xl mx-auto">
            <div className="space-y-4">
              <div className="relative">
                <Label className="mb-2 block text-sm font-medium text-foreground">Email Address</Label>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email.address}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className="pr-10 h-12 bg-background border-border"
                />
                {email.address && (
                  <div className="absolute right-3 top-[42px]">
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
                <Label className="mb-3 block text-sm font-medium text-foreground">Provider</Label>
                <RadioGroup
                  value={email.provider}
                  onValueChange={handleProviderChange}
                  className="grid grid-cols-3 gap-3"
                >
                  {['google', 'microsoft', 'zoho'].map((provider) => (
                    <div key={provider}>
                      <RadioGroupItem 
                        value={provider} 
                        id={provider} 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor={provider}
                        className="flex items-center justify-center p-4 border-2 border-border rounded-lg cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 hover:border-primary/50"
                      >
                        <span className="font-medium capitalize">{provider}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="mb-3 block text-sm font-medium text-foreground">Email Type</Label>
                <RadioGroup
                  value={email.type}
                  onValueChange={handleTypeChange}
                  className="grid grid-cols-2 gap-3"
                >
                  {['work', 'personal'].map((type) => (
                    <div key={type}>
                      <RadioGroupItem 
                        value={type} 
                        id={type} 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor={type}
                        className="flex items-center justify-center p-4 border-2 border-border rounded-lg cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 hover:border-primary/50"
                      >
                        <span className="font-medium capitalize">{type}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={() => navigate('/signup')}
              className="text-muted-foreground hover:text-foreground"
            >
              Back
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!canContinue || isLoading}
              className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 h-11"
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
        </div>
      </Card>
    </div>
  );
};

export default EmailConnection;