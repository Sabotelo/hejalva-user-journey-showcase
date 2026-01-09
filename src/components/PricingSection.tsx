import { Phone, Calendar, User, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

const PricingSection = () => {
  const { language } = useLanguage();
  
  const features = [
    {
      icon: Phone,
      text: language === 'sv' ? '24/7 samtalshantering med mänsklig touch' : '24/7 call handling with human touch'
    },
    {
      icon: Calendar,
      text: language === 'sv' ? 'Automatisk mötesbokning synkad med din kalender' : 'Automatic appointment booking synced with your calendar'
    },
    {
      icon: User,
      text: language === 'sv' ? 'Personligt konto med samtalsdata och insikter' : 'Personal account with call data and insights'
    },
    {
      icon: Clock,
      text: language === 'sv' ? '500 samtalsminuter ingår' : '500 call minutes included'
    },
    {
      icon: MessageSquare,
      text: language === 'sv' ? 'Svarar på frågor om era tjänster och öppettider' : 'Answers questions about your services and hours'
    },
  ];

  const industries = language === 'sv' 
    ? ['Bilverkstäder', 'Restauranger', 'Frisörer', 'Tandläkare', 'Butiker']
    : ['Auto shops', 'Restaurants', 'Hair salons', 'Dental clinics', 'Retail stores'];

  return (
    <section className="py-24 bg-gradient-to-b from-primary-dark to-primary">
      <div className="container mx-auto px-4">
        <ScrollAnimation className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            {language === 'sv' ? 'En enkel plan för din verksamhet' : 'One Simple Plan for Your Business'}
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {language === 'sv' 
              ? 'Alva tränas specifikt för att bli som en kollega-receptionist för just din verksamhet.' 
              : 'Alva is trained specifically to become a co-worker receptionist for your business.'}
          </p>
        </ScrollAnimation>

        <ScrollAnimation variant="scale" delay={0.2}>
          <Card className="max-w-2xl mx-auto p-10 border-0 shadow-elevated bg-white">
            <div className="text-center mb-8">
              <div className="inline-block bg-secondary/20 text-secondary px-4 py-1 rounded-full text-sm font-medium mb-4">
                {language === 'sv' ? 'Allt du behöver' : 'Everything you need'}
              </div>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-5xl font-bold">2 999 kr</span>
                <span className="text-muted-foreground">{language === 'sv' ? '/mån' : '/mo'}</span>
              </div>
              <p className="text-muted-foreground">
                {language === 'sv' 
                  ? 'Din AI-receptionist som alltid levererar fantastisk service' 
                  : 'Your AI receptionist that always delivers amazing service'}
              </p>
            </div>
            
            <StaggerContainer className="space-y-4 mb-8" staggerDelay={0.08}>
              {features.map((feature, index) => (
                <StaggerItem key={index} variant="fadeLeft">
                  <li className="flex items-center gap-4 list-none">
                    <div className="h-10 w-10 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-secondary" />
                    </div>
                    <span className="text-foreground">{feature.text}</span>
                  </li>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="border-t border-border/50 pt-6 mb-8">
              <p className="text-sm text-muted-foreground text-center mb-3">
                {language === 'sv' ? 'Perfekt för serviceföretag:' : 'Perfect for service businesses:'}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {industries.map((industry, index) => (
                  <span 
                    key={index}
                    className="bg-muted/50 text-muted-foreground px-3 py-1 rounded-full text-sm"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
            
            <Button 
              size="lg"
              className="w-full bg-gradient-mimer hover:opacity-90 text-lg py-6"
              onClick={() => window.location.href = '/demo'}
            >
              {language === 'sv' ? 'Boka en demo' : 'Book a Demo'}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground mt-4">
              {language === 'sv' 
                ? '14 dagars gratis provperiod • Ingen bindningstid' 
                : '14-day free trial • No commitment'}
            </p>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default PricingSection;
