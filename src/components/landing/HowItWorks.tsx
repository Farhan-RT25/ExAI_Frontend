import { Link2, Brain, CheckCircle } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    icon: Link2,
    title: "Connect Your Email Provider",
    description: "Securely connect Gmail, Outlook, or Zoho in just a few clicks",
  },
  {
    icon: Brain,
    title: "AI Analyzes Your Style",
    description: "Our AI learns your communication patterns and preferences",
  },
  {
    icon: CheckCircle,
    title: "Get Organized Inbox & Instant Drafts",
    description: "Enjoy automatic categorization and ready-to-send draft replies",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="How It Works"
          title="Get Started in Minutes"
          description="Our simple 3-step process gets you up and running quickly"
        />

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-20 left-[16.666%] right-[16.666%] h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />

          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative group animate-fade-up" 
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Step number badge */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg z-10 group-hover:scale-110 transition-transform duration-300">
                {index + 1}
              </div>
              
              <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 mt-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
