import { Tag, FileEdit, Mail, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Tag,
    title: "Smart Categorization",
    description: "AI analyzes and labels emails automatically into customizable categories for better organization",
  },
  {
    icon: FileEdit,
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

export const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            A Smarter Way to Work
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the AI-driven features designed to automate your inbox, generate replies, and deliver meeting insights instantly.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-up border border-border hover:border-primary/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-6">
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                {feature.badge && (
                  <Badge className="absolute -top-2 -right-2 bg-warning text-warning-foreground border-0">
                    {feature.badge}
                  </Badge>
                )}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
