import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import AIResumeBuilder from "@/components/AIResumeBuilder";
import AIMentor from "@/pages/AIMentor";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AIMentor />
      <Features />
      <AIResumeBuilder />
      <Pricing />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
