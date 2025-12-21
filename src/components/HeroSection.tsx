import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import mimerLogo from "@/assets/mimer-logo.png";
import { Phone, PhoneOff, TrendingDown } from "lucide-react";

const HeroSection = () => {
  const { language } = useLanguage();
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

  const painPoints = language === 'sv' 
    ? ['Missade samtal = Förlorade kunder', 'Kunder ringer konkurrenten', 'Du jobbar, inte svarar']
    : ['Missed calls = Lost customers', 'Customers call your competitor', 'You work, not answer phones'];

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
            className="mb-6 flex justify-center transition-all duration-300"
            style={{ 
              opacity: scrollOpacity,
              transform: `translateY(${(1 - scrollOpacity) * -30}px)`
            }}
          >
            <img 
              src={mimerLogo} 
              alt="Mimer Technologies" 
              className="h-20 md:h-24 w-auto"
            />
          </div>

          {/* Pain-focused pre-headline */}
          <div className="inline-flex items-center gap-2 bg-destructive/20 text-white/90 px-4 py-2 rounded-full mb-6 text-sm md:text-base animate-fade-in">
            <PhoneOff className="h-4 w-4" />
            <span>
              {language === 'sv' 
                ? '62% av samtal till småföretag förblir obesvarade' 
                : '62% of calls to small businesses go unanswered'}
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {language === 'sv' 
              ? 'Sluta förlora kunder till din röstbrevlåda' 
              : 'Stop Losing Customers to Your Voicemail'}
          </h1>
          
          <p className="mb-8 text-lg text-white/80 md:text-xl max-w-2xl mx-auto">
            {language === 'sv' 
              ? 'Alva svarar på alla dina samtal 24/7, bokar möten och svarar på kundfrågor – så att du kan fokusera på att driva din verksamhet.' 
              : 'Alva answers all your calls 24/7, books appointments, and answers customer questions – so you can focus on running your business.'}
          </p>

          {/* Pain points */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {painPoints.map((point, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white/80"
              >
                <TrendingDown className="h-4 w-4 text-destructive" />
                <span>{point}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6"
              onClick={() => window.location.href = '/demo'}
            >
              {language === 'sv' ? 'Boka en gratis demo' : 'Book a Free Demo'}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-white/50 text-white bg-white/10 hover:bg-white/20"
              onClick={() => window.location.href = '/roi'}
            >
              {language === 'sv' ? 'Se vad du förlorar' : 'See What You\'re Losing'}
            </Button>
          </div>
          
          <div className="text-sm text-white/60">
            {language === 'sv' 
              ? 'Perfekt för tandläkare, bilverkstäder, frisörer & servicebolag' 
              : 'Perfect for dentists, mechanics, salons & service businesses'}
          </div>
        </div>
      </div>

      {/* Call Alva card */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div className="bg-primary-dark/80 backdrop-blur-sm rounded-2xl p-6 text-white border border-white/10">
          <p className="text-sm font-medium mb-2">
            {language === 'sv' ? 'Prova Alva nu' : 'Try Alva now'}
          </p>
          <a 
            href="tel:+46737587867" 
            className="flex items-center gap-2 text-lg font-semibold hover:text-secondary transition-colors"
          >
            <Phone className="h-5 w-5" />
            +46 737 587 867
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;