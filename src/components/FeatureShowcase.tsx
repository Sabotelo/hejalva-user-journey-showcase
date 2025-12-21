import { Card } from "@/components/ui/card";
import { 
  Phone, 
  Calendar, 
  Mail, 
  Star, 
  Clock, 
  CalendarCheck 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FeatureShowcase = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Phone,
      title: t('feature.lightning.title'),
      description: t('feature.lightning.desc')
    },
    {
      icon: CalendarCheck,
      title: t('feature.userCentric.title'),
      description: t('feature.userCentric.desc')
    },
    {
      icon: Mail,
      title: t('feature.analytics.title'),
      description: t('feature.analytics.desc')
    },
    {
      icon: Star,
      title: t('feature.security.title'),
      description: t('feature.security.desc')
    },
    {
      icon: Clock,
      title: t('feature.mobile.title'),
      description: t('feature.mobile.desc')
    },
    {
      icon: Calendar,
      title: t('feature.workflow.title'),
      description: t('feature.workflow.desc')
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {t('features.title')} <span className="text-gradient">{t('features.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="demo-card p-6 group hover:shadow-elevated transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-4">
                <div className="relative">
                  <div className="h-12 w-12 rounded-lg bg-gradient-mimer flex items-center justify-center shadow-primary group-hover:shadow-elevated group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-mimer opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;