import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ROIIntroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-gradient-to-b from-primary to-primary-dark">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto p-8 md:p-12 animate-fade-in bg-white border-0">
          <div className="flex items-start gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-gradient-alva flex items-center justify-center shadow-primary flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t('roi.intro.title')}
              </h2>
            </div>
          </div>
          
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              {t('roi.intro.p1')}
            </p>
            <p>
              {t('roi.intro.p2')}
            </p>
            <p className="font-semibold text-foreground">
              {t('roi.intro.p3')}
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ROIIntroSection;
