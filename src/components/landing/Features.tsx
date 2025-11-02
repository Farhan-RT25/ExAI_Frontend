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
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your inbox efficiently and professionally
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                {feature.badge && (
                  <Badge className="absolute -top-2 -right-2 bg-warning text-warning-foreground">
                    {feature.badge}
                  </Badge>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
