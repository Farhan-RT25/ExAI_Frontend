import { Webhook } from "lucide-react";
import CTAButton from "@/components/ui/CTAButton";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-2xl p-12 md:p-16 overflow-hidden border border-primary/20"
            style={{
              background:
                "linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 50%, #1a1a2e 100%)",
            }}
          >
            {/* Decorative elements */}
            {/* Star sparkle top-left */}
            <div className="absolute top-12 left-12 w-12 h-12 opacity-40">
              <svg viewBox="0 0 50 50" className="w-full h-full text-white">
                <path
                  d="M25 0 L27 23 L50 25 L27 27 L25 50 L23 27 L0 25 L23 23 Z"
                  fill="currentColor"
                  opacity="0.6"
                />
              </svg>
            </div>

            {/* Small dot bottom-left */}
            <div className="absolute bottom-16 left-8 w-2 h-2 bg-white/40 rounded-full" />

            {/* Curved blob bottom-left */}
            <div className="absolute bottom-0 left-0 w-32 h-32 opacity-30">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M0,100 Q30,70 50,80 T100,100 L0,100 Z"
                  fill="url(#blob-gradient)"
                />
                <defs>
                  <linearGradient
                    id="blob-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Squiggly line top-right */}
            <div className="absolute top-8 right-8 w-24 h-24 opacity-50">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full stroke-white"
                fill="none"
                strokeWidth="3"
              >
                <path
                  d="M10,50 Q20,20 40,30 T70,40 T90,20"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Small dots top-right */}
            <div className="absolute top-20 right-32 w-1.5 h-1.5 bg-white/40 rounded-full" />
            <div className="absolute top-16 right-24 w-1 h-1 bg-white/30 rounded-full" />

            {/* Purple glow effects */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-800/20 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center p-4 rounded-xl bg-primary/20 backdrop-blur-sm mb-6 border border-primary/30">
                <Webhook className="w-10 h-10 text-primary" />
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-white">
                Experience the Power of Nyx AI
              </h2>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Start with a Free Demo Today
              </p>

              {/* Button */}
              <div className="flex justify-center">
                <CTAButton>
                  <Link to="/signup">Get Started</Link>
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
