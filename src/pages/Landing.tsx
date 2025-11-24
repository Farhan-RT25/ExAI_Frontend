import { Navbar } from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/landing/Footer";
import { Navbar1 } from "@/components/layout/Navbar copy";
import Faq from "@/components/landing/Faq";

const Landing = () => {
  return (
    <div className="relative min-h-screen">
      {/* Foreground content */}
      <div className="relative">
        <Navbar1 />
        <Hero />
      </div>
      
      <Features />
      <HowItWorks />
      <Testimonials />
      <Faq />
      <Footer />
    </div>
  );
};

export default Landing;