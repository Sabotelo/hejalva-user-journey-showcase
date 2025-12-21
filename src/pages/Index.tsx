import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TryAlvaSection from "@/components/TryAlvaSection";
import TrustSection from "@/components/TrustSection";
import FeatureCards from "@/components/FeatureCards";
import UseCasesSection from "@/components/UseCasesSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import PricingSection from "@/components/PricingSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <TryAlvaSection />
      <TrustSection />
      <FeatureCards />
      <UseCasesSection />
      <IntegrationsSection />
      <PricingSection />
      <PartnersSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
