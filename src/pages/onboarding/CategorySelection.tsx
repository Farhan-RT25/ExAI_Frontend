import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, Check, CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { recommendCategories, saveUserCategories } from "@/lib/api/onboarding";

interface CategoryRecommendation {
  id: string;
  name: string;
  description: string;
  recommended: boolean;
  reason: string;
}

const steps = [
  { number: 1, label: "Email Connection" },
  { number: 2, label: "OAuth Authorization" },
  { number: 3, label: "User Questions" },
  { number: 4, label: "Categories" },
  { number: 5, label: "Processing" },
];

const CategorySelection = () => {
  const navigate = useNavigate();
  const { userAnswers, selectedCategories, setSelectedCategories } = useOnboarding();
  
  const [categories, setCategories] = useState<CategoryRecommendation[]>([]);
  const [selected, setSelected] = useState<string[]>(selectedCategories);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await recommendCategories({
        role: userAnswers.role,
        industry: userAnswers.industry,
        emailVolume: userAnswers.emailVolume,
        communicationStyle: userAnswers.communicationStyle,
        emailsTo: userAnswers.emailsTo,
      });

      setCategories(data.categories);

      const recommendedIds = data.categories
        .filter((cat: CategoryRecommendation) => cat.recommended)
        .map((cat: CategoryRecommendation) => cat.id);
      
      setSelected(recommendedIds);

    } catch (err: any) {
      console.error("Error fetching recommendations:", err);
      setError(err.message || "Failed to load categories");
      
      setCategories([
        { id: 'to-respond', name: 'To Respond', description: 'Emails that require your action', recommended: true, reason: 'Essential for everyone' },
        { id: 'waiting-reply', name: 'Waiting Reply', description: "Emails where you're waiting for a response", recommended: false, reason: '' },
        { id: 'notifications', name: 'Notifications', description: 'System alerts and automated emails', recommended: false, reason: '' },
        { id: 'marketing', name: 'Marketing', description: 'Newsletters and promotional content', recommended: false, reason: '' },
        { id: 'sales', name: 'Sales', description: 'Sales inquiries and opportunities', recommended: true, reason: 'Matches your sales role' },
        { id: 'admin', name: 'Admin', description: 'Internal operations and paperwork', recommended: false, reason: '' },
        { id: 'hr', name: 'HR', description: 'People and recruitment related emails', recommended: false, reason: '' },
        { id: 'meeting-event', name: 'Meeting/Event', description: 'Calendar invites and meeting details', recommended: true, reason: 'Important for client meetings' },
        { id: 'projects', name: 'Projects', description: 'Project-specific communications', recommended: false, reason: '' },
        { id: 'personal', name: 'Personal', description: 'Personal and non-work emails', recommended: false, reason: '' },
      ]);
      setSelected(['to-respond', 'sales', 'meeting-event']);
    } finally {
      setLoading(false);
    }
  };

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

  const handleContinue = () => {
    if (selected.length === 0) {
      alert("Please select at least one category");
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmationResponse = async (agree: boolean) => {
    try {
      setSaving(true);

      const userJson = localStorage.getItem("user");
      if (!userJson) {
        throw new Error("User data not found. Please log in again.");
      }
      
      const userData = JSON.parse(userJson);
      const userId = Number(userData.user_id);

      await saveUserCategories(userId, {
        selected_category_ids: selected,
        user_profile: {
          role: userAnswers.role,
          industry: userAnswers.industry,
          emailVolume: userAnswers.emailVolume,
          communicationStyle: userAnswers.communicationStyle,
          emailsTo: userAnswers.emailsTo,
        },
        is_categories_agree: agree,
      });

      setSelectedCategories(selected);
      navigate('/onboarding/processing');

    } catch (err: any) {
      console.error("Error saving categories:", err);
      alert(err.message || "Failed to save categories. Please try again.");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-12 shadow-card-hover rounded-xl border-border bg-card">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-primary/20 rounded-full">
              <Sparkles className="h-12 w-12 text-primary animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-center text-foreground">AI is analyzing your profile...</h2>
            <p className="text-muted-foreground text-center">
              Personalizing category recommendations based on your answers
            </p>
            <Loader2 className="h-8 w-8 animate-spin text-primary mt-4" />
          </div>
        </Card>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl bg-card shadow-card-hover rounded-xl overflow-hidden border-border">
          <div className="bg-secondary/50 px-8 py-6 border-b border-border">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step.number <= 5
                        ? 'bg-primary text-primary-foreground shadow-glow' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {step.number < 5 ? <Check className="h-5 w-5" /> : step.number}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${
                      step.number <= 5 ? 'text-primary' : 'text-muted-foreground'
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

          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Apply Categories to Your Inbox?</h1>
              <p className="text-muted-foreground">
                Would you like Nyx to automatically organize your emails using these {selected.length} categories?
              </p>
            </div>

            <div className="mb-8 p-6 bg-primary/10 border border-primary/30 rounded-lg max-w-2xl mx-auto">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                Selected Categories ({selected.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories
                  .filter(cat => selected.includes(cat.id))
                  .map(cat => (
                    <Badge key={cat.id} className="bg-primary text-primary-foreground text-sm py-1 px-3">
                      {cat.name}
                    </Badge>
                  ))}
              </div>
            </div>

            <div className="space-y-4 mb-8 max-w-2xl mx-auto">
              <div
                className="p-4 bg-success/10 border-2 border-success/30 rounded-lg cursor-pointer hover:bg-success/20 transition-colors"
                onClick={() => handleConfirmationResponse(true)}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Yes, organize my inbox</p>
                    <p className="text-sm text-muted-foreground">
                      Nyx will automatically categorize your emails and help you stay organized
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="p-4 bg-secondary/50 border-2 border-border rounded-lg cursor-pointer hover:bg-secondary transition-colors"
                onClick={() => handleConfirmationResponse(false)}
              >
                <div className="flex items-start gap-3">
                  <XCircle className="h-6 w-6 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">No, not right now</p>
                    <p className="text-sm text-muted-foreground">
                      Your preferences will be saved, but categories won't be applied to incoming emails
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-border">
              <Button
                variant="ghost"
                onClick={() => setShowConfirmation(false)}
                disabled={saving}
                className="text-muted-foreground hover:text-foreground"
              >
                Back
              </Button>
              <Button
                onClick={() => handleConfirmationResponse(true)}
                disabled={saving}
                className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 h-11"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>Finish Setup</>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 py-12">
      <Card className="w-full max-w-4xl bg-card shadow-card-hover rounded-xl overflow-hidden border-border">
        <div className="bg-secondary/50 px-8 py-6 border-b border-border">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step.number <= 4
                      ? 'bg-primary text-primary-foreground shadow-glow' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.number < 4 ? <Check className="h-5 w-5" /> : step.number}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    step.number <= 4 ? 'text-primary' : 'text-muted-foreground'
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

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Choose Your Email Categories</h1>
              <p className="text-muted-foreground">
                Select the categories Nyx will use to organize your inbox
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={selectAll} className="border-primary/50 text-primary hover:bg-primary/10">
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={deselectAll} className="border-border hover:bg-secondary">
                Deselect All
              </Button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-warning/10 border border-warning/30 rounded-lg">
              <p className="text-sm text-warning-foreground">
                <strong>Note:</strong> Using default recommendations. {error}
              </p>
            </div>
          )}

          <div className="mb-4 p-4 bg-info/10 border border-info/30 rounded-lg flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">AI-Powered Recommendations</p>
              <p className="text-sm text-muted-foreground">
                Based on your role as <strong>{userAnswers.role}</strong> in <strong>{userAnswers.industry}</strong>, 
                we've recommended the most relevant categories for you.
              </p>
            </div>
          </div>

          <div className="grid gap-3 mb-8">
            {categories.map((category) => {
              const isSelected = selected.includes(category.id);
              const isRecommended = category.recommended;

              return (
                <Card
                  key={category.id}
                  className={`p-4 cursor-pointer transition-all border-2 ${
                    isSelected ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
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
                        <h3 className="font-semibold text-foreground">{category.name}</h3>
                        {isRecommended && (
                          <Badge className="bg-primary text-primary-foreground gap-1">
                            <Sparkles className="h-3 w-3" />
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {category.description}
                      </p>
                      {isRecommended && category.reason && (
                        <p className="text-xs text-primary font-medium">
                          ✨ {category.reason}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={() => navigate('/onboarding/questions')}
              disabled={saving}
              className="text-muted-foreground hover:text-foreground"
            >
              Back
            </Button>
            <Button
              onClick={handleContinue}
              disabled={selected.length === 0}
              className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 h-11"
            >
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CategorySelection;