import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  const goToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const openChat = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent("open-chat-bubble"));
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => setLanguage(language === 'sv' ? 'en' : 'sv');

  const navLinks = [
    { id: "hur", href: "/#hur", label: language === 'sv' ? 'Hur det fungerar' : 'How it works' },
    { id: "pris", href: "/#pris", label: language === 'sv' ? 'Pris' : 'Pricing' },
    { id: null, href: "/about", label: language === 'sv' ? 'Om oss' : 'About' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-8 py-4 transition-all duration-300 ${
      isScrolled
        ? 'bg-cream/85 backdrop-blur-xl border-b border-sand-dark/30 shadow-sm'
        : 'bg-cream/85 backdrop-blur-xl'
    }`}>
      <a href="/" className="font-serif text-2xl text-earth hover:opacity-80 transition-opacity tracking-tight">
        Alva <span className="text-moss">AI</span>
      </a>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={link.id ? goToSection(link.id) : undefined}
            className="text-sm font-medium text-bark hover:text-earth transition-colors"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#kontakt"
          onClick={openChat}
          className="bg-earth text-cream px-5 py-2 rounded-full text-sm font-semibold hover:bg-night transition-colors"
        >
          {language === 'sv' ? 'Kom igång' : 'Get started'}
        </a>
        <button
          onClick={toggleLanguage}
          className="text-xs font-medium text-bark hover:text-earth transition-colors flex items-center gap-1"
        >
          <Globe className="h-3.5 w-3.5" />
          {language.toUpperCase()}
        </button>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center gap-3">
        <button onClick={toggleLanguage} className="text-xs font-medium text-bark flex items-center gap-1">
          <Globe className="h-3.5 w-3.5" />
          {language.toUpperCase()}
        </button>
        <a
          href="#kontakt"
          onClick={openChat}
          className="bg-earth text-cream px-4 py-2 rounded-full text-sm font-semibold hover:bg-night transition-colors"
        >
          {language === 'sv' ? 'Kom igång' : 'Get started'}
        </a>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-earth">
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-cream/95 backdrop-blur-xl border-b border-sand-dark/30 md:hidden">
          <div className="px-6 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={link.id ? goToSection(link.id) : () => setMobileMenuOpen(false)}
                className="text-sm font-medium text-bark hover:text-earth transition-colors py-2"
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
