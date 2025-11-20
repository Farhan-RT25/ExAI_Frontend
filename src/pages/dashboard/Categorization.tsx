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
import { Plus, Mail, Clock, Bell, Megaphone, DollarSign, FileText, Users, Calendar } from "lucide-react";

const emailAccounts = [
  { id: "work", name: "Work", email: "kristin.watson@company.com" },
  { id: "personal", name: "Personal", email: "kristin.w@gmail.com" },
  { id: "business", name: "Business", email: "kw@mybusiness.com" },
];

const initialCategories = [
  { 
    id: 1, 
    name: "To Respond", 
    icon: Mail, 
    color: "bg-blue-500", 
    active: true,
    description: "Emails requiring your immediate response"
  },
  { 
    id: 2, 
    name: "Waiting Reply", 
    icon: Clock, 
    color: "bg-amber-500", 
    active: true,
    description: "Awaiting responses from recipients"
  },
  { 
    id: 3, 
    name: "Notifications", 
    icon: Bell,  
    color: "bg-purple-500", 
    active: true,
    description: "System and service notifications"
  },
  { 
    id: 4, 
    name: "Marketing", 
    icon: Megaphone,  
    color: "bg-green-500", 
    active: true,
    description: "Promotional and marketing content"
  },
  { 
    id: 5, 
    name: "Sales", 
    icon: DollarSign,  
    color: "bg-emerald-500", 
    active: true,
    description: "Sales inquiries and opportunities"
  },
  { 
    id: 6, 
    name: "Admin", 
    icon: FileText,  
    color: "bg-slate-500", 
    active: true,
    description: "Administrative and internal matters"
  },
  { 
    id: 7, 
    name: "HR", 
    icon: Users,  
    color: "bg-pink-500", 
    active: false,
    description: "Human resources and personnel"
  },
  { 
    id: 8, 
    name: "Meeting/Event", 
    icon: Calendar,  
    color: "bg-indigo-500", 
    active: true,
    description: "Calendar invites and event details"
  },
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
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <p className="text-md text-muted-foreground">
            Select which categories to use for organizing your emails
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
        </div>
      </div>

      {/* Grid Layout for Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredCategories.map((category) => (
          <Card 
            key={category.id} 
            className={`shadow-md hover:shadow-lg transition-all border-border relative overflow-hidden ${
              !category.active ? 'opacity-60' : ''
            }`}
          >
            <CardHeader className="pb-3 pt-5 px-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 ${category.color} rounded-xl shadow-sm`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <Switch
                  checked={category.active}
                  onCheckedChange={(checked) => handleToggle(category.id, checked)}
                />
              </div>
              <CardTitle className="text-base font-semibold mb-1">
                {category.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {category.description}
              </p>
            </CardHeader>
            {/* <CardContent className="px-5 pb-5">
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground font-medium">Total Emails</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{category.count}</span>
                </div>
              </div>
            </CardContent> */}
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