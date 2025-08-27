import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MeetingScheduler from "@/components/MeetingScheduler";

const CTASection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <Card className="demo-card max-w-4xl mx-auto p-8 md:p-12 text-center bg-gradient-card border-2 border-primary/10">
          <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-alva flex items-center justify-center shadow-elevated animate-bounce-subtle">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
                
                <h2 className="text-3xl md:text-5xl font-bold">
                  {t('cta.title')}{" "}
                  <span className="text-gradient">{t('cta.titleHighlight')}</span>
                </h2>
                
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {t('cta.subtitle')}
                </p>
            </div>
            
              <div className="flex flex-col sm:flex-row gap-4 justify-center">    
                <MeetingScheduler />
            </div>
              
              <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {t('cta.freeTrial')}
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  {t('cta.noCard')}
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  {t('cta.setupMinutes')}
                </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;