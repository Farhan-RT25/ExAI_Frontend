import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Check, X, Mail, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailEntry {
  address: string;
  provider: 'google' | 'microsoft' | 'zoho' | '';
  type: 'work' | 'personal' | '';
  validated: boolean;
}

const EmailConnection = () => {
  const navigate = useNavigate();
  const { setEmailAccounts } = useOnboarding();
  const { toast } = useToast();
  
  const [emails, setEmails] = useState<EmailEntry[]>([
    { address: '', provider: '', type: '', validated: false }
  ]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index].address = value;
    newEmails[index].validated = validateEmail(value);
    setEmails(newEmails);
  };

  const handleProviderChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index].provider = value as 'google' | 'microsoft' | 'zoho';
    setEmails(newEmails);
  };

  const handleTypeChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index].type = value as 'work' | 'personal';
    setEmails(newEmails);
  };

  const addEmail = () => {
    if (emails.length < 5) {
      setEmails([...emails, { address: '', provider: '', type: '', validated: false }]);
    }
  };

  const removeEmail = (index: number) => {
    if (emails.length > 1) {
      setEmails(emails.filter((_, i) => i !== index));
    }
  };

  const canContinue = emails.some(
    (email) => email.validated && email.provider && email.type
  );

  const handleContinue = () => {
    const validEmails = emails.filter(
      (email) => email.validated && email.provider && email.type
    );
    
    if (validEmails.length === 0) {
      toast({
        title: "No valid emails",
        description: "Please add at least one valid email account",
        variant: "destructive",
      });
      return;
    }

    setEmailAccounts(validEmails.map(e => ({
      address: e.address,
      provider: e.provider as 'google' | 'microsoft' | 'zoho',
      type: e.type as 'work' | 'personal',
      validated: true
    })));
    
    navigate('/onboarding/oauth-auth');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Progress Indicator */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-muted"></div>
          <div className="w-3 h-3 rounded-full bg-muted"></div>
          <div className="w-3 h-3 rounded-full bg-muted"></div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">Step 1 of 4</p>
      </div>

      <Card className="w-full max-w-2xl p-8 shadow-card-hover">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-gradient-primary rounded-xl">
            <Mail className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">Connect Your Email Accounts</h1>
        <p className="text-muted-foreground text-center mb-8">
          Add the email accounts you want Ex AI to manage (up to 5 accounts)
        </p>

        <div className="space-y-6">
          {emails.map((email, index) => (
            <Card key={index} className="p-6 border-2">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold">Email Account {index + 1}</h3>
                {emails.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEmail(index)}
                    className="h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4 text-danger" />
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={email.address}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                    className="pr-10"
                  />
                  {email.address && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {email.validated ? (
                        <Check className="h-5 w-5 text-success" />
                      ) : (
                        <X className="h-5 w-5 text-danger" />
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <Label className="mb-2 block">Provider:</Label>
                  <RadioGroup
                    value={email.provider}
                    onValueChange={(value) => handleProviderChange(index, value)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="google" id={`google-${index}`} />
                      <Label htmlFor={`google-${index}`}>Google</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="microsoft" id={`microsoft-${index}`} />
                      <Label htmlFor={`microsoft-${index}`}>Microsoft</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="zoho" id={`zoho-${index}`} />
                      <Label htmlFor={`zoho-${index}`}>Zoho</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-2 block">Email Type:</Label>
                  <RadioGroup
                    value={email.type}
                    onValueChange={(value) => handleTypeChange(index, value)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="work" id={`work-${index}`} />
                      <Label htmlFor={`work-${index}`}>Work</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="personal" id={`personal-${index}`} />
                      <Label htmlFor={`personal-${index}`}>Personal</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </Card>
          ))}

          {emails.length < 5 && (
            <Button
              variant="outline"
              className="w-full"
              onClick={addEmail}
            >
              + Add Another Email
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between mt-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/signup')}
          >
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!canContinue}
            className="min-w-32"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EmailConnection;
