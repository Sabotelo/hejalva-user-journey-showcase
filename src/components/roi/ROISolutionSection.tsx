import { Card } from "@/components/ui/card";
import { Phone, Calendar, Mail, Star, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ROISolutionSection = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Phone,
      title: t('roi.solution.callCapture'),
      description: t('roi.solution.callCaptureDesc')
    },
    {
      icon: Calendar,
      title: t('roi.solution.booking'),
      description: t('roi.solution.bookingDesc')
    },
    {
      icon: Star,
      title: t('roi.solution.impression'),
      description: t('roi.solution.impressionDesc')
    },
    {
      icon: Mail,
      title: t('roi.solution.summaries'),
      description: t('roi.solution.summariesDesc')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-alva mb-4 animate-bounce-subtle shadow-primary">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('roi.solution.title')} <span className="text-gradient">{t('roi.solution.titleHighlight')}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('roi.solution.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="demo-card p-6 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-alva flex items-center justify-center shadow-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary group-hover:text-primary/80 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROISolutionSection;
