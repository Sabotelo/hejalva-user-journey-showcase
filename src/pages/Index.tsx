import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProofSection from "@/components/ProofSection";
import TryAlvaLive from "@/components/TryAlvaLive";
import HowItWorksSimple from "@/components/HowItWorksSimple";
import IndustriesSection from "@/components/IndustriesSection";
import PricingReframed from "@/components/PricingReframed";
import SignupForm from "@/components/SignupForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <HeroSection />
      <ProofSection />
      <TryAlvaLive />
      <HowItWorksSimple />
      <IndustriesSection />
      <PricingReframed />
      <SignupForm />
      <Footer />
    </div>
  );
};

export default Index;
