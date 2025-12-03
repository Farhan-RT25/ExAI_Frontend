import { Webhook } from "lucide-react";
import CTAButton from "@/components/ui/CTAButton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const CTA = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-background">
      {/* Space ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="relative rounded-2xl p-12 md:p-16 overflow-hidden border border-primary/20"
            style={{
              background:
                "linear-gradient(135deg, hsl(240 10% 6%) 0%, hsl(270 30% 15%) 50%, hsl(240 10% 6%) 100%)",
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-12 left-12 w-12 h-12 opacity-40">
              <svg viewBox="0 0 50 50" className="w-full h-full text-white">
                <path
                  d="M25 0 L27 23 L50 25 L27 27 L25 50 L23 27 L0 25 L23 23 Z"
                  fill="currentColor"
                  opacity="0.6"
                />
              </svg>
            </div>

            <div className="absolute bottom-16 left-8 w-2 h-2 bg-white/40 rounded-full" />

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

            <div className="absolute top-20 right-32 w-1.5 h-1.5 bg-white/40 rounded-full" />
            <div className="absolute top-16 right-24 w-1 h-1 bg-white/30 rounded-full" />

            <div className="relative z-10 text-center">
              <motion.div 
                className="inline-flex items-center justify-center p-4 rounded-xl bg-primary/20 backdrop-blur-sm mb-6 border border-primary/30"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Webhook className="w-10 h-10 text-primary" />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-foreground">
                Experience the Power of Nyx AI
              </h2>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Start with a Free Demo Today
              </p>

              <div className="flex justify-center">
                <Link to="/signup">
                  <CTAButton>Get Started</CTAButton>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
