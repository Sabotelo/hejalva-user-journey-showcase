import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PainPointsSection from "@/components/PainPointsSection";
import FeatureCards from "@/components/FeatureCards";
import BenefitsSection from "@/components/BenefitsSection";
import UseCasesSection from "@/components/UseCasesSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import PricingSection from "@/components/PricingSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <PainPointsSection />
      <BenefitsSection />
      <UseCasesSection />
      <IntegrationsSection />
      <PricingSection />
      <PartnersSection />
      <CTASection />
    </div>
  );
};

export default Index;
