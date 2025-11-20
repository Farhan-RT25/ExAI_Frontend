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
    <section 
      id="how-it-works" 
      className="py-20 md:py-32 bg-background relative overflow-hidden"
      style={{
        backgroundImage: 'url("src/assets/hero-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/50 z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-white">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
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
              <div className="text-center">
                {/* Icon with number badge */}
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
                    <step.icon className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-primary rounded-full flex items-center justify-center font-bold text-primary shadow-md">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-blue-300 transition-colors text-white">
                  {step.title}
                </h3>
                <p className="text-gray-100 leading-relaxed">
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