import { useState, useEffect } from "react";
import { SiGmail } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const SparkleButton = ({ children }) => (
  <button
    className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/50"
  >
    {children}
  </button>
);

export default function Hero() {
  const words = ["Email", "Calendar", "Meeting"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
    <section id="hero" className="relative pt-32 pb-20 min-h-screen flex items-center overflow-hidden">
      {/* Background Image with optimization */}
      <div className="absolute inset-0 z-0">
        {/* Low quality placeholder - loads instantly */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900" />

        {/* Actual background image */}
        <img
          src="src/assets/heroBg.webp"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="eager"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay for text readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" /> */}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center animate-fade-up">
          {/* Badge */}
          {/* <div className="inline-flex items-center px-4 py-2 rounded-full border border-purple-400/30 bg-purple-500/10 backdrop-blur-sm mb-8">
            <span className="text-sm font-medium text-purple-300">Powered by Advanced AI</span>
          </div> */}

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white">
            AI-Powered
            <br />
            <span
              className={`inline-block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-500 ${
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

          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Empower your workflow with AI solutions that prioritize
            transparency, efficiency, and intelligent automation for your email
            management needs.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <SparkleButton>
              <Link to="/signup">Get Started Free</Link>
            </SparkleButton>
            <button className="px-8 py-4 text-white font-semibold rounded-lg transition-all duration-300 hover:text-purple-300">
              Watch Demo →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}