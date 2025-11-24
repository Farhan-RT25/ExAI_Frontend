import { faq } from "../../constants/faq";
import FaqItem from "@/components/FaqItem";

const Faq = () => {
  const halfLength = Math.floor(faq.length / 2);

  return (
    <section id="faq" className="relative py-20 bg-background">
      {/* Header Section with decorative line */}
      <div className="container mx-auto px-4 mb-16">
        
        {/* Decorative Line with Icon */}
        <div className="relative w-full h-px bg-border my-12">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
              <svg 
                className="w-10 h-10 text-primary-foreground" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
          </div>
        </div>
                <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our AI email management platform.
          </p>
        </div>
      </div>

      {/* FAQ Grid */}
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {faq.slice(0, halfLength).map((item, index) => (
              <FaqItem key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {faq.slice(halfLength).map((item, index) => (
              <FaqItem 
                key={item.id} 
                item={item} 
                index={halfLength + index} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />
    </section>
  );
};

export default Faq;