import { Link2, Brain, CheckCircle } from "lucide-react";

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
    <section id="how-it-works" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Get started in minutes with our simple three-step process
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative group animate-fade-up" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connecting line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-border -z-10" />
              )}
              
              <div className="text-center">
                {/* Icon with number badge */}
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
                    <step.icon className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-card border-2 border-primary rounded-full flex items-center justify-center font-bold text-primary shadow-md">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
