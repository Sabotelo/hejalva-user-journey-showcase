import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import MimerLogo from "@/components/MimerLogo";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'sv' ? 'en' : 'sv');
  };

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
          <MimerLogo size={40} />
        </a>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="/demo" className={`text-sm font-medium transition-colors ${
            isScrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/80 hover:text-white'
          }`}>
            {t('nav.demo')}
          </a>
          <a href="/how-it-works" className={`text-sm font-medium transition-colors ${
            isScrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/80 hover:text-white'
          }`}>
            {language === 'sv' ? 'Hur det fungerar' : 'How It Works'}
          </a>
          <a href="/contact" className={`text-sm font-medium transition-colors ${
            isScrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/80 hover:text-white'
          }`}>
            {t('nav.contact')}
          </a>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className={`text-xs ${isScrolled ? '' : 'text-white hover:bg-white/10'}`}
          >
            <Globe className="h-4 w-4 mr-1" />
            {language.toUpperCase()}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
