import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Mail } from "lucide-react";

const categories = [
  {
    id: 'to-respond',
    name: 'To Respond',
    description: 'Emails that require your action',
    defaultRecommended: true,
  },
  {
    id: 'waiting-reply',
    name: 'Waiting Reply',
    description: "Emails where you're waiting for a response",
    defaultRecommended: false,
  },
  {
    id: 'notifications',
    name: 'Notifications',
    description: 'System alerts and automated emails',
    defaultRecommended: false,
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Newsletters and promotional content',
    defaultRecommended: false,
  },
  {
    id: 'sales',
    name: 'Sales',
    description: 'Sales inquiries and opportunities',
    defaultRecommended: false,
  },
  {
    id: 'admin',
    name: 'Admin',
    description: 'Internal operations and paperwork',
    defaultRecommended: false,
  },
  {
    id: 'hr',
    name: 'HR',
    description: 'People and recruitment related emails',
    defaultRecommended: false,
  },
  {
    id: 'meeting-event',
    name: 'Meeting/Event',
    description: 'Calendar invites and meeting details',
    defaultRecommended: false,
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'Project-specific communications',
    defaultRecommended: false,
  },
  {
    id: 'personal',
    name: 'Personal',
    description: 'Personal and non-work emails',
    defaultRecommended: false,
  },
];

const CategorySelection = () => {
  const navigate = useNavigate();
  const { userAnswers, selectedCategories, setSelectedCategories } = useOnboarding();
  const [selected, setSelected] = useState<string[]>(selectedCategories);
  const [recommended, setRecommended] = useState<string[]>([]);

  useEffect(() => {
    // Determine recommended categories based on user role
    const role = userAnswers.role.toLowerCase();
    let recommendedIds = ['to-respond', 'waiting-reply', 'meeting-event'];

    if (role.includes('ceo') || role.includes('executive')) {
      recommendedIds = ['to-respond', 'meeting-event', 'sales'];
    } else if (role.includes('sales')) {
      recommendedIds = ['sales', 'to-respond', 'meeting-event'];
    } else if (role.includes('hr')) {
      recommendedIds = ['hr', 'to-respond', 'meeting-event'];
    } else if (role.includes('marketing')) {
      recommendedIds = ['marketing', 'projects', 'to-respond'];
    } else if (role.includes('engineer') || role.includes('developer')) {
      recommendedIds = ['projects', 'notifications', 'to-respond'];
    } else if (role.includes('manager')) {
      recommendedIds = ['to-respond', 'meeting-event', 'projects'];
    }

    setRecommended(recommendedIds);
    
    // Pre-select recommended categories if no selection exists
    if (selected.length === 0) {
      setSelected(recommendedIds);
    }
  }, [userAnswers.role]);

  const toggleCategory = (categoryId: string) => {
    setSelected(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const selectAll = () => {
    setSelected(categories.map(c => c.id));
  };

  const deselectAll = () => {
    setSelected([]);
  };

  const handleFinish = () => {
    setSelectedCategories(selected);
    navigate('/onboarding/processing');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 py-12">
      {/* Progress Indicator */}
      <div className="w-full max-w-3xl mb-8">
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">Step 4 of 4</p>
      </div>

      <Card className="w-full max-w-3xl p-8 shadow-card-hover">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-gradient-primary rounded-xl">
            <Mail className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Choose Your Email Categories</h1>
            <p className="text-muted-foreground">
              Select the categories Ex AI will use to organize your inbox
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={selectAll}>
              Select All
            </Button>
            <Button variant="outline" size="sm" onClick={deselectAll}>
              Deselect All
            </Button>
          </div>
        </div>

        <div className="grid gap-3 mb-8">
          {categories.map((category) => {
            const isSelected = selected.includes(category.id);
            const isRecommended = recommended.includes(category.id);

            return (
              <Card
                key={category.id}
                className={`p-4 cursor-pointer transition-all ${
                  isSelected ? 'border-primary border-2 bg-primary/5' : 'border-2'
                }`}
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleCategory(category.id)}
                    className="mt-1"
                  />
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{category.name}</h3>
                      {isRecommended && (
                        <Badge className="bg-primary text-primary-foreground">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/onboarding/questions')}
          >
            Back
          </Button>
          <Button
            onClick={handleFinish}
            disabled={selected.length === 0}
            className="min-w-32"
          >
            Finish Setup
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CategorySelection;
