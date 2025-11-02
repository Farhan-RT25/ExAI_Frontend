import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Settings = () => {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and AI behavior
        </p>
      </div>

      {/* General Settings */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure your application preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="font-medium">Language</label>
              <p className="text-sm text-muted-foreground">Select your preferred language</p>
            </div>
            <Select defaultValue="english">
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="arabic" disabled>
                  <div className="flex items-center gap-2">
                    Arabic <Badge variant="secondary" className="ml-2">Coming Soon</Badge>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="font-medium">Timezone</label>
              <p className="text-sm text-muted-foreground">Set your local timezone</p>
            </div>
            <Select defaultValue="utc">
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="est">EST (UTC-5)</SelectItem>
                <SelectItem value="pst">PST (UTC-8)</SelectItem>
                <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="font-medium">Date Format</label>
              <p className="text-sm text-muted-foreground">Choose how dates are displayed</p>
            </div>
            <Select defaultValue="mdy">
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Control how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="font-medium">Email Notifications</label>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="font-medium">Desktop Notifications</label>
              <p className="text-sm text-muted-foreground">Show browser notifications</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="font-medium">Daily Digest</label>
              <p className="text-sm text-muted-foreground">Daily summary of your email activity</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* AI Behavior */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>AI Behavior</CardTitle>
          <CardDescription>Customize how AI processes your emails</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="font-medium">Auto-categorize New Emails</label>
              <p className="text-sm text-muted-foreground">Automatically sort incoming emails</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="font-medium">Auto-generate Drafts</label>
              <p className="text-sm text-muted-foreground">Create draft replies automatically</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="font-medium">Response Tone</label>
              <p className="text-sm text-muted-foreground">Set the default tone for AI drafts</p>
            </div>
            <Select defaultValue="professional">
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="direct">Direct</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Account */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>View and manage your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between py-2">
            <span className="font-medium">Email Address</span>
            <span className="text-muted-foreground">john.doe@example.com</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="font-medium">Member Since</span>
            <span className="text-muted-foreground">January 15, 2025</span>
          </div>

          <div className="pt-4 border-t">
            <Button variant="destructive" className="w-full">
              Delete Account
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              This action cannot be undone
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
