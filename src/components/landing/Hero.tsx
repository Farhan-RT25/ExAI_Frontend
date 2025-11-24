import { useState, useEffect } from "react";
import { SiGmail } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import FloatingLines from "@/components/FloatingLines";

// Mock FloatingLines component (replace with your actual implementation)
// const FloatingLines = ({ enabledWaves, lineCount, lineDistance, bendRadius, bendStrength, interactive, parallax }) => (
//   <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
// );

// Mock SparkleButton component (replace with your actual implementation)
const SparkleButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/50"
  >
    {children}
  </button>
);

export default function Hero() {
  const words = ["Email", "Calendar", "Meeting"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleRequestDemo = () => {
    console.log("Request demo clicked");
  };

  return (
    <section className="relative pt-32 pb-20 min-h-screen flex items-center overflow-hidden bg-background">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center animate-fade-up">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8">
            <span className="text-sm font-medium text-primary">Powered by Advanced AI</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            AI-Powered
            <br />
            <span
              className={`inline-block bg-gradient-primary bg-clip-text text-transparent transition-all duration-500 ${
                isAnimating
                  ? "opacity-0 -translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {words[currentWordIndex]}
            </span>
            <br />
            Management
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Empower your workflow with AI solutions that prioritize transparency,
            efficiency, and intelligent automation for your email management needs.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <SparkleButton onClick={handleRequestDemo}>
              Get Started Free
            </SparkleButton>
            <button className="px-8 py-4 text-foreground font-semibold rounded-lg transition-all duration-300 hover:text-primary">
              Watch Demo →
            </button>
          </div>

          {/* Email Provider Icons */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-card/50 border border-border backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group cursor-pointer">
              <SiGmail className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Gmail</span>
            </div>

            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-card/50 border border-border backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group cursor-pointer">
              <SiGmail className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Outlook</span>
            </div>

            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-card/50 border border-border backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group cursor-pointer">
              <MdEmail className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Zoho Mail</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
