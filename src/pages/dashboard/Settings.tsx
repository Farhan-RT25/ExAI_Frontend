import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, CreditCard, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  getUserProfile,
  updateProfile,
  changePassword,
  type ProfileUpdateRequest,
  type PasswordChangeRequest,
} from "@/lib/api/settings";
import { getUser, saveAuthData } from "@/lib/api/auth";
import type { User } from "@/lib/api/auth";
import ProfilePattern from "@/components/ProfilePattern";

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Profile form state
  const [fullName, setFullName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  // Password change form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const userData = await getUserProfile();
      setUser(userData);
      setFullName(userData.full_name || "");
      setProfileImageUrl(userData.profile_image_url || "");
    } catch (error) {
      console.error("Failed to load profile:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to load profile",
        variant: "destructive",
      });
      // Fallback to stored user data
      const storedUser = getUser();
      if (storedUser) {
        setUser(storedUser);
        setFullName(storedUser.full_name || "");
        setProfileImageUrl(storedUser.profile_image_url || "");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      const updateData: ProfileUpdateRequest = {};
      if (fullName !== user?.full_name) {
        updateData.full_name = fullName;
      }
      if (profileImageUrl !== user?.profile_image_url) {
        updateData.profile_image_url = profileImageUrl;
      }

      if (Object.keys(updateData).length === 0) {
        toast({
          title: "No changes",
          description: "No changes to save",
        });
        return;
      }

      const updatedUser = await updateProfile(updateData);
      setUser(updatedUser);

      // Update stored user data
      const token = localStorage.getItem("access_token");
      if (token) {
        saveAuthData({
          access_token: token,
          token_type: "bearer",
          user: updatedUser,
        });
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      const passwordData: PasswordChangeRequest = {
        current_password: currentPassword,
        new_password: newPassword,
      };

      await changePassword(passwordData);

      toast({
        title: "Success",
        description: "Password changed successfully",
      });

      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Failed to change password:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to change password",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name?: string | null, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return "U";
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load user profile</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Card with User Info */}
      <Card className="shadow-card border-border overflow-hidden">
          <ProfilePattern />
          <div className="absolute -bottom-12 left-8">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={user.profile_image_url || ""} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
                {getInitials(user.full_name, user.email)}
              </AvatarFallback>
            </Avatar>
          </div>
        <div className="pt-16 pb-6 px-8">
          <h2 className="text-xl font-semibold">{user.full_name || "User"}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
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
              <CardTitle className="text-sm font-medium">
                User Information
              </CardTitle>
              <CardDescription className="text-xs">
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullname" className="text-sm">
                  Full name
                </Label>
                <Input
                  id="fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="text-sm"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">
                  Email address
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    className="text-sm flex-1"
                    disabled
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={handleSaveProfile} disabled={saving} size="sm">
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-medium">
                Profile Image
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={profileImageUrl || ""} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl">
                    {getInitials(user.full_name, user.email)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="text-xs"
                    onClick={async () => {
                      const url = prompt("Enter image URL:");
                      if (url && url.trim()) {
                        try {
                          setSaving(true);
                          const updatedUser = await updateProfile({
                            profile_image_url: url.trim(),
                          });
                          setProfileImageUrl(url.trim());
                          setUser(updatedUser);
                          const token = localStorage.getItem("access_token");
                          if (token) {
                            saveAuthData({
                              access_token: token,
                              token_type: "bearer",
                              user: updatedUser,
                            });
                          }
                          toast({
                            title: "Success",
                            description: "Profile image updated successfully",
                          });
                        } catch (error) {
                          toast({
                            title: "Error",
                            description:
                              error instanceof Error
                                ? error.message
                                : "Failed to update image",
                            variant: "destructive",
                          });
                        } finally {
                          setSaving(false);
                        }
                      }
                    }}
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Upload className="h-3.5 w-3.5 mr-1.5" />
                        Update
                      </>
                    )}
                  </Button>
                  {profileImageUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={async () => {
                        try {
                          setSaving(true);
                          await updateProfile({ profile_image_url: "" });
                          setProfileImageUrl("");
                          const updatedUser = await getUserProfile();
                          setUser(updatedUser);
                          const token = localStorage.getItem("access_token");
                          if (token) {
                            saveAuthData({
                              access_token: token,
                              token_type: "bearer",
                              user: updatedUser,
                            });
                          }
                          toast({
                            title: "Success",
                            description: "Profile image removed successfully",
                          });
                        } catch (error) {
                          toast({
                            title: "Error",
                            description:
                              error instanceof Error
                                ? error.message
                                : "Failed to remove image",
                            variant: "destructive",
                          });
                        } finally {
                          setSaving(false);
                        }
                      }}
                      disabled={saving}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-medium">
                Change Password
              </CardTitle>
              <CardDescription className="text-xs">
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-sm">
                  Current Password
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="text-sm"
                  placeholder="Enter current password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-sm">
                  New Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="text-sm"
                  placeholder="Enter new password (min 8 characters)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm">
                  Confirm New Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="text-sm"
                  placeholder="Confirm new password"
                />
              </div>
              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleChangePassword}
                  disabled={
                    saving ||
                    !currentPassword ||
                    !newPassword ||
                    !confirmPassword
                  }
                  size="sm"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Changing...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-medium">
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-sm font-medium">Member Since</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(user.created_at)}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-sm font-medium">Last Login</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(user.last_login)}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-sm font-medium">Account Status</span>
                <Badge
                  variant={user.status === "active" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {user.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Preferences Tab - Keep as is for now */}
      {activeTab === "preferences" && (
        <div className="space-y-4 md:space-y-6">
          <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-medium">
                General Settings
              </CardTitle>
              <CardDescription className="text-xs">
                Configure your application preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Language</label>
                  <p className="text-xs text-muted-foreground">
                    Select your preferred language
                  </p>
                </div>
                <Select defaultValue="english">
                  <SelectTrigger className="w-[180px] text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="arabic" disabled>
                      <div className="flex items-center gap-2">
                        Arabic{" "}
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Coming Soon
                        </Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Timezone</label>
                  <p className="text-xs text-muted-foreground">
                    Set your local timezone
                  </p>
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
                  <p className="text-xs text-muted-foreground">
                    Choose how dates are displayed
                  </p>
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
              <CardTitle className="text-sm font-medium">
                Notification Preferences
              </CardTitle>
              <CardDescription className="text-xs">
                Control how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    Email Notifications
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    Desktop Notifications
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Show browser notifications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Daily Digest</label>
                  <p className="text-xs text-muted-foreground">
                    Daily summary of your email activity
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-medium">AI Behavior</CardTitle>
              <CardDescription className="text-xs">
                Customize how AI processes your emails
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    Auto-categorize New Emails
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Automatically sort incoming emails
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    Auto-generate Drafts
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Create draft replies automatically
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Response Tone</label>
                  <p className="text-xs text-muted-foreground">
                    Set the default tone for AI drafts
                  </p>
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

      {/* Billing Tab - Keep as is for now */}
      {activeTab === "billing" && (
        <div className="space-y-4 md:space-y-6">
          <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-medium">
                Current Plan
              </CardTitle>
              <CardDescription className="text-xs">
                Manage your subscription
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <h3 className="text-sm font-semibold mb-1">Free Plan</h3>
                  <p className="text-xs text-muted-foreground">$0.00 / month</p>
                </div>
                <Badge className="bg-success text-success-foreground text-xs">
                  Active
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Billing features coming soon
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Settings;
