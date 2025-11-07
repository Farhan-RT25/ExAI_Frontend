import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import heroMockup from "@/assets/hero-mockup.png";

const testimonials = [
  {
    name: "Pat Cummins",
    role: "Ceo Biosynthesis",
    company: "Biosynthesis",
    content: "I can't imagine managing our email campaigns without Quip. The simplicity of creating visually stunning emails combined with powerful automation tools has been a game-changer for our marketing team. Our engagement rates have soared.",
    avatar: "PC",
    stars: 5
  },
  {
    name: "Jofra Archer", 
    role: "Ceo CloudWatch",
    company: "CloudWatch",
    content: "Quip has exceeded our expectations in every way. The ease with which we can target specific audience segments has an transformed our approach to email marketing. The automation features have saved us countless hours, allowing us to focus",
    avatar: "JA",
    stars: 5
  },
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    content: "Ex AI has transformed how our team manages email communications. The AI-powered categorization is incredibly accurate!",
    avatar: "SJ",
    stars: 5
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 2));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(testimonials.length / 2)) % Math.ceil(testimonials.length / 2));
  };

  return (
    <>
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-up">
            <p className="text-primary text-sm font-semibold mb-2 uppercase tracking-wider">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Why Our Users Love Us</h2>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {testimonials.slice(currentIndex * 2, currentIndex * 2 + 2).map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-2xl p-6 sm:p-8 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{testimonial.content}</p>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm font-semibold text-primary">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="rounded-full hover:scale-110 transition-transform duration-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all duration-300"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Dashboard Preview */}
      <section className="py-20 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 animate-fade-up text-primary-foreground">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Join 500,000+ SEO's who trust Quip for insights that help their business grow.
            </h2>
            <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
              Quip has exceeded our expectations in every way. The ease & which we can target specific audience segments has an transformed
            </p>
            <Button size="lg" variant="secondary" className="shadow-2xl hover:shadow-3xl transition-all duration-300 text-base sm:text-lg">
              Get Started For Free
            </Button>
          </div>

          {/* Dashboard preview */}
          <div className="max-w-4xl mx-auto mt-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-2xl"></div>
              <img 
                src={heroMockup} 
                alt="Dashboard preview" 
                className="relative w-full h-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500"
              />
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid sm:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto text-primary-foreground">
            {[
              { icon: "🕐", text: "Free training & 24-hours" },
              { icon: "🔒", text: "Serious about security & privacy" },
              { icon: "📈", text: "Highest levels of uptime the last 12 months" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 animate-fade-up" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                <span className="text-3xl">{item.icon}</span>
                <p className="text-sm sm:text-base">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative circle element */}
        <div className="absolute left-0 bottom-0 w-48 h-48 sm:w-64 sm:h-64">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-primary-foreground/10 rounded-full"></div>
            <div className="absolute inset-8 bg-primary-foreground/10 rounded-full"></div>
            <div className="absolute inset-16 bg-primary-foreground/10 rounded-full"></div>
          </div>
        </div>
      </section>
    </>
  );
};
