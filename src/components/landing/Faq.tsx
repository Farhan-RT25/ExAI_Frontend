import { faq } from "../../constants/faq";
import FaqItem from "@/components/FaqItem";
import { SectionHeading } from "./SectionHeading";
import { motion } from "framer-motion";

const Faq = () => {
  const halfLength = Math.floor(faq.length / 2);

  return (
    <section id="faq" className="relative py-20 md:py-32 bg-background overflow-hidden">
      {/* Space ambient lighting */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            badge="FAQ"
            title="Frequently Asked Questions"
            description="Everything you need to know about our AI email management platform"
          />
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-4">
            {faq.slice(0, halfLength).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FaqItem item={item} index={index} />
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {faq.slice(halfLength).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (halfLength + index) * 0.1 }}
              >
                <FaqItem 
                  item={item} 
                  index={halfLength + index} 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
