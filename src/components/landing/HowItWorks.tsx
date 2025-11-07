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
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes with our simple three-step process
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                  <step.icon className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center font-bold text-secondary-foreground">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
