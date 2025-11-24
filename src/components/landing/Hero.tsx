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
    <section className="relative pt-40 pb-10 h-[100vh] overflow-hidden">
      {/* FloatingLines Background - only in Hero */}
      <div className="absolute inset-0 w-full h-full">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[5, 5, 5]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Content */}
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            AI-Powered
            <br />
            <span
              className={`inline-block text-purple-400 transition-all duration-500 ${
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
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Empower your users and protect their trust with AI solutions that
            prioritize transparency, fairness, and performance
          </p>

          {/* Email CTA with Sparkle Button */}
          <div className="max-w-xl mx-auto mb-6">
            <SparkleButton onClick={handleRequestDemo}>
              Request Demo
            </SparkleButton>
          </div>

          {/* Email Provider Icons */}
          <div className="flex items-center justify-center gap-8 max-w-md mx-auto">
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:shadow-lg">
                <SiGmail className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs text-white/70 font-medium">Gmail</span>
            </div>

            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:shadow-lg">
                <SiGmail className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs text-white/70 font-medium">Outlook</span>
            </div>

            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:shadow-lg">
                <MdEmail className="w-8 h-8 text-white" />
              </div>
              <span className="text-xs text-white/70 font-medium">
                Zoho Mail
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
