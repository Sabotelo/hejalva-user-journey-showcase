import { useLanguage } from "@/contexts/LanguageContext";
import MimerLogo from "@/components/MimerLogo";

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
    <footer className="bg-primary-dark text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Logo and tagline */}
          <div className="flex items-center gap-3 mb-6">
            <MimerLogo size={40} />
            <span className="text-lg font-semibold">Mimer Technologies</span>
          </div>
          
          <p className="text-white/60 text-sm mb-8 text-center max-w-md">
            {language === 'sv' 
              ? 'Uråldrig visdom möter modern AI. Vi bygger framtidens röstassistenter.'
              : 'Ancient wisdom meets modern AI. Building the voice assistants of the future.'}
          </p>

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
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

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