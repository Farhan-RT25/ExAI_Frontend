import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Check, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { organizeAllEmails } from "@/lib/api/onboarding";

const steps = [
  'Analyzing your email patterns',
  'Creating smart categories',
  'Setting up AI draft system',
  'Organizing your last 15 days of emails',
];

const Processing = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [organizationResult, setOrganizationResult] = useState<any>(null);

  useEffect(() => {
    // Start the email organization process immediately
    startEmailOrganization();
    
    // Start the visual progress animation
    const totalDuration = 20000; // 20 seconds to match typical AI processing time
    const updateInterval = 100; // Update every 100ms

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (totalDuration / updateInterval));
        
        // Update current step based on progress
        const step = Math.floor(newProgress / 25);
        if (step !== currentStep && step < 4) {
          setCurrentStep(step);
        }

        // Don't complete until we have organization results or error
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }

        return newProgress;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, []);

  // Check if organization is complete and progress is at 100%
  useEffect(() => {
    if (progress >= 100 && (organizationResult || error)) {
      setComplete(true);
      // Set onboarding completion flag
      localStorage.setItem('onboarding_completed', 'true');
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  }, [progress, organizationResult, error, navigate]);

  const startEmailOrganization = async () => {
    try {
      // Get user ID from localStorage
      const userJson = localStorage.getItem("user");
      if (!userJson) {
        throw new Error("User data not found. Please log in again.");
      }
      
      const userData = JSON.parse(userJson);
      const userId = Number(userData.user_id);

      console.log("🚀 Starting email organization for user:", userId);

      // Call the organize all emails API
      const result = await organizeAllEmails(userId);
      
      console.log("✅ Email organization completed:", result);
      setOrganizationResult(result);

      // If progress is already at 100%, set complete immediately
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
      
      // Even on error, allow completion after progress reaches 100%
      // The user can still proceed to dashboard
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {!complete ? (
          <>
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <Loader2 className="h-16 w-16 text-primary animate-spin" />
                <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-xl rounded-full"></div>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4">Ex AI is Getting Things Ready</h1>

            <div className="space-y-3 mb-8">
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
                  <p className="text-left text-sm">{step}</p>
                  {index < currentStep && (
                    <Check className="h-4 w-4 text-success ml-auto" />
                  )}
                </div>
              ))}
            </div>

            <Progress value={progress} className="mb-4" />
            
            <p className="text-sm text-muted-foreground">
              {Math.round(progress)}% complete
            </p>

            {/* Show organization progress if available */}
            {organizationResult && (
              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <p className="text-xs text-primary font-medium">
                  ✓ Organized {organizationResult.accounts?.reduce((sum: number, acc: any) => 
                    sum + acc.organized_count, 0) || 0} emails across{' '}
                  {organizationResult.total_accounts_processed || 0} account(s)
                </p>
              </div>
            )}

            {/* Show error if any */}
            {error && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-yellow-800 text-left">
                  {error} - Don't worry, you can organize emails later from your dashboard.
                </p>
              </div>
            )}

            <p className="text-sm text-muted-foreground mt-4">
              This usually takes 20-30 seconds...
            </p>
          </>
        ) : (
          <>
            <div className="mb-8 flex justify-center relative">
              <div className="p-4 bg-success/10 rounded-full">
                <Check className="h-16 w-16 text-success" />
              </div>
              {/* Confetti effect */}
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

            <h1 className="text-3xl font-bold mb-4">All Set!</h1>
            
            {organizationResult && (
              <div className="mb-4 p-4 bg-success/10 rounded-lg">
                <p className="text-sm text-success-foreground font-medium mb-2">
                  🎉 Successfully organized your inbox!
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Processed {organizationResult.total_accounts_processed} email account(s)</p>
                  <p>• Categorized {organizationResult.accounts?.reduce((sum: number, acc: any) => 
                    sum + acc.organized_count, 0) || 0} emails</p>
                  <p>• Applied your selected categories automatically</p>
                </div>
              </div>
            )}
            
            <p className="text-muted-foreground">
              Redirecting to your dashboard...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Processing;