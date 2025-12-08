import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Mail, Clock, Bell, Megaphone, DollarSign, FileText, Users, Calendar, Trash2, Loader2 } from "lucide-react";
import { getUser, getAccessToken } from "@/lib/api/auth";
import { getUserCategories, saveUserCategories } from "@/lib/api/onboarding";
import { getDashboardAccounts, type EmailAccountInfo } from "@/lib/api/dashboard";
import { useToast } from "@/hooks/use-toast";

// Icon mapping for categories
const categoryIcons: Record<string, any> = {
  "to-respond": Mail,
  "waiting-reply": Clock,
  "notifications": Bell,
  "marketing": Megaphone,
  "sales": DollarSign,
  "admin": FileText,
  "hr": Users,
  "meeting-event": Calendar,
  "projects": FileText,
  "personal": Users,
};

// Color mapping for categories
const categoryColors: Record<string, string> = {
  "to-respond": "bg-red-500",
  "waiting-reply": "bg-amber-500",
  "notifications": "bg-blue-500",
  "marketing": "bg-green-500",
  "sales": "bg-emerald-500",
  "admin": "bg-slate-500",
  "hr": "bg-pink-500",
  "meeting-event": "bg-indigo-500",
  "projects": "bg-teal-500",
  "personal": "bg-cyan-500",
};

interface Category {
  id: string;
  name: string;
  description: string;
  isCustom: boolean;
  enabled: boolean;
}

const Categorization = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [categories, setCategories] = useState<Category[]>([]);
  const [emailAccounts, setEmailAccounts] = useState<EmailAccountInfo[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    selectedAccounts: [] as string[],
  });
  const { toast } = useToast();

  // Fetch categories and email accounts on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const user = getUser();
        if (!user || !user.user_id) {
          toast({
            title: "Error",
            description: "Please login to manage categories",
            variant: "destructive",
          });
          return;
        }

        // Fetch categories
        const categoriesData = await getUserCategories(user.user_id);
        if (categoriesData.success && categoriesData.categories) {
          setCategories(categoriesData.categories);
          // Store categoriesData for later use in save
          (window as any).__categoriesData = categoriesData;
        }

        // Fetch email accounts
        const accountsData = await getDashboardAccounts();
        if (Array.isArray(accountsData) && accountsData.length > 0) {
          setEmailAccounts(accountsData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load categories",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleToggle = (categoryId: string, checked: boolean) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, enabled: checked } : cat
    ));
  };

  const handleDeleteCustom = (categoryId: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
  };

  const getFilteredCategories = () => {
    if (activeTab === "all") return categories;
    if (activeTab === "active") return categories.filter(c => c.enabled);
    if (activeTab === "inactive") return categories.filter(c => !c.enabled);
    return categories;
  };

  const handleAccountToggle = (accountId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedAccounts: prev.selectedAccounts.includes(accountId)
        ? prev.selectedAccounts.filter(id => id !== accountId)
        : [...prev.selectedAccounts, accountId]
    }));
  };

  const handleSave = async () => {
    const user = getUser();
    if (!user || !user.user_id) {
      toast({
        title: "Error",
        description: "Please login to save categories",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      
      // Get enabled categories
      const enabledCategories = categories.filter(c => c.enabled);
      const customCategories = categories.filter(c => c.isCustom);
      
      // Build category states map
      const categoryStates: Record<string, boolean> = {};
      categories.forEach(cat => {
        categoryStates[cat.id] = cat.enabled;
      });

      // Prepare save request
      const saveData = {
        categories: categories.map(cat => ({
          id: cat.id,
          name: cat.name,
          description: cat.description,
          enabled: cat.enabled
        })),
        custom_categories: customCategories.map(cat => ({
          id: cat.id,
          name: cat.name,
          description: cat.description,
          enabled: cat.enabled
        })),
        selected_category_ids: enabledCategories.map(c => c.id), // For backward compatibility
        user_profile: userProfile || {
          role: "",
          industry: "",
          emailVolume: "",
          communicationStyle: "",
          emailsTo: ""
        }, // Keep existing profile or use defaults
        is_categories_agree: true, // You may want to add a toggle for this
      };

      const result = await saveUserCategories(user.user_id, saveData);
      
      toast({
        title: "Success",
        description: result.message || "Categories saved successfully",
      });
    } catch (error) {
      console.error("Failed to save categories:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save categories",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.description || formData.selectedAccounts.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields and select at least one email account",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Generate a unique ID for the custom category
      const customId = `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const newCategory: Category = {
        id: customId,
        name: formData.name,
        description: formData.description,
        isCustom: true,
        enabled: true, // New custom categories are enabled by default
      };

      setCategories(prev => [...prev, newCategory]);
      setDialogOpen(false);
      setFormData({ name: "", description: "", selectedAccounts: [] });
      
      toast({
        title: "Success",
        description: "Custom category created successfully",
      });
    } catch (error) {
      console.error("Failed to create category:", error);
      toast({
        title: "Error",
        description: "Failed to create custom category",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCategories = getFilteredCategories();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Email Categories</h2>
          <p className="text-md text-muted-foreground">
            Select which categories to use for organizing your emails. Only enabled categories will be used for AI categorization.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          {/* Filter Tabs */}
          <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === "all"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("active")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === "active"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab("inactive")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === "inactive"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Inactive
            </button>
          </div>

          {/* Add Category Button */}
          <Button
            onClick={() => setDialogOpen(true)}
            className="group w-full sm:w-auto"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            Add Custom Category
          </Button>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full sm:w-auto"
            size="sm"
            variant="default"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>

      {/* Grid Layout for Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredCategories.map((category) => {
          const Icon = categoryIcons[category.id] || FileText;
          const color = categoryColors[category.id] || "bg-gray-500";
          
          return (
          <Card 
            key={category.id} 
            className={`shadow-md hover:shadow-lg transition-all border-border relative overflow-hidden ${
                !category.enabled ? 'opacity-60' : ''
            }`}
          >
            <CardHeader className="pb-3 pt-5 px-5">
              <div className="flex items-start justify-between mb-3">
                  <div className={`p-3 ${color} rounded-xl shadow-sm`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
                  <div className="flex items-center gap-2">
                    {category.isCustom && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCustom(category.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                <Switch
                      checked={category.enabled}
                  onCheckedChange={(checked) => handleToggle(category.id, checked)}
                />
              </div>
                </div>
                <CardTitle className="text-base font-semibold mb-1 flex items-center gap-2">
                {category.name}
                  {category.isCustom && (
                    <Badge variant="secondary" className="text-xs">Custom</Badge>
                  )}
              </CardTitle>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {category.description}
              </p>
            </CardHeader>
          </Card>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No categories found. Add a custom category to get started.</p>
        </div>
      )}

      {/* Add Custom Category Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Add Custom Category</DialogTitle>
            <DialogDescription className="text-sm">
              Create a new category to organize your emails with AI assistance
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Category Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., Urgent Clients"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description for AI
              </Label>
              <Textarea
                id="description"
                placeholder="Describe what emails should be categorized here. e.g., Emails from VIP clients that require immediate attention..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="text-sm resize-none"
              />
              <p className="text-xs text-muted-foreground">
                This helps AI understand which emails belong in this category
              </p>
            </div>

            {emailAccounts.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Apply to Email Accounts</Label>
              <Card className="shadow-card border-border">
                <CardContent className="px-4 py-3 space-y-2">
                  {emailAccounts.map((account) => (
                    <div key={account.id} className="flex items-center space-x-3 py-2">
                      <Checkbox
                        id={account.id}
                        checked={formData.selectedAccounts.includes(account.id)}
                        onCheckedChange={() => handleAccountToggle(account.id)}
                      />
                      <label
                        htmlFor={account.id}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="text-sm font-medium">{account.name}</div>
                        <div className="text-xs text-muted-foreground">{account.email}</div>
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!formData.name || !formData.description || (emailAccounts.length > 0 && formData.selectedAccounts.length === 0) || isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categorization;
