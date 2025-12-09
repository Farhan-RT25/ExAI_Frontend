import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import CTAButton from "@/components/ui/CTAButton";

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

  return (
    <section id="hero" className="relative pt-32 pb-24 min-h-screen flex items-center bg-background overflow-hidden">
      {/* Purple Northern Lights Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main aurora layers */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-gradient-to-b from-purple-500/20 via-violet-600/10 to-transparent blur-[100px] rounded-full aurora-glow" />
        <div className="absolute top-10 right-1/4 w-[600px] h-[500px] bg-gradient-to-b from-primary/25 via-purple-400/15 to-transparent blur-[120px] rounded-full aurora-shift" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-violet-500/15 via-purple-600/8 to-transparent blur-[80px] rounded-full aurora-glow" style={{ animationDelay: '2s' }} />
        
        {/* Accent glows */}
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-purple-600/10 blur-[150px] rounded-full aurora-shift" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/4 right-10 w-[350px] h-[350px] bg-violet-500/10 blur-[130px] rounded-full aurora-glow" style={{ animationDelay: '6s' }} />
      </div>
      
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powered by Advanced AI</span>
          </motion.div>

          {/* Main heading with floating animation */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] text-foreground"
          >
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              AI-Powered
            </motion.span>
            <br />
            <span
              className={`inline-block bg-gradient-to-r from-primary via-purple-400 to-violet-300 bg-clip-text text-transparent transition-all duration-500 ${
                isAnimating
                  ? "opacity-0 -translate-y-4 scale-95"
                  : "opacity-100 translate-y-0 scale-100"
              }`}
            >
              {words[currentWordIndex]}
            </span>
            <br />
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="inline-block"
            >
              Management
            </motion.span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Empower your workflow with AI solutions that prioritize
            transparency, efficiency, and intelligent automation for your email
            management needs.
          </motion.p>

          {/* CTA Buttons with pulse animation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/signup">
                <CTAButton>
                  Get Started Free
                </CTAButton>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats with stagger animation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-12 border-t border-border/30"
          >
            <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto">
              {[
                { value: "10k+", label: "Active Users" },
                { value: "50M+", label: "Emails Managed" },
                { value: "99.9%", label: "Uptime" }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}