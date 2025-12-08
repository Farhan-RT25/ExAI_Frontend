import { Loader, Zap, Calendar, Brain, Webhook } from "lucide-react";
import { features, featuresHeading, bottomFeature } from "../../constants/features";
import { motion } from "framer-motion";

export default function Features() {
  
  return (
    <section id="features" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-28 relative z-10">
        {/* Header Section - Split Layout */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 md:gap-20 items-start mb-24 md:mb-24 max-w-6xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Left - Badge and Title */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-primary/5 backdrop-blur-sm mb-4">
              <Loader className="w-4 h-4 mr-2 text-primary animate-spin duration-3000" />
              <span className="text-sm font-medium text-primary uppercase">Features</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-foreground leading-[1.1]">
              {featuresHeading.title}
              <br />
              <span className="text-primary font-normal">{featuresHeading.titleEmphasis}</span>
            </h2>
          </div>
          
          {/* Right - Description */}
          <div className="md:pt-20 mt-10">
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {featuresHeading.description}
            </p>
          </div>
        </motion.div>

        {/* Main Feature Cards - 2x2 Grid with Center Circle */}
        <div className="relative max-w-6xl mx-auto mb-24 md:mb-32">
          {/* Center Circle with Webhook Icon - Hidden on mobile and tablet, visible on lg+ */}
          <motion.div 
            className="absolute left-[43%] top-1/3 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Outer circle border */}
            <div className="absolute w-48 h-48 xl:w-56 xl:h-56 rounded-full border-2 border-primary/30" />
            
            {/* Middle circle - subtle */}
            <div className="absolute w-40 h-40 xl:w-48 xl:h-48 rounded-full border border-primary/20" />
            
            {/* Inner filled circle with glow */}
            <motion.div 
              className="relative w-32 h-32 xl:w-40 xl:h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/40 flex items-center justify-center shadow-lg shadow-primary/10"
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 20px rgba(var(--primary), 0.1)',
                  '0 0 40px rgba(var(--primary), 0.2)',
                  '0 0 20px rgba(var(--primary), 0.1)',
                ]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Webhook className="w-16 h-16 xl:w-20 xl:h-20 text-primary" strokeWidth={1.5} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-x-20 lg:gap-x-44 xl:gap-x-56 gap-y-12 md:gap-y-20">
            {features.map(({ id, icon, title, description }, index) => {
              const IconComponent = icon;
              
              return (
                <motion.div
                  key={id}
                  className={`${index % 2 === 0 ? 'md:pr-4 lg:pr-8' : 'md:pl-4 lg:pl-8'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-full bg-muted border border-border/40 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-base md:text-lg font-semibold mb-3 text-foreground tracking-tight">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                    {description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Introduction Card */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Accent bar */}
          <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-primary to-transparent rounded-t-lg" />
          
          <div className="bg-card/30 border border-border/20 border-t-0 rounded-b-2xl p-8 md:p-12 lg:p-14">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
              {/* Left - Title */}
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
                  {bottomFeature.title}
                  <br />
                  <span className="text-primary font-normal">{bottomFeature.titleEmphasis}</span>
                </h3>
              </div>
              
              {/* Right - Description */}
              <div className="md:pt-2">
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  The dedicated <span className="bg-primary/15 text-primary px-2 py-0.5 rounded-md text-xs font-medium">AI assistant</span> making email effortless. {bottomFeature.description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}