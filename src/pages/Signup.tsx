import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Eye, EyeOff, Shield } from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useToast } from "@/hooks/use-toast";
import { signup, saveAuthData } from "@/lib/api/auth";
import { initiateGoogleSignup } from "@/lib/api/google";
import { initiateMicrosoftSignup } from "@/lib/api/microsoft";
import { initiateZohoSignup } from "@/lib/api/zoho";
import signupImage from "@/assets/loginIMG.png";
import nyxlogo from "@/assets/nyxLogo.png";
import googleLogo from "@/assets/googleLogo.png";
import microsoftLogo from "@/assets/microsoftLogo.png";
import zohoLogo from "@/assets/zohoLogo.png";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
      {/* Main Card - Two Column Layout - Full Width */}
      <Card className="relative w-full h-screen p-2 shadow-2xl overflow-hidden rounded-none border-0">
        <div className="grid lg:grid-cols-2 h-full">
          {/* Left: Signup Form */}
          <div className="p-8 sm:p-12 lg:p-20 flex flex-col justify-center">
            {/* Logo at top */}
            <div className="mb-16">
              <img 
                src={nyxlogo} 
                alt="NyxAI Logo" 
                className="h-20 w-auto mx-auto mb-4 object-contain"
              />
            </div>

            {/* Sign Up Section */}
            <div className="max-w-md w-full space-y-8 mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-white mb-3">Create account</h2>
                <p className="text-gray-400 text-lg">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Sign in
                  </a>
                </p>
              </div>

              {/* Email & Password Form */}
              {/* <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="fullName" className="text-gray-200 font-medium">
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
                    <p className="mt-2 text-sm text-red-400">{errors.fullName}</p>
                  )}
                </div>

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
                      placeholder="••••••••"
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
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-500 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#1a1a1a] text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div> */}

              {/* OAuth Buttons */}
              <div className="grid grid-cols-1 gap-4">
                <Button
                  variant="outline"
                  className="h-14 bg-[#007ae6] border-0 hover:bg-[#0066cc] font-semibold text-white text-base"
                  onClick={() => handleOAuthSignup("Google")}
                  disabled={isLoading}
                >
                  <img 
                    src={googleLogo} 
                    alt="Google" 
                    className="h-4 w-4 object-contain"
                  />
                  Sign up with Google
                </Button>

                <Button
                  variant="outline"
                  className="h-14 bg-white border-0 hover:bg-gray-100 font-semibold !text-gray-900 text-base"
                  onClick={() => handleOAuthSignup("Microsoft")}
                  disabled={isLoading}
                >
                  <img 
                    src={microsoftLogo} 
                    alt="Microsoft" 
                    className="h-5 w-5 object-contain"
                  />
                  Sign up with Microsoft
                </Button>

                <Button
                  variant="outline"
                  className="h-14 bg-gray-800/60 border border-gray-700 hover:bg-gray-800 hover:border-gray-600 font-semibold text-white text-base"
                  onClick={() => handleOAuthSignup("Zoho")}
                  disabled={isLoading}
                >
                  <img 
                    src={zohoLogo} 
                    alt="Zoho" 
                    className="h-6 w-6 object-contain"
                  />
                  Sign up with Zoho
                </Button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-8">
                <Shield className="inline-block h-4 w-4 mr-1" />
                Your data is encrypted end-to-end. We never read your emails.
              </p>
            </div>
          </div>

          {/* Right: Image/Branding */}
          <div className="hidden lg:flex relative overflow-hidden">
            <img
              src={signupImage}
              alt="NyxAI"
              className="w-full h-full object-cover rounded-lg bg-transparent"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Signup;