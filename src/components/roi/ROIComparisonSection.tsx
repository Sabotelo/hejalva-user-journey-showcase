import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ROIComparisonSection = () => {
  const { t } = useLanguage();
  
  const comparisons = [
    {
      feature: t('roi.comparison.customerExp'),
      oldWay: t('roi.comparison.customerExpOld'),
      alvaWay: t('roi.comparison.customerExpNew')
    },
    {
      feature: t('roi.comparison.focus'),
      oldWay: t('roi.comparison.focusOld'),
      alvaWay: t('roi.comparison.focusNew')
    },
    {
      feature: t('roi.comparison.leadCapture'),
      oldWay: t('roi.comparison.leadCaptureOld'),
      alvaWay: t('roi.comparison.leadCaptureNew')
    },
    {
      feature: t('roi.comparison.data'),
      oldWay: t('roi.comparison.dataOld'),
      alvaWay: t('roi.comparison.dataNew')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-primary to-primary-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {t('roi.comparison.title')} <span className="text-secondary">{t('roi.comparison.titleHighlight')}</span>
            </h2>
            <p className="text-xl text-white/70">
              {t('roi.comparison.subtitle')}
            </p>
          </div>

          <div className="space-y-6">
            {comparisons.map((item, index) => (
              <Card 
                key={index}
                className="overflow-hidden animate-fade-in bg-white border-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="grid md:grid-cols-3 gap-6 p-6">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-primary">{item.feature}</h3>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <X className="h-4 w-4 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.oldWay}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-600">{item.alvaWay}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-8 p-8 bg-white border-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('roi.comparison.footer')} <strong className="text-green-600 text-xl">{t('roi.comparison.footerHighlight')}</strong> {t('roi.comparison.footerSuffix')}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ROIComparisonSection;
