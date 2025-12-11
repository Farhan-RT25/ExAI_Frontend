import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { login, saveAuthData } from "@/lib/api/auth";
import { initiateGoogleLogin } from "@/lib/api/google";
import { initiateMicrosoftLogin } from "@/lib/api/microsoft";
import { initiateZohoLogin } from "@/lib/api/zoho";
import loginImage from "@/assets/loginIMG.png";
import nyxlogo from "@/assets/nyxLogo.png";
import googleLogo from "@/assets/googleLogo.png";
import microsoftLogo from "@/assets/microsoftLogo.png";
import zohoLogo from "@/assets/zohoLogo.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleOAuthLogin = (provider: string) => {
    setIsLoading(true);
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
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[600px] bg-gradient-to-r from-primary/5 to-transparent blur-2xl" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="grid lg:grid-cols-2 w-full relative z-10">
        {/* Left: Login Form */}
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full mx-auto"
          >
            {/* Logo */}
            <div className="mb-12">
              <img 
                src={nyxlogo} 
                alt="NyxAI Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* Sign In Section */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Welcome back
                </h1>
                <p className="text-muted-foreground text-lg">
                  New here?{" "}
                  <a
                    href="/signup"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Create an account
                  </a>
                </p>
              </div>

              {/* OAuth Buttons */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-14 bg-card hover:bg-card/80 border-border hover:border-primary/50 font-medium text-foreground text-base justify-start px-5 gap-4 transition-all"
                  onClick={() => handleOAuthLogin("Google")}
                  disabled={isLoading}
                >
                  <img 
                    src={googleLogo} 
                    alt="Google" 
                    className="h-5 w-5 object-contain"
                  />
                  Continue with Google
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-14 bg-card hover:bg-card/80 border-border hover:border-primary/50 font-medium text-foreground text-base justify-start px-5 gap-4 transition-all"
                  onClick={() => handleOAuthLogin("Microsoft")}
                  disabled={isLoading}
                >
                  <img 
                    src={microsoftLogo} 
                    alt="Microsoft" 
                    className="h-5 w-5 object-contain"
                  />
                  Continue with Microsoft
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-14 bg-card hover:bg-card/80 border-border hover:border-primary/50 font-medium text-foreground text-base justify-start px-5 gap-4 transition-all"
                  onClick={() => handleOAuthLogin("Zoho")}
                  disabled={isLoading}
                >
                  <img 
                    src={zohoLogo} 
                    alt="Zoho" 
                    className="h-5 w-5 object-contain"
                  />
                  Continue with Zoho
                </Button>
              </div>

              {/* Security note */}
              <div className="pt-4">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Your data is encrypted end-to-end. We never read your emails.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Image/Branding */}
        <div className="hidden lg:flex relative">
          <div className="absolute inset-4 rounded-2xl overflow-hidden bg-card/30 backdrop-blur-sm border border-border/50">
            <img
              src={loginImage}
              alt="NyxAI"
              className="w-full h-full object-cover opacity-90"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;