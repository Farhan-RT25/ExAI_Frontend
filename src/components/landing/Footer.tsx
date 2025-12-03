import { Mail, Linkedin, Twitter, Instagram, Webhook } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-transparent relative overflow-hidden pt-20 pb-8">
      {/* Purple arc background - much larger and lower */}
      <div className="absolute inset-x-0 bottom-0 h-full pointer-events-none overflow-hidden">
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-[150%] h-[90vh] rounded-t-[50%]"
          style={{
            bottom: '-40vh',
            background: 'radial-gradient(ellipse 70% 100% at center top, rgba(139, 92, 246, 0.6) 0%, rgba(109, 40, 217, 0.4) 30%, rgba(76, 29, 149, 0.2) 50%, transparent 70%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-transparent flex items-center justify-center transition-transform group-hover:scale-110">
              <Webhook className="h-7 w-7 text-primary" />
            </div>
            <span className="text-2xl font-bold text-white">Nyx AI</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center items-center gap-10 mb-16">
          <a href="#hero" className="text-base text-gray-400 hover:text-white transition-colors">
            Home
          </a>
          <a href="#features" className="text-base text-gray-400 hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-base text-gray-400 hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#testimonials" className="text-base text-gray-400 hover:text-white transition-colors">
            Testimonials
          </a>
          <a href="#faq" className="text-base text-gray-400 hover:text-white transition-colors">
            FAQ
          </a>
          <a href="#security-compliance" className="text-base text-gray-400 hover:text-white transition-colors">
            Security
          </a>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-6 mb-10">
          <a href="#" className="w-12 h-12 rounded-full bg-white/10 hover:bg-primary/20 flex items-center justify-center transition-all group backdrop-blur-sm border border-white/10">
            <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-white" />
          </a>
          <a href="#" className="w-12 h-12 rounded-full bg-white/10 hover:bg-primary/20 flex items-center justify-center transition-all group backdrop-blur-sm border border-white/10">
            <Twitter className="h-5 w-5 text-gray-400 group-hover:text-white" />
          </a>
          <a href="#" className="w-12 h-12 rounded-full bg-white/10 hover:bg-primary/20 flex items-center justify-center transition-all group backdrop-blur-sm border border-white/10">
            <Mail className="h-5 w-5 text-gray-400 group-hover:text-white" />
          </a>
          <a href="#" className="w-12 h-12 rounded-full bg-white/10 hover:bg-primary/20 flex items-center justify-center transition-all group backdrop-blur-sm border border-white/10">
            <Instagram className="h-5 w-5 text-gray-400 group-hover:text-white" />
          </a>
        </div>

        {/* Bottom bar with border */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-sm text-gray-600">
            © 2025 Nyx AI. Designed by <span className="font-semibold text-gray-400"><a href="https://ramatechme.com" target="_blank" rel="noopener noreferrer">R A M A Technologies</a></span>
          </p>
            <div className="flex items-center gap-8">
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-white transition-colors">
                Terms of use
              </Link>
              <Link to="/terms" className="text-sm text-gray-600 hover:text-white transition-colors">
                Privacy policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};