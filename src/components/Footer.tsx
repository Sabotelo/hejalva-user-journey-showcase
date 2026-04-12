import { useLanguage } from "@/contexts/LanguageContext";
import MimerLogo from "@/components/MimerLogo";
import { Shield } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-primary-dark text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Logo and tagline */}
          <ScrollAnimation>
            <div className="flex items-center gap-3 mb-4">
              <MimerLogo size={36} />
              <div className="text-left">
                <span className="text-lg font-bold block">Mimer Technologies</span>
                <span className="text-xs text-white/50">
                  {language === 'sv' ? 'Svensk AI Innovation' : 'Swedish AI Innovation'}
                </span>
              </div>
            </div>
          </ScrollAnimation>

          {/* GDPR badge */}
          <ScrollAnimation delay={0.1}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white/60">
                {language === 'sv' ? 'GDPR-kompatibel' : 'GDPR Compliant'}
              </span>
            </div>
          </ScrollAnimation>

          {/* Links */}
          <ScrollAnimation delay={0.15}>
            <nav className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
              <a href="/about" className="text-white/60 hover:text-secondary transition-colors">
                {language === 'sv' ? 'Om oss' : 'About'}
              </a>
              <a href="/terms" className="text-white/60 hover:text-secondary transition-colors">
                {language === 'sv' ? 'Villkor & Integritet' : 'Terms & Privacy'}
              </a>
            </nav>
          </ScrollAnimation>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

          {/* ElevenLabs small logo */}
          <ScrollAnimation delay={0.2}>
            <div className="flex items-center gap-2 mb-4 text-white/30">
              <span className="text-xs">{language === 'sv' ? 'Röst-AI av' : 'Voice AI by'}</span>
              <svg viewBox="0 0 100 100" className="h-4 w-4" fill="none">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" />
                <circle cx="50" cy="50" r="20" fill="currentColor" />
              </svg>
              <span className="text-xs font-medium">ElevenLabs</span>
            </div>
          </ScrollAnimation>

          {/* Copyright */}
          <p className="text-white/30 text-xs text-center">
            © {new Date().getFullYear()} Mimer Technologies AB. {language === 'sv' ? 'Alla rättigheter förbehållna.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
