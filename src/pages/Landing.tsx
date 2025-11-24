import { Navbar } from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/landing/Footer";
import Faq from "@/components/landing/Faq";
import { SecurityCompliance } from "@/components/landing/SecurityCompliance";
import { CTA } from "@/components/landing/CTA";

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <SecurityCompliance />
      <Testimonials />
      <Faq />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;