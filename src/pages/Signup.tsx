import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Eye, EyeOff, ArrowLeft, Sparkles, Shield } from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useToast } from "@/hooks/use-toast";
import { signup, saveAuthData } from "@/lib/api/auth";
import { initiateGoogleSignup } from "@/lib/api/google";
import { initiateMicrosoftSignup } from "@/lib/api/microsoft";
import { initiateZohoSignup } from "@/lib/api/zoho";

const Signup = () => {
  const navigate = useNavigate();
  const { setFullName, setEmail: setOnboardingEmail } = useOnboarding();
  const { toast } = useToast();

  const [fullName, setFullNameLocal] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const authResponse = await signup({
        email,
        full_name: fullName,
        password,
      });

      saveAuthData(authResponse);
      setFullName(fullName);
      setOnboardingEmail(email);

      toast({
        title: "Account created successfully!",
        description: "Let's connect your email accounts",
      });

      navigate("/onboarding/email-connection");
    } catch (error) {
      toast({
        title: "Signup failed",
        description:
          error instanceof Error ? error.message : "Could not create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 flex items-center justify-center p-4">
      {/* Same subtle animated background as Login */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-cyan-900/20" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* EXACT same card dimensions & grid as Login */}
      <Card className="relative w-full max-w-5xl mx-auto bg-gray-900/70 backdrop-blur-2xl border border-gray-800/60 shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-5 min-h-[680px] ">
          {/* Left Hero – identical to Login */}
          <div className="hidden lg:flex lg:col-span-2 relative bg-gradient-to-br from-blue-700 via-purple-700 to-violet-800 p-12 flex-col justify-between text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />

            <div className="relative z-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-12 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to website
              </Link>

              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">NyxAI</h1>
              </div>

              <h2 className="text-4xl font-bold leading-tight mb-6">
                Welcome to the Future{" "}
                <span className="text-cyan-300">of Email</span>
              </h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-sm">
                Join professionals who’ve reclaimed their inbox with AI-powered
                automation, smart replies, and zero clutter.
              </p>
            </div>

            {/* Professional bullet points with icons */}
            <div className="relative z-10 space-y-5">
              {[
                "AI that writes and responds like you",
                "Auto-categorization & smart priority inbox",
                "End-to-end encryption — your data stays private",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3"
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
                  <span className="text-white/90 text-base text-sm leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form – identical padding, spacing, and structure as Login */}
          <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            {/* Mobile Header – identical to Login */}
            <div className="lg:hidden mb-8 flex justify-between items-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">NyxAI</span>
              </div>
            </div>

            <div className="max-w-md mx-auto w-full space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Create your account
                </h2>
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Form – identical input/button styles */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <Label
                    htmlFor="fullName"
                    className="text-gray-200 font-medium"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullNameLocal(e.target.value)}
                    className="mt-2 h-12 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/30"
                    disabled={isLoading}
                  />
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-gray-200 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 h-12 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/30"
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <Label
                    htmlFor="password"
                    className="text-gray-200 font-medium"
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
                      className="h-12 pr-12 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/30"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password ? (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.password}
                    </p>
                  ) : (
                    password && (
                      <p className="mt-2 text-xs text-gray-500">
                        Minimum 8 characters required
                      </p>
                    )
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-purple-500/25"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900/70 text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div>

              {/* OAuth – identical 1→3 column grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  className="h-12 bg-gray-800/40 border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-white"
                  onClick={() => handleOAuthSignup("Google")}
                  disabled={isLoading}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="h-12 bg-gray-800/40 border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-white"
                  onClick={() => handleOAuthSignup("Microsoft")}
                  disabled={isLoading}
                >
                  <svg className="h-5 w-5" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z" />
                    <path fill="#81bc06" d="M12 1h10v10H12z" />
                    <path fill="#05a6f0" d="M1 12h10v10H1z" />
                    <path fill="#ffba08" d="M12 12h10v10H12z" />
                  </svg>
                  Microsoft
                </Button>
                <Button
                  variant="outline"
                  className="h-12 bg-gray-800/40 border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-white"
                  onClick={() => handleOAuthSignup("Zoho")}
                  disabled={isLoading}
                >
                  <Mail className="h-5 w-5" />
                  Zoho
                </Button>
              </div>

              {/* Security note – identical */}
              <p className="text-center text-xs text-gray-500 mt-8">
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
