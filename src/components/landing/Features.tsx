import { features, featuresHeading, bottomFeature } from "../../constants/features";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <section id="features" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Header Section - Split Layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid md:grid-cols-2 gap-8 md:gap-16 items-start mb-20 md:mb-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Left - Title */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight">
              {featuresHeading.title}
              <br />
              <span className="text-primary font-normal italic">{featuresHeading.titleEmphasis}</span>
            </h2>
          </div>
          
          {/* Right - Description */}
          <div className="md:pt-2">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {featuresHeading.description}
            </p>
          </div>
        </motion.div>

        {/* Main Feature Cards - 2x2 Grid with Center Orb */}
        <div className="relative max-w-6xl mx-auto mb-20 md:mb-28">
          {/* Center Orb */}
          <motion.div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-40 h-40">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />
              {/* Inner orb with lines */}
              <div className="absolute inset-4 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm flex items-center justify-center">
                <div className="w-full h-full rounded-full relative overflow-hidden">
                  {/* Horizontal lines pattern */}
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute w-full h-px bg-primary/20"
                      style={{ 
                        top: `${8 + i * 7}%`,
                        transform: `scaleX(${Math.sin((i / 11) * Math.PI)})`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-x-32 lg:gap-x-48 gap-y-16 md:gap-y-20">
            {features.map(({ id, icon, title, description }, index) => {
              const positions = [
                "md:text-left md:pr-8",   // Top left
                "md:text-left md:pl-8",   // Top right
                "md:text-left md:pr-8",   // Bottom left
                "md:text-left md:pl-8",   // Bottom right
              ];
              
              return (
                <motion.div
                  key={id}
                  className={`${positions[index]}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-10 h-10 rounded-lg bg-card border border-border/50 flex items-center justify-center">
                      {(() => {
                        const IconComponent = icon;
                        return <IconComponent className="w-5 h-5 text-primary" />;
                      })()}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-3 text-foreground">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Introduction Card */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-t-lg" />
          
          <div className="bg-card/50 border border-border/30 border-t-0 rounded-b-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
              {/* Left - Title */}
              <div>
                <h3 className="text-2xl md:text-3xl font-light text-foreground italic">
                  {bottomFeature.title}
                  <br />
                  <span className="text-primary not-italic font-normal">{bottomFeature.titleEmphasis}</span>
                </h3>
              </div>
              
              {/* Right - Description */}
              <div>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  The dedicated <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-medium">AI assistant</span> making email effortless. {bottomFeature.description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
