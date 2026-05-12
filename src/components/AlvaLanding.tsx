import HeroSection from "@/components/HeroSection";
import ProofSection from "@/components/ProofSection";
import TryAlvaLive from "@/components/TryAlvaLive";
import HowItWorksSimple from "@/components/HowItWorksSimple";
import IndustriesSection from "@/components/IndustriesSection";
import PricingReframed from "@/components/PricingReframed";
import SignupForm from "@/components/SignupForm";
import ChatBubble from "@/components/ChatBubble";

/**
 * AlvaLanding — self-contained Alva AI product page.
 *
 * Drop-in component for embedding the full Alva product story inside another
 * site (e.g. Mimer Technologies at `/alva`). Excludes the host site's own
 * Navigation and Footer — wrap with the host's chrome instead.
 *
 * Requirements in the host project:
 *   1. LanguageProvider from `@/contexts/LanguageContext` mounted above this tree
 *   2. Tailwind tokens: cream, sand, sand-dark, earth, moss, bark, stone, night, warm-white
 *   3. Fonts: DM Serif Display (display) + Instrument Sans (body)
 *   4. framer-motion installed
 *   5. Supabase client at `@/integrations/supabase/client` for the chat bubble lead capture
 */
const AlvaLanding = () => {
  return (
    <div className="bg-cream">
      <HeroSection />
      <ProofSection />
      <TryAlvaLive />
      <HowItWorksSimple />
      <IndustriesSection />
      <PricingReframed />
      <SignupForm />
      <ChatBubble />
    </div>
  );
};

export default AlvaLanding;