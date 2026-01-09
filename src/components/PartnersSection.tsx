import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const PartnersSection = () => {
  const { language } = useLanguage();

  return (
    <section className="py-16 bg-primary border-t border-white/10">
      <div className="container mx-auto px-4">
        <ScrollAnimation className="text-center max-w-2xl mx-auto">
          <p className="text-sm text-white/60 mb-4">
            {language === 'sv' ? 'Möjliggjort av' : 'Powered by'}
          </p>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg 
              viewBox="0 0 100 100" 
              className="h-10 w-10"
              fill="none"
            >
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" className="text-white/20"/>
              <circle cx="50" cy="50" r="20" fill="currentColor" className="text-white"/>
            </svg>
            <span className="text-2xl font-bold text-white">ElevenLabs</span>
          </div>
          
          <p className="text-white/60 leading-relaxed">
            {language === 'sv' 
              ? 'Vi vill tacka ElevenLabs för deras generösa bidrag av tokens för testning och utveckling genom deras grant-program. Deras avancerade röst-AI-teknologi driver Alvas naturliga och engagerande konversationer.' 
              : 'We would like to thank ElevenLabs for their generous grant of tokens for testing and development. Their advanced voice AI technology powers Alva\'s natural and engaging conversations.'}
          </p>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default PartnersSection;
