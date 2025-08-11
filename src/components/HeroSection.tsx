import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Animated background elements - rose gold theme */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-alva opacity-20 blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-secondary opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 h-60 w-60 rounded-full bg-gradient-primary opacity-10 blur-2xl animate-pulse-slow"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            {t('hero.title').split('interaktiva demos').length > 1 ? (
              <>
                {t('hero.title').split('interaktiva demos')[0]}
                <span className="text-gradient">interaktiva demos</span>
              </>
            ) : (
              <>
                {t('hero.title').split('Interactive Demos')[0]}
                <span className="text-gradient">Interactive Demos</span>
              </>
            )}
          </h1>
          
          <p className="mb-8 text-lg text-muted-foreground md:text-xl lg:text-2xl max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-alva shadow-primary hover:shadow-elevated hover:scale-105 transition-all duration-300 text-lg px-8 py-3"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.startDemo')}
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group text-lg px-8 py-3 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              onClick={() => window.open('https://preview.hejalva.com', '_blank')}
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              {t('hero.watchPreview')}
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {t('hero.noSignup')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;