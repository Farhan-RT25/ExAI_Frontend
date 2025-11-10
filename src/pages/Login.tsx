import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Eye, EyeOff, Sparkles, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { login, saveAuthData } from "@/lib/api/auth";
import { initiateGoogleLogin } from "@/lib/api/google";
import { initiateMicrosoftLogin } from "@/lib/api/microsoft";
import { initiateZohoLogin } from "@/lib/api/zoho";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const authResponse = await login({ email, password });
      
      // Save auth data to localStorage
      saveAuthData(authResponse);
      
      toast({
        title: "Logged in successfully!",
        description: `Welcome back, ${authResponse.user.full_name}`,
      });
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    switch (provider) {
      case "Google":
        initiateGoogleLogin();
        break;
      case "Microsoft":
        initiateMicrosoftLogin();
        break;
      case "Zoho":
        initiateZohoLogin();
        break;
      default:
        toast({
          title: `${provider} login`,
          description: "Provider not configured",
        });
    }
  };

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
        <Card className="w-full max-w-md p-8 border-0 bg-background shadow-card">
          <div className="flex justify-center mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-2">Log in</h1>
          <p className="text-sm text-muted-foreground text-center mb-8">Welcome back! Please enter your details.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email*</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1.5 ${errors.email ? "border-danger" : ""}`}
                disabled={isLoading}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${errors.password ? "border-danger pr-10" : "pr-10"}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-danger mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex justify-end">
              <Link to="#" className="text-sm text-primary hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 text-base bg-primary hover:bg-primary-dark"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <Button 
            variant="outline" 
            className="oauth-slide-btn w-full"
            onClick={() => handleOAuthLogin("Google")}
            type="button"
            disabled={isLoading}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </Button>

          <div className="mt-4 space-y-3">
            <Button 
              variant="outline" 
              className="oauth-slide-btn w-full"
              onClick={() => handleOAuthLogin("Microsoft")}
              type="button"
              disabled={isLoading}
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
              className="oauth-slide-btn w-full"
              onClick={() => handleOAuthLogin("Zoho")}
              type="button"
              disabled={isLoading}
            >
              <Mail className="mr-2 h-5 w-5" />
              Continue with Zoho
            </Button>
          </div>
          
          <p className="text-center mt-6 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;