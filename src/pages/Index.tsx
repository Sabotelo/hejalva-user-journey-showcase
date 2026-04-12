import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProofSection from "@/components/ProofSection";
import TryAlvaLive from "@/components/TryAlvaLive";
import HowItWorksSimple from "@/components/HowItWorksSimple";
import IndustriesSection from "@/components/IndustriesSection";
import PricingReframed from "@/components/PricingReframed";
import SignupForm from "@/components/SignupForm";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { language } = useLanguage();
  usePageMeta(language);
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
      <ChatBubble />
    </div>
  );
};

export default Index;
