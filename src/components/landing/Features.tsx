import { details, features } from "../../constants/features";
import { SectionHeading } from "./SectionHeading";

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Features"
          title="Powerful Features for Modern Email Management"
          description="Everything you need to take control of your inbox and boost your productivity"
        />

        {/* Main container with border */}
        <div className="relative border-2 border-border rounded-3xl overflow-hidden max-w-7xl mx-auto">
          
          {/* Top Section - Feature Cards */}
          <div className="flex flex-col md:flex-row">
            {features.map(({ id, icon, caption, title, text, button }) => (
              <div
                key={id}
                className="relative flex-1 px-8 py-12 md:px-10 md:pt-16 md:pb-16 border-b-2 md:border-b-0 md:border-r-2 last:border-r-0 border-border bg-card/50 hover:bg-card/80 transition-all duration-300 group"
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
              </div>
            ))}
          </div>

          {/* Bottom Section - Details Grid */}
          <div className="relative bg-card/50 border-t-2 rounded-3xl border-border">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {details.map(({ id, icon, title }, index) => (
                <div
                  key={id}
                  className={`relative flex flex-col items-center justify-center py-12 px-6 ${
                    index !== details.length - 1 ? '' : ''
                  } ${
                    index < 2 ? 'border-b-2 md:border-b-0' : ''
                  }`}
                >
                  {/* Icon Circle */}
                  <div className="flex items-center justify-center mb-4 border-2 border-primary/30 rounded-full hover:border-primary hover:shadow-lg transition-all duration-300 w-16 h-16 md:w-14 md:h-14 bg-background group cursor-pointer hover:scale-110">
                    {(() => {
                      const DetailIcon = icon;
                      return <DetailIcon className="w-8 h-8 md:w-6 md:h-6 text-primary group-hover:text-primary" />;
                    })()}
                  </div>

                  {/* Title */}
                  <h3 className="text-xs md:text-sm text-center font-bold text-foreground uppercase leading-tight max-w-[140px]">
                    {title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;