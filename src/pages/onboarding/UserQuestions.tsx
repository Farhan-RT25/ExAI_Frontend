import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Mail } from "lucide-react";

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

  // Restore otherText on question change
  useState(() => {
    if (isOtherSelected) {
      setOtherTexts((prev) => ({ ...prev, [currentQ.id]: currentOtherText }));
    }
  });

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
      return; // Don't proceed if Other is selected but no text
    }

    const newAnswers = { ...answers, [currentQ.id]: finalAnswer } as UserAnswers;
    setAnswers(newAnswers);

    // If there are more questions, go to next
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }

    // Last question: Validate all answers are filled
    const hasAllAnswers = Object.values(newAnswers).every((ans) => ans.trim().length > 0);
    if (!hasAllAnswers) {
      // Optionally show error toast here
      console.warn("Incomplete answers detected");
      return;
    }

    setLoading(true);
    try {
      // Save to context
      setUserAnswers(newAnswers);

      // Small delay for UX (simulate processing)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Navigate to categories page - AI recommendation will happen there
      navigate("/onboarding/categories");
    } catch (error) {
      console.error("Error saving answers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      // Save current otherText before going back
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-muted"></div>
          <div className="w-3 h-3 rounded-full bg-muted"></div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">Step 3 of 5</p>
      </div>

      <Card className="w-full max-w-2xl p-8 shadow-card-hover">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-gradient-primary rounded-xl">
            <Mail className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">Tell Us About Yourself</h1>
        <p className="text-muted-foreground text-center mb-8">
          Help us personalize your experience
        </p>

        <div className="mb-6">
          <p className="text-sm text-muted-foreground text-center">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>

          <RadioGroup
            value={currentAnswer}
            onValueChange={handleAnswerChange}
            className="space-y-3"
          >
            {currentQ.options.map((option, index) => (
              <div key={index}>
                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    currentAnswer === option
                      ? "border-primary border-2 bg-primary/5"
                      : "border-2 border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={option} id={`option-${currentQuestion}-${index}`} />
                    <Label htmlFor={`option-${currentQuestion}-${index}`} className="flex-grow cursor-pointer">
                      {option}
                    </Label>
                  </div>
                </Card>

                {option === "Other" && currentAnswer === "Other" && (
                  <div className="mt-3 ml-8">
                    <Input
                      placeholder="Please specify..."
                      value={currentOtherText}
                      onChange={(e) => handleOtherTextChange(e.target.value)}
                      className="max-w-md"
                      disabled={loading}
                    />
                  </div>
                )}
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={handleBack} disabled={loading}>
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed || loading}
            className="min-w-32"
          >
            {loading
              ? "Processing..."
              : currentQuestion < questions.length - 1
              ? "Next Question"
              : "Continue"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserQuestions;