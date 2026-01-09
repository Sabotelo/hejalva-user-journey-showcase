import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import FeatureCards from "@/components/FeatureCards";
import UseCasesSection from "@/components/UseCasesSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import LostRevenueCalculator from "@/components/LostRevenueCalculator";
import PricingSection from "@/components/PricingSection";
import PartnersSection from "@/components/PartnersSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <TrustSection />
      <FeatureCards />
      <LostRevenueCalculator />
      <UseCasesSection />
      <IntegrationsSection />
      <PricingSection />
      <PartnersSection />
      <Footer />
    </div>
  );
};

export default Index;
