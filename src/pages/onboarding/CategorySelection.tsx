import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Mail, Sparkles, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { recommendCategories, saveUserCategories } from "@/lib/api/onboarding";

// API types
interface CategoryRecommendation {
  id: string;
  name: string;
  description: string;
  recommended: boolean;
  reason: string;
}

const CategorySelection = () => {
  const navigate = useNavigate();
  const { userAnswers, selectedCategories, setSelectedCategories } = useOnboarding();
  
  const [categories, setCategories] = useState<CategoryRecommendation[]>([]);
  const [selected, setSelected] = useState<string[]>(selectedCategories);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Fetch AI recommendations on mount
  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call recommendation API using the imported function
      const data = await recommendCategories({
        role: userAnswers.role,
        industry: userAnswers.industry,
        emailVolume: userAnswers.emailVolume,
        communicationStyle: userAnswers.communicationStyle,
        emailsTo: userAnswers.emailsTo,
      });

      setCategories(data.categories);

      // Pre-select recommended categories
      const recommendedIds = data.categories
        .filter((cat: CategoryRecommendation) => cat.recommended)
        .map((cat: CategoryRecommendation) => cat.id);
      
      setSelected(recommendedIds);

    } catch (err: any) {
      console.error("Error fetching recommendations:", err);
      setError(err.message || "Failed to load categories");
      
      // Fallback to default categories
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

      // Get user ID
      const userJson = localStorage.getItem("user");
      if (!userJson) {
        throw new Error("User data not found. Please log in again.");
      }
      
      const userData = JSON.parse(userJson);
      const userId = Number(userData.user_id);

      // Save categories using the imported function
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

      // Save to context
      setSelectedCategories(selected);

      // Navigate to processing/completion
      navigate('/onboarding/processing');

    } catch (err: any) {
      console.error("Error saving categories:", err);
      alert(err.message || "Failed to save categories. Please try again.");
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-3xl p-12 shadow-card-hover">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Sparkles className="h-12 w-12 text-primary animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-center">AI is analyzing your profile...</h2>
            <p className="text-muted-foreground text-center">
              Personalizing category recommendations based on your answers
            </p>
            <Loader2 className="h-8 w-8 animate-spin text-primary mt-4" />
          </div>
        </Card>
      </div>
    );
  }

  // Confirmation screen
  if (showConfirmation) {
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
          <p className="text-center text-sm text-muted-foreground mt-2">Step 5 of 5</p>
        </div>

        <Card className="w-full max-w-3xl p-8 shadow-card-hover">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-gradient-primary rounded-xl">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2 text-center">Apply Categories to Your Inbox?</h1>
          <p className="text-muted-foreground text-center mb-8">
            Would you like Ex AI to automatically organize your emails using these {selected.length} categories?
          </p>

          {/* Selected Categories Preview */}
          <div className="mb-8 p-6 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Selected Categories ({selected.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories
                .filter(cat => selected.includes(cat.id))
                .map(cat => (
                  <Badge key={cat.id} variant="secondary" className="text-sm py-1 px-3">
                    {cat.name}
                  </Badge>
                ))}
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div
              className="p-4 bg-green-50 border border-green-200 rounded-lg cursor-pointer hover:bg-green-100"
              onClick={() => handleConfirmationResponse(true)}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-900 mb-1">Yes, organize my inbox</p>
                  <p className="text-sm text-green-700">
                    Ex AI will automatically categorize your emails and help you stay organized
                  </p>
                </div>
              </div>
            </div>

            <div
              className="p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => handleConfirmationResponse(false)}
            >
              <div className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 mb-1">No, not right now</p>
                  <p className="text-sm text-gray-700">
                    Your preferences will be saved, but categories won't be applied to incoming emails
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              onClick={() => setShowConfirmation(false)}
              disabled={saving}
            >
              Back
            </Button>
            <Button
              onClick={() => handleConfirmationResponse(true)}
              disabled={saving}
              className="min-w-32"
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
        </Card>
      </div>
    );
  }

  // Category selection screen
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 py-12">
      {/* Progress Indicator */}
      <div className="w-full max-w-3xl mb-8">
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-muted"></div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">Step 4 of 5</p>
      </div>

      <Card className="w-full max-w-3xl p-8 shadow-card-hover">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-gradient-primary rounded-xl">
            <Mail className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>

        <div className="flex items-start justify-between mb-2">
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

        {error && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Using default recommendations. {error}
            </p>
          </div>
        )}

        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">AI-Powered Recommendations</p>
            <p className="text-sm text-blue-700">
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

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/onboarding/questions')}
            disabled={saving}
          >
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={selected.length === 0}
            className="min-w-32"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CategorySelection;