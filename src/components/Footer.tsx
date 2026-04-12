import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="px-6 py-10 border-t border-sand-dark bg-sand">
      <div className="max-w-[960px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="font-serif text-xl text-earth">Alva AI</div>
            <div className="text-xs text-stone">av Mimer Technologies AB</div>
          </div>

          {/* Right */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex gap-5">
              <a href="/about" className="text-xs text-bark hover:text-earth transition-colors">
                {language === 'sv' ? 'Om oss' : 'About'}
              </a>
              <a href="/terms" className="text-xs text-bark hover:text-earth transition-colors">
                {language === 'sv' ? 'Villkor' : 'Terms'}
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-[0.7rem] text-stone md:pl-5 md:border-l md:border-sand-dark">
              {language === 'sv' ? 'Röst-AI av' : 'Voice AI by'} ElevenLabs
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 pt-5 border-t border-sand-dark text-xs text-stone">
          © {new Date().getFullYear()} Mimer Technologies AB. {language === 'sv' ? 'Alla rättigheter förbehållna. GDPR-kompatibel.' : 'All rights reserved. GDPR compliant.'}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
