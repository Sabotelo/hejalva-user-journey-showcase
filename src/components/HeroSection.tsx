import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import mimerLogo from "@/assets/mimer-logo.png";

const HeroSection = () => {
  const { t } = useLanguage();
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 100;
      const fadeEnd = 400;
      
      if (scrollY <= fadeStart) {
        setScrollOpacity(1);
      } else if (scrollY >= fadeEnd) {
        setScrollOpacity(0);
      } else {
        setScrollOpacity(1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-secondary/30 to-primary-glow/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary-glow/30 to-secondary/20 blur-3xl"></div>
      </div>

      {/* Large centered logo that fades on scroll */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
        style={{ opacity: scrollOpacity * 0.15 }}
      >
        <img 
          src={mimerLogo} 
          alt="Mimer Technologies" 
          className="w-[600px] md:w-[800px] lg:w-[1000px] max-w-[90vw] opacity-50 blur-sm"
        />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Logo */}
          <div 
            className="mb-8 flex justify-center transition-all duration-300"
            style={{ 
              opacity: scrollOpacity,
              transform: `translateY(${(1 - scrollOpacity) * -30}px)`
            }}
          >
            <img 
              src={mimerLogo} 
              alt="Mimer Technologies" 
              className="h-24 md:h-32 w-auto"
            />
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {t('hero.title')}
          </h1>
          
          <p className="mb-10 text-lg text-white/80 md:text-xl max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6"
              onClick={() => window.location.href = '/demo'}
            >
              {t('hero.startDemo')}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-white/50 text-white bg-white/10 hover:bg-white/20"
              onClick={() => window.location.href = '/roi'}
            >
              See the ROI
            </Button>
          </div>
          
          <div className="text-sm text-white/60">
            {t('hero.noSignup')}
          </div>
        </div>
      </div>

      {/* Call Alva card */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div className="bg-primary-dark/80 backdrop-blur-sm rounded-2xl p-6 text-white border border-white/10">
          <p className="text-sm font-medium mb-2">Try Alva now</p>
          <a 
            href="tel:+46737587867" 
            className="flex items-center gap-2 text-lg font-semibold hover:text-secondary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +46 737 587 867
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
