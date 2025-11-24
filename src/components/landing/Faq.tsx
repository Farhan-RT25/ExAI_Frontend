import { faq } from "../../constants/faq";
import FaqItem from "@/components/FaqItem";
import { SectionHeading } from "./SectionHeading";

const Faq = () => {
  const halfLength = Math.floor(faq.length / 2);

  return (
    <section id="faq" className="relative py-20 md:py-32 bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about our AI email management platform"
        />
        {/* FAQ Grid */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
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
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
    </section>
  );
};

export default Faq;