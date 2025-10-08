import { Card } from "@/components/ui/card";
import { Calculator, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ROIOpportunityCostSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('roi.opportunity.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('roi.opportunity.subtitle')}
            </p>
          </div>

          <Card className="demo-card p-8 md:p-12 bg-gradient-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-8">
              <p className="text-center text-xl text-muted-foreground">
                {t('roi.opportunity.scenario')}
              </p>

              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">4</div>
                  <p className="text-sm text-muted-foreground">{t('roi.opportunity.missedPerDay')}</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">84</div>
                  <p className="text-sm text-muted-foreground">{t('roi.opportunity.perMonth')}</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">5%</div>
                  <p className="text-sm text-muted-foreground">{t('roi.opportunity.conversionRate')}</p>
                </div>
              </div>

              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-4" />
                <p className="text-lg text-muted-foreground mb-6">
                  {t('roi.opportunity.impact')}
                </p>
              </div>
                
              <div className="text-center p-8 rounded-lg bg-gradient-alva relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 animate-pulse-slow"></div>
                <p className="relative text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
                  144,000 SEK
                </p>
                <p className="relative text-white/90 text-lg mt-2">{t('roi.opportunity.additionalRevenue')}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ROIOpportunityCostSection;
