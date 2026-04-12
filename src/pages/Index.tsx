import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AudioDemoSection from "@/components/AudioDemoSection";
import TryAlvaLive from "@/components/TryAlvaLive";
import HowItWorksSimple from "@/components/HowItWorksSimple";
import PricingReframed from "@/components/PricingReframed";
import SignupForm from "@/components/SignupForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AudioDemoSection />
      <TryAlvaLive />
      <HowItWorksSimple />
      <PricingReframed />
      <SignupForm />
      <Footer />
    </div>
  );
};

export default Index;
