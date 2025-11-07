import { Button } from "@/components/ui/button";

export const HowItWorks = () => {
  const integrations = [
    { name: "Android", color: "from-green-400 to-green-600", position: "top-20 left-10" },
    { name: "Play", color: "from-blue-500 to-blue-600", position: "top-32 left-32" },
    { name: "Windows", color: "from-blue-400 to-cyan-500", position: "top-10 left-1/2" },
    { name: "Chrome", color: "from-yellow-400 to-red-500", position: "bottom-32 left-20" },
    { name: "Product", color: "from-orange-400 to-red-500", position: "bottom-20 left-40" },
    { name: "Ubuntu", color: "from-orange-500 to-red-600", position: "bottom-20 left-10" },
    { name: "Apple", color: "from-blue-400 to-blue-600", position: "top-16 right-10" },
    { name: "Sketch", color: "from-yellow-400 to-orange-500", position: "top-8 right-32" },
    { name: "Spotify", color: "from-green-500 to-green-600", position: "top-32 right-20" },
    { name: "Figma", color: "from-purple-500 to-pink-500", position: "top-20 right-48" },
    { name: "Angular", color: "from-red-500 to-red-600", position: "top-48 right-16" },
    { name: "Shopify", color: "from-green-500 to-teal-500", position: "bottom-32 right-20" },
    { name: "Vimeo", color: "from-blue-400 to-blue-600", position: "bottom-20 right-48" },
    { name: "Slack", color: "from-purple-500 to-pink-500", position: "bottom-32 right-40" },
  ];

  return (
    <section id="how-it-works" className="relative py-20 sm:py-24 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D1B69] via-[#3D2777] to-[#1a0f3d]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <p className="text-primary-foreground/70 text-sm font-semibold mb-3 uppercase tracking-wider">Integrations</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-primary-foreground">
            Connect with your favorite apps
          </h2>
          <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            With our intuitive platform, creating impactful campaigns is a breeze. Effortlessly email blasts
          </p>
          <Button size="lg" className="shadow-xl hover:shadow-2xl transition-all duration-300">
            View All Integrations
          </Button>
        </div>

        {/* Central glowing element with floating icons */}
        <div className="relative max-w-4xl mx-auto h-96 sm:h-[500px] hidden md:block">
          {/* Center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full blur-2xl opacity-60 animate-pulse"></div>
              <div className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-accent to-primary rounded-full blur-xl opacity-80"></div>
              <div className="absolute inset-0 w-32 h-32 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full shadow-2xl"></div>
              </div>
            </div>
          </div>

          {/* Floating integration icons */}
          {integrations.map((integration, index) => (
            <div
              key={index}
              className={`absolute ${integration.position} animate-float hover:scale-110 transition-transform duration-300 cursor-pointer`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${integration.color} rounded-2xl shadow-xl flex items-center justify-center text-white font-bold hover:shadow-2xl transition-shadow duration-300`}>
                {integration.name.slice(0, 2)}
              </div>
              {/* Connection line */}
              <div className="absolute top-1/2 left-1/2 w-px h-20 bg-gradient-to-b from-primary-foreground/20 to-transparent -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
