import { details, features } from "../../constants/features";
import { SectionHeading } from "./SectionHeading";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <section id="features" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            badge="Features"
            title="Powerful Features for Modern Email Management"
            description="Everything you need to take control of your inbox and boost your productivity"
          />
        </motion.div>

        {/* Main Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {features.map(({ id, icon, caption, title, text, button }, index) => (
            <motion.div
              key={id}
              className="group relative p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card/80 hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  {(() => {
                    const IconComponent = icon;
                    return <IconComponent className="w-7 h-7 text-primary" />;
                  })()}
                </div>
              </div>

              {/* Content */}
              <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
                {caption}
              </p>
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {text}
              </p>
              
              {/* Button */}
              <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                {(() => {
                  const ButtonIcon = button.icon;
                  return <ButtonIcon className="w-4 h-4" />;
                })()}
                {button.title}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Details Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {details.map(({ id, icon, title }, index) => (
            <motion.div
              key={id}
              className="flex flex-col items-center p-6 rounded-xl border border-border/30 bg-card/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-3">
                {(() => {
                  const DetailIcon = icon;
                  return <DetailIcon className="w-5 h-5 text-primary-foreground" />;
                })()}
              </div>
              <h4 className="text-xs font-semibold text-foreground text-center uppercase tracking-wide">
                {title}
              </h4>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
