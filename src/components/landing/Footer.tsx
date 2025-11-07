import { Mail, Linkedin, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const footerSections = [
  { title: "Product", links: ["Pricing", "Integration", "Features", "Templates", "Changelog"] },
  { title: "Support", links: ["On-boarding", "Help center", "Contact us", "Experts", "Status"] },
  { title: "Resources", links: ["Community", "Affiliates", "Partnerships", "Press & Benefits", "App docs"] },
  { title: "Company", links: ["About", "Our blog", "In the press", "Brand assets", "Work with us"] },
  { title: "Download", links: ["iPhone & iPad", "Android", "MacOS", "Windows"] }
];

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "#", label: "Email" },
  { icon: Instagram, href: "#", label: "Instagram" }
];

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Mail className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">Ex AI</span>
            </Link>
          </div>

          {footerSections.map((section, index) => (
            <div key={index} className="space-y-3">
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">©2023 Quip · Security · Your Privacy · Terms</p>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground mr-2">Social Links</span>
            {socialLinks.map((social, index) => (
              <a key={index} href={social.href} aria-label={social.label} className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center text-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110">
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
