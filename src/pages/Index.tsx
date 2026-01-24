import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import UseCasesSection from "@/components/UseCasesSection";
import LostRevenueCalculator from "@/components/LostRevenueCalculator";
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
      <UseCasesSection />
      <PricingSection />
      <PartnersSection />
      <Footer />
    </div>
  );
};

export default Index;
