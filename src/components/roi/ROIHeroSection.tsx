import MimerLogo from "@/components/MimerLogo";
import { useLanguage } from "@/contexts/LanguageContext";

const ROIHeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-secondary/30 to-primary-glow/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-primary-glow/30 to-secondary/20 blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center pt-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex justify-center">
            <MimerLogo size={80} className="animate-fade-in" />
          </div>
          
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl animate-fade-in">
            {t('roi.hero.title')} <span className="text-secondary">{t('roi.hero.titleHighlight')}</span>
          </h1>
          
          <p className="text-xl text-white/80 md:text-2xl max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t('roi.hero.subtitle')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ROIHeroSection;
