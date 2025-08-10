import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import InteractiveDemo from "@/components/InteractiveDemo";
import FeatureShowcase from "@/components/FeatureShowcase";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <InteractiveDemo />
      <FeatureShowcase />
      <CTASection />
    </div>
  );
};

export default Index;
