import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Check, ChevronRight } from "lucide-react";

const questions = [
  {
    id: "role",
    question: "What's your role?",
    options: [
      "CEO / Executive",
      "Manager / Team Lead",
      "Sales / Business Development",
      "Marketing",
      "HR / Operations",
      "Engineer / Developer",
      "Other",
    ],
  },
  {
    id: "industry",
    question: "What industry are you in?",
    options: [
      "Technology",
      "Finance",
      "Healthcare",
      "Retail / E-commerce",
      "Consulting",
      "Manufacturing",
      "Other",
    ],
  },
  {
    id: "emailVolume",
    question: "How many emails do you receive daily?",
    options: ["Less than 20", "20-50", "50-100", "100-200", "200+ emails"],
  },
  {
    id: "communicationStyle",
    question: "What's your preferred communication style?",
    options: [
      "Direct and concise",
      "Friendly and detailed",
      "Professional and formal",
      "Casual and conversational",
    ],
  },
  {
    id: "emailsTo",
    question: "Who do you email most?",
    options: [
      "Clients / Customers",
      "Team members",
      "Partners / Vendors",
      "Internal executives",
      "Mixed audience",
    ],
  },
];

interface UserAnswers {
  role: string;
  industry: string;
  emailVolume: string;
  communicationStyle: string;
  emailsTo: string;
}

const steps = [
  { number: 1, label: "Email Connection" },
  { number: 2, label: "OAuth Authorization" },
  { number: 3, label: "User Questions" },
  { number: 4, label: "Categories" },
  { number: 5, label: "Processing" },
];

const UserQuestions = () => {
  const navigate = useNavigate();
  const { userAnswers, setUserAnswers } = useOnboarding();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<UserAnswers>({
    role: userAnswers.role || "",
    industry: userAnswers.industry || "",
    emailVolume: userAnswers.emailVolume || "",
    communicationStyle: userAnswers.communicationStyle || "",
    emailsTo: userAnswers.emailsTo || "",
  });
  
  const [otherTexts, setOtherTexts] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQ.id as keyof UserAnswers] || ""; 
  const currentOtherText = otherTexts[currentQ.id] || "";
  const isOtherSelected = currentAnswer === "Other";

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value } as UserAnswers));
    if (value !== "Other") {
      setOtherTexts((prev) => {
        const newOther = { ...prev };
        delete newOther[currentQ.id];
        return newOther;
      });
    }
  };

  const handleOtherTextChange = (value: string) => {
    setOtherTexts((prev) => ({ ...prev, [currentQ.id]: value }));
  };

  const handleNext = async () => {
    let finalAnswer = currentAnswer;
    if (isOtherSelected && currentOtherText.trim()) {
      finalAnswer = currentOtherText.trim();
    } else if (isOtherSelected) {
      return;
    }

    const newAnswers = { ...answers, [currentQ.id]: finalAnswer } as UserAnswers;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }

    const hasAllAnswers = Object.values(newAnswers).every((ans) => ans.trim().length > 0);
    if (!hasAllAnswers) {
      console.warn("Incomplete answers detected");
      return;
    }

    setLoading(true);
    try {
      setUserAnswers(newAnswers);
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate("/onboarding/categories");
    } catch (error) {
      console.error("Error saving answers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      if (isOtherSelected && currentOtherText.trim()) {
        setOtherTexts((prev) => ({ ...prev, [currentQ.id]: currentOtherText }));
      }
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate("/onboarding/oauth-auth");
    }
  };

  const canProceed = (currentAnswer && currentAnswer !== "Other") || (isOtherSelected && currentOtherText.trim().length > 0);

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
                    step.number <= 3
                      ? 'bg-primary text-primary-foreground shadow-glow' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.number < 3 ? <Check className="h-5 w-5" /> : step.number}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    step.number <= 3 ? 'text-primary' : 'text-muted-foreground'
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Tell Us About Yourself</h1>
            <p className="text-muted-foreground">
              Help us personalize your experience
            </p>
            <p className="text-sm text-primary font-medium mt-2">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-foreground">{currentQ.question}</h2>

            <RadioGroup
              value={currentAnswer}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {currentQ.options.map((option, index) => (
                <div key={index}>
                  <RadioGroupItem 
                    value={option} 
                    id={`option-${currentQuestion}-${index}`} 
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`option-${currentQuestion}-${index}`}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      currentAnswer === option
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 hover:bg-secondary/50"
                    }`}
                  >
                    <div className="flex items-center flex-grow">
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        currentAnswer === option 
                          ? 'border-primary bg-primary' 
                          : 'border-muted-foreground'
                      }`}>
                        {currentAnswer === option && (
                          <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                        )}
                      </div>
                      <span className={currentAnswer === option ? 'font-medium text-foreground' : 'text-muted-foreground'}>
                        {option}
                      </span>
                    </div>
                  </Label>

                  {option === "Other" && currentAnswer === "Other" && (
                    <div className="mt-3 ml-8">
                      <Input
                        placeholder="Please specify..."
                        value={currentOtherText}
                        onChange={(e) => handleOtherTextChange(e.target.value)}
                        className="h-11 bg-background border-border"
                        disabled={loading}
                      />
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
            <Button 
              variant="ghost" 
              onClick={handleBack} 
              disabled={loading}
              className="text-muted-foreground hover:text-foreground"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed || loading}
              className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 h-11"
            >
              {loading
                ? "Processing..."
                : currentQuestion < questions.length - 1
                ? "Next Question"
                : "Continue"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserQuestions;