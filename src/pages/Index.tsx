import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import BenefitsSection from "@/components/BenefitsSection";
import UseCasesSection from "@/components/UseCasesSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeatureCards />
      <BenefitsSection />
      <UseCasesSection />
      <IntegrationsSection />
      <PricingSection />
      <CTASection />
    </div>
  );
};

export default Index;
