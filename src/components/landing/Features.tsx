import { Sparkles } from "lucide-react";
import { features, featuresHeading, bottomFeature } from "../../constants/features";
import { SectionHeading } from "./SectionHeading";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            badge="Features"
            title={`${featuresHeading.title} ${featuresHeading.titleEmphasis}`}
            description={featuresHeading.description}
          />
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {features.map(({ id, icon, title, description }, index) => {
            const IconComponent = icon;
            
            return (
              <motion.div
                key={id}
                className="group bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-7 h-7 text-primary" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom AI Card */}
        <motion.div
          className="max-w-5xl mx-auto mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 md:p-12 overflow-hidden group hover:border-primary/30 transition-all duration-300">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-600/5 opacity-50" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {bottomFeature.title} <span className="text-primary">{bottomFeature.titleEmphasis}</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  {bottomFeature.description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
