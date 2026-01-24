import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, Menu, X } from "lucide-react";
import MimerLogo from "@/components/MimerLogo";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const navLinks = [
    { href: "/demo", label: t('nav.demo') },
    { href: "/how-it-works", label: language === 'sv' ? 'Hur det fungerar' : 'How It Works' },
    { href: "/contact", label: t('nav.contact') },
  ];

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
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
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

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`md:hidden ${isScrolled ? '' : 'text-white hover:bg-white/10'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/40">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
