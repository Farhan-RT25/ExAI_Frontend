import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc",
    content: "Ex AI has saved me at least 2 hours every day. The AI draft replies are incredibly accurate and match my communication style perfectly.",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Executive Director, Finance Corp",
    content: "The smart categorization feature is a game-changer. I can now focus on emails that truly matter and respond faster to critical messages.",
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "VP of Operations, Global Solutions",
    content: "I was skeptical at first, but Ex AI has transformed how I manage my inbox. The time savings and reduced stress are invaluable.",
    avatar: "ER",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Trusted by Professionals</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what busy executives are saying about Ex AI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="h-8 w-8 text-primary mb-4" />
              <p className="text-muted-foreground mb-6 leading-relaxed">{testimonial.content}</p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
