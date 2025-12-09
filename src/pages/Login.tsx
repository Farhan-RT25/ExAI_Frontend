import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { login, saveAuthData } from "@/lib/api/auth";
import { initiateGoogleLogin } from "@/lib/api/google";
import { initiateMicrosoftLogin } from "@/lib/api/microsoft";
import { initiateZohoLogin } from "@/lib/api/zoho";
import googleLogo from "@/assets/google-logo.png";
import microsoftLogo from "@/assets/microsoft-logo.png";
import zohoLogo from "@/assets/zoho-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // const validateForm = () => {
  //   const newErrors: Record<string, string> = {};

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!email || !emailRegex.test(email)) {
  //     newErrors.email = "Please enter a valid email address";
  //   }

  //   if (!password || password.length < 6) {
  //     newErrors.password = "Password must be at least 6 characters";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   setIsLoading(true);

  //   try {
  //     const authResponse = await login({ email, password });
  //     saveAuthData(authResponse);

  //     toast({
  //       title: "Welcome back!",
  //       description: `Hello, ${authResponse.user.full_name || "User"}`,
  //     });

  //     navigate("/dashboard");
  //   } catch (error) {
  //     toast({
  //       title: "Login failed",
  //       description:
  //         error instanceof Error ? error.message : "Invalid credentials",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Purple Northern Lights Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-gradient-to-b from-purple-500/15 via-violet-600/8 to-transparent blur-[100px] rounded-full aurora-glow" />
        <div className="absolute top-10 right-1/4 w-[500px] h-[400px] bg-gradient-to-b from-primary/20 via-purple-400/10 to-transparent blur-[120px] rounded-full aurora-shift" />
        <div className="absolute bottom-20 left-1/3 w-[400px] h-[300px] bg-purple-600/10 blur-[150px] rounded-full aurora-shift" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Card */}
      <Card className="relative w-full max-w-5xl mx-auto bg-card/80 backdrop-blur-2xl border border-border/50 shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-5 min-h-[600px]">
          {/* Left: Branding & Hero (40%) */}
          <div className="hidden lg:flex lg:col-span-2 relative bg-card p-12 flex-col justify-between overflow-hidden border-r border-border/30">
            {/* Subtle aurora inside card */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-12 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to website
              </Link>

              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-primary/30">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">NyxAI</h1>
              </div>

              <h2 className="text-4xl font-bold leading-tight mb-6 text-foreground">
                Intelligent Email,
                <br />
                <span className="text-primary">Reimagined</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
                Let AI organize, prioritize, and respond — so you can focus on
                what truly matters.
              </p>
            </div>

            <div className="relative z-10 space-y-4">
              {[
                "AI-Powered Sorting",
                "End-to-End Encryption",
                "Instant Sync",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-muted-foreground text-sm leading-snug">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Login Form (60%) */}
          <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            {/* Mobile Header */}
            <div className="lg:hidden mb-5 flex justify-between items-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-0 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <span className="text-2xl font-bold text-foreground">NyxAI</span>
              </div>
            </div>

            <div className="max-w-md mx-auto w-full space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Sign in</h2>
                <p className="text-muted-foreground">
                  New here?{" "}
                  <Link
                    to="/signup"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Create an account
                  </Link>
                </p>
              </div>

              {/* Email/Password form commented out */}
              {/* <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 h-12 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/30"
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label
                      htmlFor="password"
                      className="text-foreground font-medium"
                    >
                      Password
                    </Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pr-12 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/30"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-destructive">
                      {errors.password}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div> */}

              <p className="text-center text-muted-foreground text-sm mb-6">
                Sign in with your email provider
              </p>

              {/* OAuth Buttons - Single Column with White Background */}
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="h-14 bg-white hover:bg-gray-50 border-border text-gray-800 font-medium text-base justify-start px-6"
                  onClick={() => handleOAuthLogin("Google")}
                  disabled={isLoading}
                >
                  <img src={googleLogo} alt="Google" className="h-6 w-6 mr-4" />
                  Continue with Google
                </Button>

                <Button
                  variant="outline"
                  className="h-14 bg-white hover:bg-gray-50 border-border text-gray-800 font-medium text-base justify-start px-6"
                  onClick={() => handleOAuthLogin("Microsoft")}
                  disabled={isLoading}
                >
                  <img src={microsoftLogo} alt="Microsoft" className="h-6 w-6 mr-4" />
                  Continue with Microsoft
                </Button>

                <Button
                  variant="outline"
                  className="h-14 bg-white hover:bg-gray-50 border-border text-gray-800 font-medium text-base justify-start px-6"
                  onClick={() => handleOAuthLogin("Zoho")}
                  disabled={isLoading}
                >
                  <img src={zohoLogo} alt="Zoho" className="h-6 w-6 mr-4" />
                  Continue with Zoho
                </Button>
              </div>

              <p className="text-center text-xs text-muted-foreground mt-8">
                <Shield className="inline-block h-3 w-3 mr-1" />
                Your data is encrypted end-to-end. We never read your emails.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;