import { Sparkles, Zap, Mail, Video, Badge as BadgeIcon, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import heroMockup from "@/assets/hero-mockup.png";

const features = [
  {
    icon: Sparkles,
    title: "Smart Categorization",
    description: "AI analyzes and labels emails automatically into customizable categories for better organization",
  },
  {
    icon: Zap,
    title: "AI Draft Replies",
    description: "Generate contextual responses in your communication style, saving hours of writing time",
  },
  {
    icon: Mail,
    title: "Multi-Provider Support",
    description: "Works seamlessly with Gmail, Outlook, and Zoho mail providers",
  },
  {
    icon: Video,
    title: "Meeting Intelligence",
    description: "Get meeting transcripts and AI-generated summaries automatically",
    badge: "Coming Soon",
  },
];

const accordionItems = [
  {
    title: "Prepare your domain inbox",
    content: "Email health check-up",
    description: "Experience peace of mind with our deliver-ability focused product, equipped to full-custom, google mail checked notifications, and spam."
  },
  {
    title: "How to write a cold email replies",
    content: "AI-powered writing assistance",
    description: "Get intelligent suggestions for crafting compelling cold email replies that get responses."
  }
];

export const Features = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {/* Main Features Grid */}
      <section id="features" className="py-20 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-up">
            <p className="text-primary text-sm sm:text-base font-semibold mb-2 uppercase tracking-wider">Why Choose Quip?</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Empower brand: Transform through email campaigns</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto mb-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 animate-fade-up hover:shadow-lg hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 group-hover:bg-gradient-primary rounded-xl flex items-center justify-center mb-4 transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
                  {feature.title}
                  {feature.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  )}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Accordion Section */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto mt-20">
            <div className="space-y-4">
              {accordionItems.map((item, index) => (
                <Collapsible
                  key={index}
                  open={openIndex === index}
                  onOpenChange={() => setOpenIndex(openIndex === index ? null : index)}
                  className="border border-border rounded-xl overflow-hidden bg-card hover:border-primary/50 transition-all duration-300"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-6 text-left">
                    <span className="text-lg font-semibold">{item.title}</span>
                    <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-6 pb-6">
                    <div className="pt-2 border-t border-border">
                      <p className="text-base font-medium text-primary mb-2">{item.content}</p>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
              <Button size="lg" className="mt-6 shadow-lg hover:shadow-xl transition-all duration-300">
                Boost Campaigns Now
              </Button>
            </div>

            <div className="relative animate-fade-in lg:order-last order-first">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-2xl"></div>
              <img 
                src={heroMockup} 
                alt="Campaign dashboard preview" 
                className="relative w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
