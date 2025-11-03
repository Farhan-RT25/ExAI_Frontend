import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HelpCircle, Bell, Settings } from "lucide-react";

const emailAccounts = [
  { 
    id: "work", 
    name: "Work", 
    email: "kristin.watson@company.com", 
    color: "bg-blue-500",
    draftsEnabled: true,
    customPrompt: ""
  },
  { 
    id: "personal", 
    name: "Personal", 
    email: "kristin.w@gmail.com", 
    color: "bg-purple-500",
    draftsEnabled: true,
    customPrompt: ""
  },
  { 
    id: "business", 
    name: "Business", 
    email: "kw@mybusiness.com", 
    color: "bg-green-500",
    draftsEnabled: false,
    customPrompt: ""
  },
];

const categories = [
  { id: "to-respond", name: "To Respond", enabled: true },
  { id: "sales", name: "Sales", enabled: true },
  { id: "admin", name: "Admin", enabled: false },
  { id: "marketing", name: "Marketing", enabled: false },
  { id: "hr", name: "HR", enabled: true },
];

const Drafts = () => {
  const [globalEnabled, setGlobalEnabled] = useState(true);
  const [notifyOnDrafts, setNotifyOnDrafts] = useState(true);
  const [accounts, setAccounts] = useState(emailAccounts);
  const [selectedCategories, setSelectedCategories] = useState(categories);
  const [globalPrompt, setGlobalPrompt] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accountPrompt, setAccountPrompt] = useState("");

  const handleAccountToggle = (accountId, checked) => {
    setAccounts(prev => prev.map(acc => 
      acc.id === accountId ? { ...acc, draftsEnabled: checked } : acc
    ));
  };

  const handleCategoryToggle = (categoryId, checked) => {
    setSelectedCategories(prev => prev.map(cat =>
      cat.id === categoryId ? { ...cat, enabled: checked } : cat
    ));
  };

  const openAccountSettings = (account) => {
    setSelectedAccount(account);
    setAccountPrompt(account.customPrompt);
    setDialogOpen(true);
  };

  const saveAccountSettings = () => {
    setAccounts(prev => prev.map(acc =>
      acc.id === selectedAccount.id ? { ...acc, customPrompt: accountPrompt } : acc
    ));
    setDialogOpen(false);
    setSelectedAccount(null);
    setAccountPrompt("");
  };

  const characterCount = globalPrompt.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1.5">Draft Reply Settings</h1>
        <p className="text-sm text-muted-foreground">
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
            <div className="space-y-2">
              {selectedCategories.map((category) => (
                <div key={category.id} className="flex items-center space-x-3 py-2">
                  <Checkbox
                    id={category.id}
                    checked={category.enabled}
                    onCheckedChange={(checked) => handleCategoryToggle(category.id, checked)}
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
          </div>
        </CardContent>
      </Card>

      {/* Account-Specific Settings */}
      <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
        <CardHeader className="pb-3 pt-5 px-5">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            Account-Specific Settings
            <HelpCircle className="h-3.5 w-3.5" />
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <p className="text-xs text-muted-foreground mb-4">
            Customize draft behavior for each email account. Account-specific prompts override the global prompt.
          </p>
          <div className="space-y-3">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors border border-border"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-2 h-2 rounded-full ${account.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{account.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{account.email}</p>
                  </div>
                  {account.customPrompt && (
                    <Badge variant="secondary" className="text-xs">
                      Custom
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openAccountSettings(account)}
                    className="text-xs h-8"
                  >
                    <Settings className="h-3.5 w-3.5 mr-1.5" />
                    Configure
                  </Button>
                  <Switch
                    checked={account.draftsEnabled}
                    onCheckedChange={(checked) => handleAccountToggle(account.id, checked)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Global Draft Prompt */}
      <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
        <CardHeader className="pb-3 pt-5 px-5">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            Global Draft Prompt
            <HelpCircle className="h-3.5 w-3.5" />
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <p className="text-xs text-muted-foreground mb-3">
            Provide instructions to guide AI in generating draft replies. Include your communication style, priorities, or business context. (max 1000 characters)
          </p>
          <Textarea
            placeholder="Example instructions:

• Keep responses concise and professional
• Use bullet points for clarity when listing items
• Always acknowledge requests before providing solutions
• Maintain a friendly but direct tone
• Include relevant context from previous conversations"
            className="min-h-[180px] text-sm resize-none"
            maxLength={1000}
            value={globalPrompt}
            onChange={(e) => setGlobalPrompt(e.target.value)}
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">
              Character count: {characterCount} / 1000
            </p>
            <Button size="sm" variant="outline" className="text-xs">
              Save Prompt
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account-Specific Prompt Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Configure {selectedAccount?.name}
            </DialogTitle>
            <DialogDescription className="text-sm">
              {selectedAccount?.email}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Account-Specific Prompt</p>
              <p className="text-xs text-muted-foreground mb-3">
                These instructions will override the global prompt for this account only. Leave empty to use the global prompt.
              </p>
              <Textarea
                placeholder="Example for work account:

• Always include project references
• CC relevant team members when appropriate
• Use formal language and company terminology
• Include action items at the end of emails"
                className="min-h-[200px] text-sm resize-none"
                maxLength={1000}
                value={accountPrompt}
                onChange={(e) => setAccountPrompt(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Character count: {accountPrompt.length} / 1000
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDialogOpen(false);
                setSelectedAccount(null);
                setAccountPrompt("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={saveAccountSettings}>
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Drafts;