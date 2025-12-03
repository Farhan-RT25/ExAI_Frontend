import { details, features } from "../../constants/features";
import { SectionHeading } from "./SectionHeading";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Space ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
      
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

        {/* Main container with border */}
        <motion.div 
          className="relative border border-border/50 rounded-3xl overflow-hidden max-w-7xl mx-auto bg-card/30 backdrop-blur-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          
          {/* Top Section - Feature Cards */}
          <div className="flex flex-col md:flex-row">
            {features.map(({ id, icon, caption, title, text, button }, index) => (
              <motion.div
                key={id}
                className="relative flex-1 px-8 py-12 md:px-10 md:pt-16 md:pb-16 border-b md:border-b-0 md:border-r last:border-r-0 border-border/30 bg-card/20 hover:bg-card/40 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Icon with decorative line */}
                <div className="mb-8 flex items-start">
                  <div className="flex flex-col items-center">
                    {/* Decorative line above icon */}
                    <div className="w-0.5 h-16 bg-gradient-to-b from-transparent via-primary/50 to-primary group-hover:via-primary transition-all duration-300" />

                    {/* Feature Icon */}
                    <div className="w-24 h-24 rounded-2xl bg-gradient-primary p-[3px] shadow-lg group-hover:shadow-glow transition-all duration-300">
                      <div className="w-full h-full bg-background/95 rounded-xl flex items-center justify-center">
                        {(() => {
                          const IconComponent = icon;
                          return <IconComponent className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" />;
                        })()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <p className="text-xs font-bold text-primary mb-4 uppercase tracking-widest">
                  {caption}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold mb-5 text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                  {title}
                </h2>
                <p className="mb-8 text-muted-foreground leading-relaxed text-sm md:text-base">
                  {text}
                </p>
                
                {/* Button */}
                <button className="group/btn flex items-center gap-3 px-6 py-3 bg-gradient-primary text-primary-foreground rounded-xl font-semibold hover:shadow-glow transition-all duration-300 hover:scale-[1.02]">
                  {(() => {
                    const ButtonIcon = button.icon;
                    return <ButtonIcon className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" />;
                  })()}
                  <span className="text-sm">{button.title}</span>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Bottom Section - Details Grid */}
          <div className="relative bg-card/30 border-t border-border/30">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {details.map(({ id, icon, title }, index) => (
                <motion.div
                  key={id}
                  className={`relative flex flex-col items-center justify-center py-12 px-6 ${
                    index < 2 ? 'border-b md:border-b-0' : ''
                  } ${index < 3 ? 'border-r border-border/30' : ''}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {/* Icon Circle */}
                  <div className="flex items-center justify-center mb-4 border border-primary/30 rounded-full hover:shadow-glow transition-all duration-300 w-16 h-16 md:w-14 md:h-14 bg-primary group cursor-pointer hover:scale-110">
                    {(() => {
                      const DetailIcon = icon;
                      return <DetailIcon className="w-8 h-8 md:w-6 md:h-6 text-white" />;
                    })()}
                  </div>

                  {/* Title */}
                  <h3 className="text-xs md:text-sm text-center font-bold text-foreground uppercase leading-tight max-w-[140px]">
                    {title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
