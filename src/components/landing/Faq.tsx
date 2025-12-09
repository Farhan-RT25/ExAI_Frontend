import { faq } from "../../constants/faq";
import FaqItem from "@/components/FaqItem";
import { motion } from "framer-motion";

const Faq = () => {
  return (
    <section id="faq" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Purple Northern Lights ambient */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-gradient-to-b from-purple-500/10 via-violet-600/5 to-transparent blur-[120px] rounded-full aurora-glow pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-primary/8 blur-[100px] rounded-full aurora-shift pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left Side - Heading */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">FAQ</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              Frequently asked
              <br />
              questions
            </h2>
            
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about our platform
            </p>
          </motion.div>

          {/* Right Side - FAQ Items */}
          <div className="lg:col-span-3">
            <div className="space-y-0">
              {faq.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <FaqItem item={item} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;