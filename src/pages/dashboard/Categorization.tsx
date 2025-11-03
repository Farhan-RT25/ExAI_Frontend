import { useState } from "react";
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
import { Plus, Mail, Clock, Bell, Megaphone, DollarSign, FileText, Users, Calendar, HelpCircle } from "lucide-react";

const emailAccounts = [
  { id: "work", name: "Work", email: "kristin.watson@company.com" },
  { id: "personal", name: "Personal", email: "kristin.w@gmail.com" },
  { id: "business", name: "Business", email: "kw@mybusiness.com" },
];

const initialCategories = [
  { id: 1, name: "To Respond", icon: Mail, count: 145, color: "bg-info", active: true },
  { id: 2, name: "Waiting Reply", icon: Clock, count: 89, color: "bg-warning", active: true },
  { id: 3, name: "Notifications", icon: Bell, count: 267, color: "bg-primary", active: true },
  { id: 4, name: "Marketing", icon: Megaphone, count: 412, color: "bg-success", active: true },
  { id: 5, name: "Sales", icon: DollarSign, count: 178, color: "bg-danger", active: true },
  { id: 6, name: "Admin", icon: FileText, count: 234, color: "bg-accent", active: true },
  { id: 7, name: "HR", icon: Users, count: 56, color: "bg-secondary", active: false },
  { id: 8, name: "Meeting/Event", icon: Calendar, count: 98, color: "bg-primary", active: true },
];

const Categorization = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [categories, setCategories] = useState(initialCategories);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    selectedAccounts: [],
  });

  const handleToggle = (categoryId, checked) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, active: checked } : cat
    ));
  };

  const getFilteredCategories = () => {
    if (activeTab === "all") return categories;
    if (activeTab === "active") return categories.filter(c => c.active);
    if (activeTab === "inactive") return categories.filter(c => !c.active);
    return categories;
  };

  const handleAccountToggle = (accountId) => {
    setFormData(prev => ({
      ...prev,
      selectedAccounts: prev.selectedAccounts.includes(accountId)
        ? prev.selectedAccounts.filter(id => id !== accountId)
        : [...prev.selectedAccounts, accountId]
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("New category:", formData);
      setDialogOpen(false);
      setIsSubmitting(false);
      setFormData({ name: "", description: "", selectedAccounts: [] });
    }, 1000);
  };

  const filteredCategories = getFilteredCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1.5">Manage Categories</h1>
          <p className="text-sm text-muted-foreground">
            Select which categories to use for organizing your emails
          </p>
        </div>

        <div className="flex items-center gap-3">
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
            className="group"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            Add Custom Category
          </Button>
        </div>
      </div>

      <div className="grid gap-5">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="shadow-card hover:shadow-card-hover transition-all border-border">
            <CardHeader className="pb-3 pt-5 px-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-2.5 ${category.color} rounded-lg`}>
                    <category.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-sm font-semibold mb-1">
                      {category.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {category.count} emails in this category
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {category.count}
                  </Badge>
                </div>
                <Switch
                  checked={category.active}
                  onCheckedChange={(checked) => handleToggle(category.id, checked)}
                />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

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
              disabled={!formData.name || !formData.description || formData.selectedAccounts.length === 0 || isSubmitting}
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