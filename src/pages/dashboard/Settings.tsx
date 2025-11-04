import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, CreditCard } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Card with User Info */}
      <Card className="shadow-card border-border overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-32 relative">
          <div className="absolute -bottom-12 left-8">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
                KW
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="pt-16 pb-6 px-8">
          <h2 className="text-xl font-semibold">Kristin Watson</h2>
          <p className="text-sm text-muted-foreground">kristin.watson@company.com</p>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-4 md:gap-6 border-b border-border overflow-x-auto">
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === "profile"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Profile
          {activeTab === "profile" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("preferences")}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === "preferences"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Preferences
          {activeTab === "preferences" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("billing")}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === "billing"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Billing
          {activeTab === "billing" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-4 md:space-y-6">
          <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-medium">User Information</CardTitle>
              <CardDescription className="text-xs">
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm">User Name</Label>
                <Input id="username" defaultValue="@kristinw" className="text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullname" className="text-sm">Full name</Label>
                <Input id="fullname" defaultValue="Kristin Watson" className="text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email address</Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    defaultValue="kristin.watson@company.com"
                    className="text-sm flex-1"
                    disabled
                  />
                  <Button variant="outline" size="sm" className="text-xs">
                    Change email
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">Phone number</Label>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue="+1 9825892754"
                    className="text-sm flex-1"
                  />
                  <Button variant="outline" size="sm" className="text-xs">
                    Change phone number
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-medium">Profile Image</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl">
                    KW
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <Button size="sm" className="text-xs">
                    <Upload className="h-3.5 w-3.5 mr-1.5" />
                    Upload Image
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Remove Image
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-medium">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-sm font-medium">Member Since</span>
                <span className="text-sm text-muted-foreground">January 15, 2025</span>
              </div>
              <div className="pt-2">
                <Button variant="destructive" className="w-full text-sm" size="sm">
                  Delete Account
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  This action cannot be undone
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === "preferences" && (
        <div className="space-y-4 md:space-y-6">
          <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-medium">General Settings</CardTitle>
              <CardDescription className="text-xs">Configure your application preferences</CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Language</label>
                  <p className="text-xs text-muted-foreground">Select your preferred language</p>
                </div>
                <Select defaultValue="english">
                  <SelectTrigger className="w-[180px] text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="arabic" disabled>
                      <div className="flex items-center gap-2">
                        Arabic <Badge variant="secondary" className="ml-2 text-xs">Coming Soon</Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Timezone</label>
                  <p className="text-xs text-muted-foreground">Set your local timezone</p>
                </div>
                <Select defaultValue="utc">
                  <SelectTrigger className="w-[180px] text-sm">
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

              <div className="flex items-center justify-between py-3">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Date Format</label>
                  <p className="text-xs text-muted-foreground">Choose how dates are displayed</p>
                </div>
                <Select defaultValue="mdy">
                  <SelectTrigger className="w-[180px] text-sm">
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

          <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-medium">Notification Preferences</CardTitle>
              <CardDescription className="text-xs">Control how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Email Notifications</label>
                  <p className="text-xs text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Desktop Notifications</label>
                  <p className="text-xs text-muted-foreground">Show browser notifications</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Daily Digest</label>
                  <p className="text-xs text-muted-foreground">Daily summary of your email activity</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-medium">AI Behavior</CardTitle>
              <CardDescription className="text-xs">Customize how AI processes your emails</CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Auto-categorize New Emails</label>
                  <p className="text-xs text-muted-foreground">Automatically sort incoming emails</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Auto-generate Drafts</label>
                  <p className="text-xs text-muted-foreground">Create draft replies automatically</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Response Tone</label>
                  <p className="text-xs text-muted-foreground">Set the default tone for AI drafts</p>
                </div>
                <Select defaultValue="professional">
                  <SelectTrigger className="w-[180px] text-sm">
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
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === "billing" && (
        <div className="space-y-4 md:space-y-6">
          <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
              <CardDescription className="text-xs">Manage your subscription</CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <h3 className="text-sm font-semibold mb-1">Pro Plan</h3>
                  <p className="text-xs text-muted-foreground">$29.99 / month</p>
                </div>
                <Badge className="bg-success text-success-foreground text-xs">Active</Badge>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs py-2">
                  <span className="text-muted-foreground">Next billing date</span>
                  <span className="font-medium">December 15, 2025</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2">
                  <span className="text-muted-foreground">Payment method</span>
                  <span className="font-medium">•••• •••• •••• 4242</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  Change Plan
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-medium">Payment Method</CardTitle>
              <CardDescription className="text-xs">Manage your payment information</CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg mb-4">
                <div className="p-2 bg-background rounded">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Visa ending in 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/2027</p>
                </div>
                <Badge variant="secondary" className="text-xs">Default</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs">
                Update Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-medium">Billing History</CardTitle>
              <CardDescription className="text-xs">View your past invoices</CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="space-y-2">
                {[
                  { date: "Nov 15, 2025", amount: "$29.99", status: "Paid" },
                  { date: "Oct 15, 2025", amount: "$29.99", status: "Paid" },
                  { date: "Sep 15, 2025", amount: "$29.99", status: "Paid" },
                ].map((invoice, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 hover:bg-muted/30 rounded-lg transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium">{invoice.date}</p>
                      <p className="text-xs text-muted-foreground">{invoice.status}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold">{invoice.amount}</span>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Settings;