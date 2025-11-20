import { Mail, Linkedin, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-[#1a1d2e] text-gray-300 -mb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Logo and description */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">Ex AI</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              Crafting intelligent, user-first digital experiences — combining design, data, and technology to help businesses grow
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors">
                <Mail className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Navigation</h3>
            <ul className="space-y-1">
              <li><a href="#features" className="text-sm hover:text-white transition-colors">Home</a></li>
              <li><a href="#features" className="text-sm hover:text-white transition-colors">About</a></li>
              <li><a href="#how-it-works" className="text-sm hover:text-white transition-colors">Products</a></li>
              <li><a href="#testimonials" className="text-sm hover:text-white transition-colors">Blog</a></li>
              <li><Link to="/pricing" className="text-sm hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Company</h3>
            <ul className="space-y-1">
              <li><Link to="/about" className="text-sm hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-sm hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/press" className="text-sm hover:text-white transition-colors">Press</Link></li>
              <li><Link to="/partners" className="text-sm hover:text-white transition-colors">Partners</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Resources</h3>
            <ul className="space-y-1">
              <li><Link to="/help" className="text-sm hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/api" className="text-sm hover:text-white transition-colors">API Docs</Link></li>
              <li><Link to="/security" className="text-sm hover:text-white transition-colors">Security</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Contact Info</h3>
            <ul className="space-y-3">
              <li className="text-sm">
                <a href="mailto:hello@exai.com" className="hover:text-white transition-colors">
                  hello@exai.com
                </a>
              </li>
              <li className="text-sm">
                <a href="tel:+11555123456" className="hover:text-white transition-colors">
                  +971 5 514 1234
                </a>
              </li>
              <li className="text-sm text-gray-400">
                Dubai, United Arab Emirates
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-2 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2025 Ex AI. Designed by <span className="text-white">R A M A Technologies</span>
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
