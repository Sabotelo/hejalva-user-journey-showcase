import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ROIConclusionSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-gradient-to-b from-primary-dark to-primary">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto p-8 md:p-12 text-center bg-white border-0 animate-fade-in">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-secondary to-primary-glow flex items-center justify-center shadow-elevated">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold">
                {t('roi.conclusion.title')} <span className="text-secondary">{t('roi.conclusion.titleHighlight')}</span>
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('roi.conclusion.subtitle')}
              </p>

              <p className="text-primary text-xl font-semibold max-w-2xl mx-auto">
                {t('roi.conclusion.cta')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-alva shadow-primary hover:shadow-elevated hover:scale-105 transition-all duration-300 text-lg px-8 py-3"
                onClick={() => window.location.href = '/#demo'}
              >
                {t('roi.conclusion.demoButton')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="text-lg px-8 py-3"
                onClick={() => window.location.href = '/contact'}
              >
                {t('roi.conclusion.contactButton')}
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                {t('roi.conclusion.freeTrial')}
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                {t('roi.conclusion.noCard')}
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                {t('roi.conclusion.setupMinutes')}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ROIConclusionSection;
