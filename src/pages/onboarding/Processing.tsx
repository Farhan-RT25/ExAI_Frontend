import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Check, AlertCircle, ChevronRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { organizeAllEmails, startRealtimeEmailPolling } from "@/lib/api/onboarding";

const steps = [
  'Analyzing your email patterns',
  'Creating smart categories',
  'Setting up AI draft system',
  'Organizing your last 15 days of emails',
];

const progressSteps = [
  { number: 1, label: "Email Connection" },
  { number: 2, label: "OAuth Authorization" },
  { number: 3, label: "User Questions" },
  { number: 4, label: "Categories" },
  { number: 5, label: "Processing" },
];

const Processing = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [organizationResult, setOrganizationResult] = useState<any>(null);

  useEffect(() => {
    startEmailOrganization();
    
    const totalDuration = 20000;
    const updateInterval = 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (totalDuration / updateInterval));
        
        const step = Math.floor(newProgress / 25);
        if (step !== currentStep && step < 4) {
          setCurrentStep(step);
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }

        return newProgress;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100 && (organizationResult || error)) {
      setComplete(true);
      localStorage.setItem('onboarding_completed', 'true');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  }, [progress, organizationResult, error, navigate]);

  const startEmailOrganization = async () => {
    try {
      const userJson = localStorage.getItem("user");
      if (!userJson) {
        throw new Error("User data not found. Please log in again.");
      }
      
      const userData = JSON.parse(userJson);
      const userId = Number(userData.user_id);

      console.log("🚀 Starting email organization for user:", userId);

      const result = await organizeAllEmails(userId);
      
      console.log("✅ Email organization completed:", result);
      setOrganizationResult(result);

      // Start realtime email polling after organization completes
      try {
        console.log("🚀 Starting realtime email polling for user:", userId);
        await startRealtimeEmailPolling(userId);
        console.log("✅ Realtime email polling started successfully");
      } catch (pollingError: any) {
        console.warn("⚠️ Failed to start realtime email polling:", pollingError);
        // Don't block onboarding completion if polling fails
      }

      if (progress >= 100) {
        setComplete(true);
        localStorage.setItem('onboarding_completed', 'true');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }

    } catch (err: any) {
      console.error("❌ Email organization failed:", err);
      setError(err.message || "Failed to organize emails");
      
      if (progress >= 100) {
        setComplete(true);
        localStorage.setItem('onboarding_completed', 'true');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-card shadow-card-hover rounded-xl overflow-hidden border-border">
        {/* Progress Breadcrumb */}
        <div className="bg-secondary/50 px-8 py-6 border-b border-border">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {progressSteps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    complete
                      ? 'bg-success text-success-foreground shadow-glow' 
                      : step.number === 5
                      ? 'bg-primary text-primary-foreground shadow-glow animate-pulse'
                      : step.number < 5
                      ? 'bg-primary text-primary-foreground shadow-glow'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {complete ? <Check className="h-5 w-5" /> : step.number < 5 ? <Check className="h-5 w-5" /> : step.number}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    step.number <= 5 ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < progressSteps.length - 1 && (
                  <ChevronRight className="h-5 w-5 text-muted-foreground mx-2 mb-6" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-12">
          {!complete ? (
            <>
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <Loader2 className="h-16 w-16 text-primary animate-spin" />
                  <div className="absolute inset-0 bg-primary opacity-20 blur-xl rounded-full"></div>
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-4 text-center text-foreground">Nyx is Getting Things Ready</h1>

              <div className="space-y-3 mb-8 max-w-md mx-auto">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 transition-all ${
                      index <= currentStep ? 'opacity-100' : 'opacity-30'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      index < currentStep ? 'bg-success' : 
                      index === currentStep ? 'bg-primary animate-pulse' : 'bg-muted'
                    }`} />
                    <p className="text-left text-sm text-muted-foreground">{step}</p>
                    {index < currentStep && (
                      <Check className="h-4 w-4 text-success ml-auto" />
                    )}
                  </div>
                ))}
              </div>
              
              {organizationResult && (
                <div className="mt-4 p-3 bg-primary/10 border border-primary/30 rounded-lg max-w-md mx-auto">
                  <p className="text-xs text-primary font-medium flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Organized {organizationResult.accounts?.reduce((sum: number, acc: any) => 
                      sum + acc.organized_count, 0) || 0} emails across{' '}
                    {organizationResult.total_accounts_processed || 0} account(s)
                  </p>
                </div>
              )}

              {error && (
                <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded-lg flex items-start gap-2 max-w-md mx-auto">
                  <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-warning-foreground text-left">
                    {error} - Don't worry, you can organize emails later from your dashboard.
                  </p>
                </div>
              )}

              <p className="text-sm text-muted-foreground mt-6 text-center">
                This usually takes 20-30 seconds...
              </p>
            </>
          ) : (
            <>
              <div className="mb-8 flex justify-center relative">
                <div className="p-4 bg-success/20 rounded-full">
                  <Check className="h-16 w-16 text-success" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-primary rounded-full animate-ping"
                      style={{
                        animationDelay: `${i * 100}ms`,
                        transform: `rotate(${i * 45}deg) translateY(-100px)`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-4 text-center text-foreground">All Set!</h1>
              
              {organizationResult && (
                <div className="mb-4 p-4 bg-success/10 border border-success/30 rounded-lg max-w-lg mx-auto">
                  <p className="text-sm text-foreground font-medium mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-success" />
                    Successfully organized your inbox!
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Processed {organizationResult.total_accounts_processed} email account(s)</p>
                    <p>• Categorized {organizationResult.accounts?.reduce((sum: number, acc: any) => 
                      sum + acc.organized_count, 0) || 0} emails</p>
                    <p>• Applied your selected categories automatically</p>
                  </div>
                </div>
              )}
              
              <p className="text-muted-foreground text-center">
                Redirecting to your dashboard...
              </p>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Processing;