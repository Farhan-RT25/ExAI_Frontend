import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Check, AlertCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { organizeAllEmails, startRealtimeEmailPolling } from "@/lib/api/onboarding";

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

      try {
        console.log("🚀 Starting realtime email polling for user:", userId);
        await startRealtimeEmailPolling(userId);
        console.log("✅ Realtime email polling started successfully");
      } catch (pollingError: any) {
        console.warn("⚠️ Failed to start realtime email polling:", pollingError);
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-2xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 md:p-12 shadow-2xl">
          {!complete ? (
            <>
              {/* Loading animation */}
              <div className="mb-10 flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-primary/20 flex items-center justify-center">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                  </div>
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center text-foreground">
                Setting Up Your Workspace
              </h1>
              <p className="text-muted-foreground text-center mb-8">
                Nyx is preparing everything for you
              </p>

              {/* Progress bar */}
              <div className="mb-8">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">{Math.round(progress)}% complete</p>
              </div>

              {/* Steps */}
              <div className="space-y-3 mb-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: index <= currentStep ? 1 : 0.3, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      index < currentStep 
                        ? 'bg-primary text-primary-foreground' 
                        : index === currentStep 
                        ? 'bg-primary/20 border-2 border-primary' 
                        : 'bg-muted border border-border'
                    }`}>
                      {index < currentStep ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : index === currentStep ? (
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      ) : (
                        <span className="text-xs text-muted-foreground">{index + 1}</span>
                      )}
                    </div>
                    <p className={`text-sm ${index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              {organizationResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-primary/10 border border-primary/30 rounded-lg"
                >
                  <p className="text-xs text-primary font-medium flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Organized {organizationResult.accounts?.reduce((sum: number, acc: any) => 
                      sum + acc.organized_count, 0) || 0} emails across{' '}
                    {organizationResult.total_accounts_processed || 0} account(s)
                  </p>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-warning/10 border border-warning/30 rounded-lg flex items-start gap-2"
                >
                  <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-warning-foreground text-left">
                    {error} - Don't worry, you can organize emails later from your dashboard.
                  </p>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Success animation */}
              <div className="mb-8 flex justify-center relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/30">
                  <Check className="h-12 w-12 text-primary-foreground" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 1.5] }}
                      transition={{ delay: i * 0.1, duration: 1, repeat: Infinity, repeatDelay: 2 }}
                      className="absolute w-3 h-3 bg-primary rounded-full"
                      style={{
                        transform: `rotate(${i * 45}deg) translateY(-60px)`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-3 text-center text-foreground">
                You're All Set!
              </h1>
              
              {organizationResult && (
                <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-xl">
                  <p className="text-sm text-foreground font-medium mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
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
              
              <p className="text-muted-foreground text-center flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Redirecting to your dashboard...
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Processing;