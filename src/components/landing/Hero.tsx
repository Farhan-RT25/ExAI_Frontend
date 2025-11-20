import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import heroMockup from "@/assets/hero-mockup.png";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-black">
      {/* Subtle gradient background */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" /> */}
      
      {/* Floating blur elements */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered content */}
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-semibold mb-6 leading-tight">
            AI-Powered Email <br className="hidden sm:block" />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Management</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Empower your users and protect their trust with AI solutions that prioritize transparency, fairness, and performance
          </p>
          
          {/* Email input with CTA */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
            <Input 
              type="email" 
              placeholder="Enter your email"
              className="h-12 text-base"
            />
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity h-12 px-8">
              Get Started
            </Button>
          </div>
          <p className="text-xs text-white/50">
            We care about your data in our <Link to="/privacy" className="underline hover:text-foreground transition-colors">Privacy Policy</Link>
          </p>
        </div>

        {/* Hero mockup */}
        <div className="relative w-full mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
            <img 
              src={heroMockup} 
              alt="Ex AI Dashboard showing email categorization and AI features" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};