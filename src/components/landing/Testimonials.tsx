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
    <section id="testimonials" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Trusted by Professionals Worldwide
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            See what busy executives are saying about Ex AI
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-up border border-border hover:border-primary/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="h-10 w-10 text-primary/20 mb-6 transition-colors group-hover:text-primary/40" />
              <p className="text-muted-foreground mb-6 leading-relaxed text-base">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
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
