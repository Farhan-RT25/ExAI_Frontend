import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { HelpCircle, Bell, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getDraftSettings, saveDraftSettings, DraftSettings, DraftCategorySetting } from "@/lib/api/draftSettings";
import { getUser } from "@/lib/api/auth";

const Drafts = () => {
  const { toast } = useToast();
  const [globalEnabled, setGlobalEnabled] = useState(true);
  const [notifyOnDrafts, setNotifyOnDrafts] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<DraftCategorySetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  // Load draft settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const user = getUser();
        if (!user || !user.user_id) {
          toast({
            title: "Error",
            description: "Please login to access draft settings",
            variant: "destructive",
          });
          return;
        }

        setUserId(user.user_id);
        const settings = await getDraftSettings(user.user_id);
        
        setGlobalEnabled(settings.enabled);
        setNotifyOnDrafts(settings.notify_on_draft_ready);
        
        // Set selected categories - mark enabled ones from selected_categories
        const categoryMap = new Map(
          settings.all_categories.map(cat => [cat.id, cat])
        );
        
        const updatedCategories = settings.all_categories.map(cat => ({
          ...cat,
          enabled: settings.selected_categories.includes(cat.id)
        }));
        
        setSelectedCategories(updatedCategories);
      } catch (error) {
        console.error("Failed to load draft settings:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load draft settings",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [toast]);

  const handleCategoryToggle = (categoryId: string, checked: boolean) => {
    setSelectedCategories(prev => prev.map(cat =>
      cat.id === categoryId ? { ...cat, enabled: checked } : cat
    ));
  };

  const handleSave = async () => {
    if (!userId) {
      toast({
        title: "Error",
        description: "User ID not found",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      
      const selectedCategoryIds = selectedCategories
        .filter(cat => cat.enabled)
        .map(cat => cat.id);

      await saveDraftSettings(userId, {
        enabled: globalEnabled,
        notify_on_draft_ready: notifyOnDrafts,
        selected_categories: selectedCategoryIds,
      });

      toast({
        title: "Success",
        description: "Draft settings saved successfully",
      });
    } catch (error) {
      console.error("Failed to save draft settings:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save draft settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <p className="text-md text-muted-foreground">
          Configure how AI generates draft responses for your emails
        </p>
      </div>

      {/* Master Toggle */}
      <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
        <CardHeader className="pb-3 pt-5 px-5">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5 mb-2">
                Enable Draft Replies
                <HelpCircle className="h-3.5 w-3.5" />
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                When enabled, AI will automatically generate draft responses for emails that require replies
              </p>
            </div>
            <Switch
              checked={globalEnabled}
              onCheckedChange={setGlobalEnabled}
            />
          </div>
        </CardHeader>
      </Card>

      {/* Draft Review Settings */}
      <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
        <CardHeader className="pb-3 pt-5 px-5">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            Draft Review Settings
            <HelpCircle className="h-3.5 w-3.5" />
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-4">
          <div className="flex items-start justify-between py-3 border-b border-border">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1">Notify when drafts are ready</p>
                <p className="text-xs text-muted-foreground">
                  Receive notifications when AI finishes generating draft responses
                </p>
              </div>
            </div>
            <Switch
              checked={notifyOnDrafts}
              onCheckedChange={setNotifyOnDrafts}
            />
          </div>

          <div className="pt-2">
            <p className="text-sm font-medium mb-3">Auto-draft for these categories</p>
            {selectedCategories.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4">
                No categories available. Please set up your categories first.
              </p>
            ) : (
              <div className="space-y-2">
                {selectedCategories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-3 py-2">
                    <Checkbox
                      id={category.id}
                      checked={category.enabled}
                      onCheckedChange={(checked) => handleCategoryToggle(category.id, checked as boolean)}
                    />
                    <label
                      htmlFor={category.id}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="min-w-[120px]"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Settings"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Drafts;
