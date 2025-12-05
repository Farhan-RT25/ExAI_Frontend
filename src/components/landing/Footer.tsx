import { Linkedin, Twitter, Instagram, Webhook } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/30 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110">
              <Webhook className="h-7 w-7 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">Nyx AI</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center items-center gap-8 mb-12">
          <a href="#hero" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Home
          </a>
          <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            FAQ
          </a>
          <a href="#security-compliance" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Security
          </a>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <a href="#" className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-all group border border-border/50">
            <Linkedin className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-all group border border-border/50">
            <Twitter className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-all group border border-border/50">
            <Instagram className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-xs text-muted-foreground">
              © 2025 Nyx AI. Designed by{" "}
              <a 
                href="https://ramatechme.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                R A M A Technologies
              </a>
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Terms of use
              </Link>
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Privacy policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
