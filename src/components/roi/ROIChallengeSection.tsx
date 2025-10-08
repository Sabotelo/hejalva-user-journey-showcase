import { Card } from "@/components/ui/card";
import { PhoneOff, TrendingDown, Clock, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ROIChallengeSection = () => {
  const { t } = useLanguage();
  
  const challenges = [
    {
      icon: TrendingDown,
      title: t('roi.challenge.lostRevenue'),
      description: t('roi.challenge.lostRevenueDesc')
    },
    {
      icon: AlertTriangle,
      title: t('roi.challenge.damagedRep'),
      description: t('roi.challenge.damagedRepDesc')
    },
    {
      icon: Clock,
      title: t('roi.challenge.interruptions'),
      description: t('roi.challenge.interruptionsDesc')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-accent/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-destructive/10 mb-4">
              <PhoneOff className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('roi.challenge.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('roi.challenge.intro')} <strong className="text-destructive">{t('roi.challenge.stat')}</strong>{t('roi.challenge.statSuffix')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {challenges.map((challenge, index) => (
              <Card 
                key={index}
                className="demo-card p-6 text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-lg bg-gradient-secondary flex items-center justify-center shadow-secondary mx-auto mb-4">
                  <challenge.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
                <p className="text-muted-foreground text-sm">{challenge.description}</p>
              </Card>
            ))}
          </div>

          <Card className="demo-card p-6 bg-accent/50 border-primary/20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-center text-muted-foreground leading-relaxed">
              {t('roi.challenge.footer')} <strong className="text-primary text-lg">{t('roi.challenge.footerHighlight')}</strong>
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ROIChallengeSection;
