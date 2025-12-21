import { Card } from "@/components/ui/card";
import { Calculator, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ROIOpportunityCostSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-gradient-to-b from-primary to-primary-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary/20 mb-4">
              <Calculator className="h-8 w-8 text-secondary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {t('roi.opportunity.title')}
            </h2>
            <p className="text-xl text-white/70">
              {t('roi.opportunity.subtitle')}
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-white border-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wide text-primary font-semibold">{t('roi.opportunity.assumption')}</p>
                  <p>{t('roi.opportunity.assumptionText')} <span className="font-bold text-foreground text-2xl">3,000 SEK</span></p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wide text-primary font-semibold">{t('roi.opportunity.missedCalls')}</p>
                  <p>{t('roi.opportunity.missedCallsText')} <span className="font-bold text-foreground text-2xl">4 {t('roi.opportunity.callsPerDay')}</span></p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <p className="font-semibold text-foreground">
                    <span className="text-primary">4 × 21 {t('roi.opportunity.workdays')}</span> <strong className="text-lg">{t('roi.opportunity.monthlyOpportunities')}</strong>
                  </p>
                </div>
                
                <p className="text-center text-lg mb-6 text-muted-foreground">
                  {t('roi.opportunity.conversion')} <strong className="text-green-600 text-xl">5%</strong> {t('roi.opportunity.conversionSuffix')}
                </p>
                
                <div className="text-center p-8 rounded-lg bg-gradient-alva relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 animate-pulse-slow"></div>
                  <p className="relative text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
                    144,000 SEK
                  </p>
                  <p className="relative text-white/90 text-lg mt-2">{t('roi.opportunity.annualRevenue')}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ROIOpportunityCostSection;
