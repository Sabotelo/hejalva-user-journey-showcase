import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import UseCasesSection from "@/components/UseCasesSection";
import LostRevenueCalculator from "@/components/LostRevenueCalculator";
import TryAlvaSection from "@/components/TryAlvaSection";
import PricingSection from "@/components/PricingSection";
import PartnersSection from "@/components/PartnersSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeatureCards />
      <LostRevenueCalculator />
      <TryAlvaSection />
      <UseCasesSection />
      <PricingSection />
      <PartnersSection />
      <Footer />
    </div>
  );
};

export default Index;
