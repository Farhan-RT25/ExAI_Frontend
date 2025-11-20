import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/landing/Footer";
import LaserFlow from "@/components/LaserFlow";
import { Navbar1 } from "@/components/layout/Navbar copy";
import FloatingLines from "@/components/FloatingLines";

const Landing = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background effect */}
      <div style={{ width: "100%", height: "100vh", position: "absolute", zIndex: 10 }}>
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          // Array - specify line count per wave; Number - same count for all waves
          lineCount={[10, 15, 20]}
          // Array - specify line distance per wave; Number - same distance for all waves
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>

      {/* Foreground content */}
      <div className="relative">
        <Navbar1 />
        <Hero />
      </div>

      <Features />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Landing;
