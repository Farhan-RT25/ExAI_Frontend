import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Mail className="h-5 w-5 text-primary-foreground" />
          </div>
          <span>Ex AI</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm hover:text-primary transition-colors">How It Works</a>
          <a href="#testimonials" className="text-sm hover:text-primary transition-colors">Testimonials</a>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Start Free Trial</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
