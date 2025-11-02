import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Eye, EyeOff, Sparkles, Star } from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Signup = () => {
  const navigate = useNavigate();
  const { setFullName, setEmail: setOnboardingEmail } = useOnboarding();
  const { toast } = useToast();
  
  const [fullName, setFullNameLocal] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getPasswordStrength = (pwd: string) => {
    if (pwd.length < 8) return { strength: 'weak', color: 'text-danger' };
    if (pwd.length < 12) return { strength: 'medium', color: 'text-warning' };
    return { strength: 'strong', color: 'text-success' };
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!password || password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Store in context
    setFullName(fullName);
    setOnboardingEmail(email);
    
    toast({
      title: "Account created!",
      description: "Let's connect your email accounts",
    });
    
    navigate('/onboarding/email-connection');
  };

  const handleOAuthSignup = (provider: string) => {
    toast({
      title: `${provider} sign up`,
      description: "OAuth integration coming soon",
    });
  };

  const passwordStrength = password ? getPasswordStrength(password) : null;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-dark to-[hsl(250,80%,55%)] p-12 flex-col justify-between text-primary-foreground relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-16 animate-float">
          <Sparkles className="h-8 w-8 opacity-80" />
        </div>
        <div className="absolute top-32 left-24 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-2 h-2 bg-primary-foreground rounded-full opacity-60" />
        </div>
        <div className="absolute bottom-1/3 right-20 animate-float" style={{ animationDelay: '0.5s' }}>
          <Sparkles className="h-6 w-6 opacity-70" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Start turning your ideas into reality.
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-md">
            Create a free account and get full access to all features for 30-days. No credit card needed. Trusted by over 4,000 professionals.
          </p>
        </div>

        {/* Social Proof */}
        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <Avatar className="border-2 border-primary w-10 h-10">
                <AvatarFallback className="bg-teal text-teal-foreground text-sm">JD</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-primary w-10 h-10">
                <AvatarFallback className="bg-info text-info-foreground text-sm">SM</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-primary w-10 h-10">
                <AvatarFallback className="bg-warning text-warning-foreground text-sm">AL</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-primary w-10 h-10">
                <AvatarFallback className="bg-success text-success-foreground text-sm">KW</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary-foreground text-primary-foreground" />
                ))}
              </div>
              <p className="text-sm text-primary-foreground/80">5.0 from 200+ reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8 border-border shadow-card">
          <div className="flex justify-center mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-2">Sign up</h1>
          <p className="text-sm text-muted-foreground text-center mb-8">Start your 30-day free trial.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <Label htmlFor="fullName" className="text-sm font-medium">Name*</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your name"
                value={fullName}
                onChange={(e) => setFullNameLocal(e.target.value)}
                className={`mt-1.5 ${errors.fullName ? "border-danger" : ""}`}
              />
              {errors.fullName && (
                <p className="text-xs text-danger mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email*</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1.5 ${errors.email ? "border-danger" : ""}`}
              />
              {errors.email && (
                <p className="text-xs text-danger mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium">Password*</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${errors.password ? "border-danger pr-10" : "pr-10"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-danger mt-1">{errors.password}</p>
              )}
              {password && !errors.password && (
                <p className="text-xs text-muted-foreground mt-1">Must be at least 8 characters.</p>
              )}
            </div>

            <Button type="submit" className="w-full h-11 text-base bg-primary hover:bg-primary-dark">
              Create account
            </Button>
          </form>

          <Button 
            variant="outline" 
            className="w-full h-11 text-base"
            onClick={() => handleOAuthSignup("Google")}
            type="button"
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </Button>

          <div className="mt-4 space-y-3">
            <Button 
              variant="outline" 
              className="w-full h-11 text-base"
              onClick={() => handleOAuthSignup("Microsoft")}
              type="button"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path fill="#F25022" d="M1 1h10v10H1z"/>
                <path fill="#00A4EF" d="M13 1h10v10H13z"/>
                <path fill="#7FBA00" d="M1 13h10v10H1z"/>
                <path fill="#FFB900" d="M13 13h10v10H13z"/>
              </svg>
              Continue with Microsoft
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-11 text-base"
              onClick={() => handleOAuthSignup("Zoho")}
              type="button"
            >
              <Mail className="mr-2 h-5 w-5" />
              Continue with Zoho
            </Button>
          </div>
          
          <p className="text-center mt-6 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Log in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
