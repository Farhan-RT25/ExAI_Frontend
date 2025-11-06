import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Mail, Sparkles, Loader2 } from "lucide-react";

// Mock context and navigation for demo
const useOnboarding = () => ({
  userAnswers: {
    role: "Sales / Business Development",
    industry: "Technology",
    emailVolume: "50-100",
    communicationStyle: "Direct and concise",
    emailsTo: "Clients / Customers"
  },
  selectedCategories: [],
  setSelectedCategories: (cats: string[]) => console.log("Saved:", cats)
});

const useNavigate = () => (path: string) => console.log("Navigate to:", path);

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

  // Fetch AI recommendations on mount
  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user ID from localStorage
      const userJson = localStorage.getItem("user");
      if (!userJson) {
        throw new Error("User data not found. Please log in again.");
      }
      
      const userData = JSON.parse(userJson);
      const userId = Number(userData.user_id);

      // Call recommendation API
      const API_BASE = import.meta.env.VITE_API_BASE;
      const token = localStorage.getItem("access_token");

      const response = await fetch(`${API_BASE}/ai-onboarding/recommend-categories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          role: userAnswers.role,
          industry: userAnswers.industry,
          emailVolume: userAnswers.emailVolume,
          communicationStyle: userAnswers.communicationStyle,
          emailsTo: userAnswers.emailsTo,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get recommendations");
      }

      const data = await response.json();
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

  const handleFinish = async () => {
    try {
      setSaving(true);

      // Get user ID
      const userJson = localStorage.getItem("user");
      if (!userJson) {
        throw new Error("User data not found. Please log in again.");
      }
      
      const userData = JSON.parse(userJson);
      const userId = Number(userData.user_id);

      // Save categories to backend
      const API_BASE = import.meta.env.VITE_API_BASE;
      const token = localStorage.getItem("access_token");

      const response = await fetch(`${API_BASE}/ai-onboarding/save-categories?user_id=${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          selected_category_ids: selected,
          user_profile: {
            role: userAnswers.role,
            industry: userAnswers.industry,
            emailVolume: userAnswers.emailVolume,
            communicationStyle: userAnswers.communicationStyle,
            emailsTo: userAnswers.emailsTo,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save categories");
      }

      // Save to context
      setSelectedCategories(selected);

      // Navigate to processing/completion
      navigate('/onboarding/processing');

    } catch (err: any) {
      console.error("Error saving categories:", err);
      alert(err.message || "Failed to save categories. Please try again.");
    } finally {
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
            onClick={handleFinish}
            disabled={selected.length === 0 || saving}
            className="min-w-32"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Finish Setup"
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CategorySelection;