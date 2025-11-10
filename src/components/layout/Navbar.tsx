import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
//import logo from '/path/to/logo.svg';

export const Navbar = () => {
  return (

    // 1. Style adjustments: Solid white background, no visible border/shadow, fixed position.
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo: Simpler look, using the purple brand color from the image (approx #5c3e98) */}
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
          <div className="p-2 bg-[#5c3e98] rounded-lg"> {/* Using the purple from the image for the icon background */}
            <Mail className="h-5 w-5 text-white" />
          </div>
          <span className="text-gray-900">Ex AI</span> {/* Matching the simpler text logo look */}
        </Link>

        {/* Navigation Links: Simple text links, gray text, slightly less gap than before */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-700 hover:text-[#5c3e98] transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-gray-700 hover:text-[#5c3e98] transition-colors">How It Works</a>
          <a href="#testimonials" className="text-sm text-gray-700 hover:text-[#5c3e98] transition-colors">Testimonials</a>
        </div>

        <div className="flex items-center gap-3">
          {/* Login Button: Ghost variant, kept the text link style */}
          <Button variant="ghost" asChild className="text-gray-700 hover:bg-gray-50">
            <Link to="/login">Login</Link>
          </Button>

          {/* Sign Up Button: Matching the filled, solid color CTA button from the image. Changed to a solid purple background and white text. */}
          <Button asChild className="rounded-md bg-[#5c3e98] hover:bg-[#5c3e98]/90 text-white font-medium">
            <Link to="/signup">Start Free Trial</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};