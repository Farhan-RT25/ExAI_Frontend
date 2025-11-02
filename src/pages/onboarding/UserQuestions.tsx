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
    id: 'role',
    question: "What's your role?",
    options: [
      'CEO / Executive',
      'Manager / Team Lead',
      'Sales / Business Development',
      'Marketing',
      'HR / Operations',
      'Engineer / Developer',
      'Other'
    ]
  },
  {
    id: 'industry',
    question: "What industry are you in?",
    options: [
      'Technology',
      'Finance',
      'Healthcare',
      'Retail / E-commerce',
      'Consulting',
      'Manufacturing',
      'Other'
    ]
  },
  {
    id: 'emailVolume',
    question: "How many emails do you receive daily?",
    options: [
      'Less than 20',
      '20-50',
      '50-100',
      '100-200',
      '200+ emails'
    ]
  },
  {
    id: 'communicationStyle',
    question: "What's your preferred communication style?",
    options: [
      'Direct and concise',
      'Friendly and detailed',
      'Professional and formal',
      'Casual and conversational'
    ]
  },
  {
    id: 'emailsTo',
    question: "Who do you email most?",
    options: [
      'Clients / Customers',
      'Team members',
      'Partners / Vendors',
      'Internal executives',
      'Mixed audience'
    ]
  }
];

const UserQuestions = () => {
  const navigate = useNavigate();
  const { userAnswers, setUserAnswers } = useOnboarding();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({
    role: userAnswers.role,
    industry: userAnswers.industry,
    emailVolume: userAnswers.emailVolume,
    communicationStyle: userAnswers.communicationStyle,
    emailsTo: userAnswers.emailsTo,
  });
  const [otherText, setOtherText] = useState('');

  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQ.id] || '';
  const isOtherSelected = currentAnswer === 'Other';

  const handleNext = () => {
    const finalAnswer = isOtherSelected && otherText ? otherText : currentAnswer;
    const newAnswers = { ...answers, [currentQ.id]: finalAnswer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setOtherText('');
    } else {
      // Last question - save and continue
      setUserAnswers({
        role: newAnswers.role || '',
        industry: newAnswers.industry || '',
        emailVolume: newAnswers.emailVolume || '',
        communicationStyle: newAnswers.communicationStyle || '',
        emailsTo: newAnswers.emailsTo || '',
      });
      navigate('/onboarding/categories');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setOtherText('');
    } else {
      navigate('/onboarding/oauth-auth');
    }
  };

  const canProceed = currentAnswer && (!isOtherSelected || otherText.trim());

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Progress Indicator */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-muted"></div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">Step 3 of 4</p>
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
            onValueChange={(value) => setAnswers({ ...answers, [currentQ.id]: value })}
            className="space-y-3"
          >
            {currentQ.options.map((option, index) => (
              <div key={index}>
                <Card className={`p-4 cursor-pointer transition-all ${
                  currentAnswer === option ? 'border-primary border-2 bg-primary/5' : 'border-2'
                }`}>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                      {option}
                    </Label>
                  </div>
                </Card>
                
                {option === 'Other' && currentAnswer === 'Other' && (
                  <div className="mt-3 ml-8">
                    <Input
                      placeholder="Please specify..."
                      value={otherText}
                      onChange={(e) => setOtherText(e.target.value)}
                      className="max-w-md"
                    />
                  </div>
                )}
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="min-w-32"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Continue'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserQuestions;
