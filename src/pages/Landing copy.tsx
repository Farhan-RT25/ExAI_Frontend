import { Navbar1 } from "@/components/layout/Navbar copy";
import { Hero } from "@/components/landing copy folder/Hero copy";
import { Features } from "@/components/landing copy folder/Features copy";
import { HowItWorks } from "@/components/landing copy folder/HowItWorks copy";
import { Testimonials } from "@/components/landing copy folder/Testimonials copy";
import { Footer } from "@/components/landing copy folder/Footer copy";

const LandingCopy = () => {
  return (
    <div className="relative min-h-screen overflow-hidden m-0 p-0">
      {/* Background image DIV removed from here */}

      {/* Foreground content */}
      <div className="relative z-10">
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

export default LandingCopy;