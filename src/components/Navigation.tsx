import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'sv' ? 'en' : 'sv');
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/5b8a0a00-5db6-4567-9a99-84d428737d59.png" 
            alt="Alva Logo" 
            className="h-8 w-8 object-contain"
          />
          <span className="text-xl font-bold text-gradient">alva</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="#demo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.demo')}
          </a>
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.features')}
          </a>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.pricing')}
          </a>
          <a href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.contact')}
          </a>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className="text-xs"
          >
            <Globe className="h-4 w-4 mr-1" />
            {language.toUpperCase()}
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => window.open('https://signin.hejalva.com', '_blank')}
          >
            {t('nav.signIn')}
          </Button>
          <Button 
            size="sm" 
            className="bg-gradient-alva shadow-primary hover:shadow-elevated transition-all duration-300"
            onClick={() => window.open('https://app.hejalva.com', '_blank')}
          >
            {t('nav.getStarted')}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;