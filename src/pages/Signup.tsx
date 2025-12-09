import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Shield } from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useToast } from "@/hooks/use-toast";
import { signup, saveAuthData } from "@/lib/api/auth";
import { initiateGoogleSignup } from "@/lib/api/google";
import { initiateMicrosoftSignup } from "@/lib/api/microsoft";
import { initiateZohoSignup } from "@/lib/api/zoho";
import googleLogo from "@/assets/google-logo.png";
import microsoftLogo from "@/assets/microsoft-logo.png";
import zohoLogo from "@/assets/zoho-logo.png";

const Signup = () => {
  const navigate = useNavigate();
  const { setFullName, setEmail: setOnboardingEmail } = useOnboarding();
  const { toast } = useToast();

  // const [fullName, setFullNameLocal] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // const validateForm = () => {
  //   const newErrors: Record<string, string> = {};

  //   if (!fullName.trim() || fullName.trim().length < 2) {
  //     newErrors.fullName = "Full name must be at least 2 characters";
  //   }

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!email || !emailRegex.test(email)) {
  //     newErrors.email = "Please enter a valid email address";
  //   }

  //   if (!password || password.length < 8) {
  //     newErrors.password = "Password must be at least 8 characters";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   setIsLoading(true);

  //   try {
  //     const authResponse = await signup({
  //       email,
  //       full_name: fullName,
  //       password,
  //     });

  //     saveAuthData(authResponse);
  //     setFullName(fullName);
  //     setOnboardingEmail(email);

  //     toast({
  //       title: "Account created successfully!",
  //       description: "Let's connect your email accounts",
  //     });

  //     navigate("/onboarding/email-connection");
  //   } catch (error) {
  //     toast({
  //       title: "Signup failed",
  //       description:
  //         error instanceof Error ? error.message : "Could not create account",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleOAuthSignup = (provider: string) => {
    switch (provider) {
      case "Google":
        initiateGoogleSignup();
        break;
      case "Microsoft":
        initiateMicrosoftSignup();
        break;
      case "Zoho":
        initiateZohoSignup();
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
          {/* Left Hero */}
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
                Welcome to the Future{" "}
                <span className="text-primary">of Email</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
                Join professionals who've reclaimed their inbox with AI-powered
                automation, smart replies, and zero clutter.
              </p>
            </div>

            {/* Professional bullet points */}
            <div className="relative z-10 space-y-5">
              {[
                "AI that writes and responds like you",
                "Auto-categorization & smart priority inbox",
                "End-to-end encryption — your data stays private",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
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
                  <span className="text-muted-foreground text-sm leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            {/* Mobile Header */}
            <div className="lg:hidden mb-8 flex justify-between items-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm"
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
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Create your account
                </h2>
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Form commented out */}
              {/* <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label
                    htmlFor="fullName"
                    className="text-foreground font-medium"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullNameLocal(e.target.value)}
                    className="mt-2 h-12 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/30"
                    disabled={isLoading}
                  />
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-destructive">
                      {errors.fullName}
                    </p>
                  )}
                </div>

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
                  <Label
                    htmlFor="password"
                    className="text-foreground font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative mt-2">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
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
                  {errors.password ? (
                    <p className="mt-2 text-sm text-destructive">
                      {errors.password}
                    </p>
                  ) : (
                    password && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Minimum 8 characters required
                      </p>
                    )
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">
                    Or sign up with
                  </span>
                </div>
              </div> */}

              <p className="text-center text-muted-foreground text-sm mb-6">
                Sign up with your email provider
              </p>

              {/* OAuth Buttons - Single Column with White Background */}
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="h-14 bg-white hover:bg-gray-50 border-border text-gray-800 font-medium text-base justify-start px-6"
                  onClick={() => handleOAuthSignup("Google")}
                  disabled={isLoading}
                >
                  <img src={googleLogo} alt="Google" className="h-6 w-6 mr-4" />
                  Continue with Google
                </Button>

                <Button
                  variant="outline"
                  className="h-14 bg-white hover:bg-gray-50 border-border text-gray-800 font-medium text-base justify-start px-6"
                  onClick={() => handleOAuthSignup("Microsoft")}
                  disabled={isLoading}
                >
                  <img src={microsoftLogo} alt="Microsoft" className="h-6 w-6 mr-4" />
                  Continue with Microsoft
                </Button>

                <Button
                  variant="outline"
                  className="h-14 bg-white hover:bg-gray-50 border-border text-gray-800 font-medium text-base justify-start px-6"
                  onClick={() => handleOAuthSignup("Zoho")}
                  disabled={isLoading}
                >
                  <img src={zohoLogo} alt="Zoho" className="h-6 w-6 mr-4" />
                  Continue with Zoho
                </Button>
              </div>

              {/* Security note */}
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

export default Signup;