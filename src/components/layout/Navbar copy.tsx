import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Navbar1 = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar style when scrolled past hero section (adjust 600 based on your hero height)
      setScrolled(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="container mx-auto max-w-6xl">
        <div
          className={`backdrop-blur-xl border rounded-full shadow-2xl px-8 py-3 transition-all duration-300 ${
            scrolled
              ? "bg-white/90 border-gray-200"
              : "bg-white/10 border-white/20"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <span
                className={`text-2xl font-bold transition-colors duration-300 ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Ex AI.
              </span>
            </a>

            {/* Center Menu Items */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className={`text-base font-medium transition-colors duration-300 ${
                  scrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className={`text-base font-medium transition-colors duration-300 ${
                  scrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white/90 hover:text-white"
                }`}
              >
                How It Works
              </a>

              <a
                href="#testimonials"
                className={`text-base font-medium transition-colors duration-300 ${
                  scrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Testimonials
              </a>
            </div>

            {/* Auth Buttons - Aligned Right */}
            <div className="flex items-center gap-3">
              <Link to="/login">
                <button
                  className={`text-base font-medium px-5 py-2 rounded-full transition-all duration-300 ${
                    scrolled
                      ? "text-gray-700 hover:text-gray-900"
                      : "text-white hover:text-white/80"
                  }`}
                >
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-purple-600 hover:bg-purple-700 text-white text-base font-medium px-6 py-2 rounded-full transition-all duration-300 shadow-lg">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
