import { Button } from "@/components/ui/button";
import { Webhook } from "lucide-react";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#faq", label: "FAQ" },
    { href: "#security-compliance", label: "Security" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 rounded-b-sm max-w-7xl mx-auto transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-lg shadow-lg' : 'bg-transparent backdrop-blur-md'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 sm:gap-3 group z-50">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-primary rounded-xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6">
                <Webhook className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Nyx AI
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button asChild variant="ghost" className="hover:bg-muted/50">
                <a href="/login">Login</a>
              </Button>
              <Button asChild className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg">
                <a href="/signup">Start Free Trial</a>
              </Button>
            </div>

            {/* Mobile/Tablet CTA & Menu Button */}
            <div className="flex lg:hidden items-center gap-2 sm:gap-3">
              <Button asChild size="sm" className="bg-gradient-primary hover:opacity-90 text-xs sm:text-sm">
                <a href="/signup">Get Started</a>
              </Button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors z-50"
                aria-label="Toggle Menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`} />
                  <span className={`w-full h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`} />
                  <span className={`w-full h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-background/95 backdrop-blur-lg z-40 lg:hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`flex flex-col items-center justify-center h-full gap-2 transition-all duration-500 ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl sm:text-3xl font-semibold text-foreground/80 hover:text-foreground hover:scale-110 transition-all py-3 px-6 rounded-xl hover:bg-muted/30"
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
              }}
            >
              {link.label}
            </a>
          ))}
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="w-40 text-lg"
            >
              <a href="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</a>
            </Button>
            <Button 
              asChild 
              size="lg"
              className="w-40 bg-gradient-primary hover:opacity-90 text-lg shadow-xl"
            >
              <a href="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};