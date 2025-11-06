import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const steps = [
  'Analyzing your email patterns',
  'Creating smart categories',
  'Setting up AI draft system',
  'Organizing your last 15 days',
];

const Processing = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const totalDuration = 18000; // 18 seconds
    const stepDuration = totalDuration / 4;
    const updateInterval = 100; // Update every 100ms

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (totalDuration / updateInterval));
        
        // Update current step based on progress
        const step = Math.floor(newProgress / 25);
        if (step !== currentStep && step < 4) {
          setCurrentStep(step);
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setComplete(true);
          // Set onboarding completion flag
          localStorage.setItem('onboarding_completed', 'true');
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
          return 100;
        }

        return newProgress;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [navigate, currentStep]);

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
                    index === currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                  <p className="text-left">{step}</p>
                </div>
              ))}
            </div>

            <Progress value={progress} className="mb-4" />
            
            <p className="text-sm text-muted-foreground">
              {Math.round(progress)}% complete
            </p>

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
              <div className="absolute inset-0 flex items-center justify-center">
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
