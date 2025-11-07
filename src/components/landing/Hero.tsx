import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroMockup from "@/assets/hero-mockup.png";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-background">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground">
              AI-Powered Email Management for Busy Professionals
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-muted-foreground leading-relaxed">
              Revolutionize your email marketing strategy with our cutting-edge AI software. Our intuitive platform offers a seamless interface, empowering you to manage campaigns effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                asChild 
                className="text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link to="/signup">
                  Send Smarter Emails <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="text-base sm:text-lg transition-all duration-300 hover:scale-105"
              >
                <Link to="#features">
                  Explore Features
                </Link>
              </Button>
            </div>

            {/* Floating provider badges */}
            <div className="mt-12 relative hidden lg:block">
              <div className="absolute -right-20 top-0 animate-float">
                <div className="bg-card border border-border rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      G
                    </div>
                    <span className="font-semibold text-foreground">Google</span>
                  </div>
                  <span className="text-xs text-teal font-medium mt-1 block">Inbox Rotation</span>
                </div>
              </div>
              
              <div className="absolute -right-32 top-20 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="bg-card border border-border rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      M
                    </div>
                    <span className="font-semibold text-foreground">Microsoft</span>
                  </div>
                </div>
              </div>

              <div className="absolute -right-24 top-40 animate-float" style={{ animationDelay: "1s" }}>
                <div className="bg-card border border-border rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      C
                    </div>
                    <span className="font-semibold text-foreground">Custom Providers</span>
                  </div>
                  <span className="text-xs text-warning font-medium mt-1 block">Email Warm-up</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right mockup */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-50"></div>
              <img 
                src={heroMockup} 
                alt="Ex AI Dashboard showing email categorization and AI features" 
                className="relative w-full h-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
