import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone } from "lucide-react";

const HeroSection = () => {
  const { language } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-secondary/30 to-primary-glow/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary-glow/30 to-secondary/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-secondary/10 to-transparent blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl animate-fade-in">
            {language === 'sv' 
              ? 'Varje Missat Samtal är en Förlorad Kund.' 
              : 'Every Missed Call is a Lost Customer.'}
          </h1>
          
          <p className="mb-12 text-lg text-white/80 md:text-xl max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {language === 'sv' 
              ? 'Möt Alva. AI-receptionisten som svarar dygnet runt, talar flytande svenska och bokar möten medan du sover.' 
              : 'Meet Alva. The AI receptionist who answers 24/7, speaks fluent Swedish, and books appointments while you sleep.'}
          </p>

          {/* 3D Sound Wave Visualization */}
          <div className="relative h-48 md:h-64 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Dark pool base */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-16 bg-gradient-to-t from-black/60 to-transparent rounded-[100%] blur-sm"></div>
            
            {/* Sound wave bars */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-end justify-center gap-1 md:gap-2">
              {[...Array(20)].map((_, i) => {
                const height = Math.sin((i / 19) * Math.PI) * 100 + 20;
                const delay = i * 0.05;
                return (
                  <div
                    key={i}
                    className="w-2 md:w-3 rounded-full bg-gradient-to-t from-secondary via-secondary to-white/80 shadow-[0_0_20px_rgba(0,255,255,0.5)]"
                    style={{
                      height: `${height}px`,
                      animation: `soundWave 1.5s ease-in-out infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              })}
            </div>
            
            {/* Reflection */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-start justify-center gap-1 md:gap-2 opacity-30 scale-y-[-0.5] blur-[2px]">
              {[...Array(20)].map((_, i) => {
                const height = Math.sin((i / 19) * Math.PI) * 100 + 20;
                const delay = i * 0.05;
                return (
                  <div
                    key={i}
                    className="w-2 md:w-3 rounded-full bg-gradient-to-t from-secondary to-transparent"
                    style={{
                      height: `${height * 0.5}px`,
                      animation: `soundWave 1.5s ease-in-out infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button 
              size="lg" 
              className="bg-secondary text-primary-dark hover:bg-secondary/90 shadow-[0_0_30px_rgba(0,255,255,0.4)] hover:shadow-[0_0_40px_rgba(0,255,255,0.6)] transition-all duration-300 text-lg px-8 py-6 font-semibold"
              onClick={() => window.location.href = 'tel:+46737587867'}
            >
              <Phone className="mr-2 h-5 w-5" />
              {language === 'sv' ? 'Lyssna på Alva' : 'Listen to Alva'}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50"
              onClick={() => window.location.href = '/demo'}
            >
              {language === 'sv' ? 'Få tidig tillgång' : 'Get Early Access'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;