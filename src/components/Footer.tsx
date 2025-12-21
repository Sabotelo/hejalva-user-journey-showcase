import { useLanguage } from "@/contexts/LanguageContext";
import MimerLogo from "@/components/MimerLogo";
import { Shield, Zap } from "lucide-react";

const Footer = () => {
  const { language } = useLanguage();

  const links = {
    developers: {
      label: language === 'sv' ? 'För utvecklare' : 'For Developers',
      href: '#developers',
    },
    sme: {
      label: language === 'sv' ? 'För småföretag' : 'For SMEs',
      href: '#sme',
    },
    ethics: {
      label: language === 'sv' ? 'Etisk AI' : 'Ethical AI Statement',
      href: '#ethics',
    },
    privacy: {
      label: language === 'sv' ? 'Integritetspolicy' : 'Privacy Policy',
      href: '#privacy',
    },
    terms: {
      label: language === 'sv' ? 'Användarvillkor' : 'Terms of Service',
      href: '#terms',
    },
  };

  return (
    <footer className="bg-primary-dark text-white py-16 border-t border-white/10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-primary-glow/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          {/* Powered by Mimer Technologies badge */}
          <div className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-sm">
            <Shield className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-white">
              {language === 'sv' ? 'Drivs av' : 'Powered by'}
            </span>
            <span className="text-sm font-semibold text-secondary">Mimer Technologies</span>
            <Zap className="h-4 w-4 text-gold animate-pulse" />
          </div>
          
          {/* Logo and tagline */}
          <div className="flex items-center gap-3 mb-6">
            <MimerLogo size={48} />
            <div className="text-left">
              <span className="text-xl font-bold block">Mimer Technologies</span>
              <span className="text-xs text-white/60">
                {language === 'sv' ? 'Svensk AI Innovation' : 'Swedish AI Innovation'}
              </span>
            </div>
          </div>
          
          <p className="text-white/70 text-sm mb-8 text-center max-w-lg">
            {language === 'sv' 
              ? 'Uråldrig visdom möter modern AI. Vi bygger framtidens röstassistenter för svenska småföretag.'
              : 'Ancient wisdom meets modern AI. Building the voice assistants of the future for Swedish SMEs.'}
          </p>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white/70">{language === 'sv' ? 'GDPR-kompatibel' : 'GDPR Compliant'}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs text-white/70">{language === 'sv' ? 'Svenska servrar' : 'Swedish Servers'}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span className="text-xs text-white/70">{language === 'sv' ? '99.9% Drifttid' : '99.9% Uptime'}</span>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 mb-8">
            <a 
              href={links.developers.href}
              className="text-white/70 hover:text-secondary transition-colors text-sm"
            >
              {links.developers.label}
            </a>
            <a 
              href={links.sme.href}
              className="text-white/70 hover:text-secondary transition-colors text-sm"
            >
              {links.sme.label}
            </a>
            <a 
              href={links.ethics.href}
              className="text-white/70 hover:text-secondary transition-colors text-sm"
            >
              {links.ethics.label}
            </a>
            <a 
              href={links.privacy.href}
              className="text-white/70 hover:text-secondary transition-colors text-sm"
            >
              {links.privacy.label}
            </a>
            <a 
              href={links.terms.href}
              className="text-white/70 hover:text-secondary transition-colors text-sm"
            >
              {links.terms.label}
            </a>
          </nav>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent mb-6" />

          {/* Copyright */}
          <p className="text-white/40 text-xs text-center">
            © {new Date().getFullYear()} Mimer Technologies AB. {language === 'sv' ? 'Alla rättigheter förbehållna.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;