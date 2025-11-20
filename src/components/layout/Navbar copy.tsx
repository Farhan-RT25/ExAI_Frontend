import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const Navbar1 = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-2">
      <div
        className={`container mx-auto !pr-1 !pl-1 transition-all duration-300 rounded-full ${
          scrolled
            ? "bg-slate-900/80 backdrop-blur-xl border border-purple-500/20 shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl font-semibold text-white">Ex AI.</span>
          </Link>

          {/* Navigation Links with Hover Underline */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="relative text-sm font-medium text-white hover:text-white transition-colors group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-bottom-left translate-y-1"></span>
            </a>
            <a
              href="#how-it-works"
              className="relative text-sm font-medium text-white hover:text-white transition-colors group"
            >
              How It Works
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-bottom-left translate-y-1"></span>
            </a>
            <a
              href="#testimonials"
              className="relative text-sm font-medium text-white hover:text-white transition-colors group"
            >
              Testimonials
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-bottom-left translate-y-1"></span>
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="bg-transparent text-white transition-colors font-medium rounded-sm px-6 hover:bg-white hover:text-foreground border border-white"
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="bg-transparent text-white transition-colors font-medium rounded-sm px-6 hover:bg-white hover:text-foreground border border-white"
            >
              <Link to="/login">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
