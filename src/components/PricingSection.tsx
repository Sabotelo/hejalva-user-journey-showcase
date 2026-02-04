import { Phone, Calendar, User, Clock, MessageSquare } from "lucide-react";
import { MemphisButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollAnimation, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/ui/scroll-animation";
import { motion } from "framer-motion";

const PricingSection = () => {
  const { language } = useLanguage();
  
  const features = [
    {
      icon: Phone,
      text: language === 'sv' ? '24/7 samtalshantering med naturlig röst' : '24/7 call handling with natural voice'
    },
    {
      icon: Calendar,
      text: language === 'sv' ? 'Integrerar med bokningssystem och kalender' : 'Integrates with booking systems and calendar'
    },
    {
      icon: MessageSquare,
      text: language === 'sv' ? 'Samtalssammanfattningar via SMS och e-post' : 'Call summaries via SMS and email'
    },
    {
      icon: Clock,
      text: language === 'sv' ? 'Obegränsad användning' : 'Unlimited usage'
    },
    {
      icon: User,
      text: language === 'sv' ? 'Svarar på frågor om era tjänster och öppettider' : 'Answers questions about your services and hours'
    },
  ];

  const industries = language === 'sv' 
    ? ['Pizzerior', 'Restauranger', 'Frisörer', 'Bilverkstäder', 'VVS & El']
    : ['Pizzerias', 'Restaurants', 'Hair salons', 'Auto shops', 'Plumbers & HVAC'];

  return (
    <section className="py-24 bg-gradient-to-b from-primary-dark to-primary">
      <div className="container mx-auto px-4">
        <ScrollAnimation className="text-center mb-12" variant="bounceUp">
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
          <InteractiveCard hoverEffect="glow" className="max-w-2xl mx-auto">
            <Card className="p-10 border-0 shadow-elevated bg-white">
              <div className="text-center mb-8">
                <motion.div 
                  className="inline-block bg-secondary/20 text-secondary px-4 py-1 rounded-full text-sm font-medium mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  {language === 'sv' ? 'Allt du behöver' : 'Everything you need'}
                </motion.div>
                <motion.div 
                  className="flex items-baseline justify-center gap-1 mb-2"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <span className="text-5xl font-bold">3 500 kr</span>
                  <span className="text-muted-foreground">{language === 'sv' ? '/mån' : '/mo'}</span>
                </motion.div>
                <p className="text-muted-foreground">
                  {language === 'sv' 
                    ? 'Din AI-receptionist som alltid levererar fantastisk service' 
                    : 'Your AI receptionist that always delivers amazing service'}
                </p>
              </div>
              
              <StaggerContainer className="space-y-4 mb-8" staggerDelay={0.08}>
                {features.map((feature, index) => (
                  <StaggerItem key={index} variant="fadeLeft">
                    <motion.li 
                      className="flex items-center gap-4 list-none"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="h-10 w-10 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="h-5 w-5 text-secondary" />
                      </div>
                      <span className="text-foreground">{feature.text}</span>
                    </motion.li>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <div className="border-t border-border/50 pt-6 mb-8">
                <p className="text-sm text-muted-foreground text-center mb-3">
                  {language === 'sv' ? 'Perfekt för serviceföretag:' : 'Perfect for service businesses:'}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {industries.map((industry, index) => (
                    <motion.span 
                      key={index}
                      className="bg-muted/50 text-muted-foreground px-3 py-1 rounded-full text-sm"
                      whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--secondary) / 0.2)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      {industry}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <MemphisButton 
                variant="cta"
                size="lg"
                className="w-full"
                onClick={() => window.location.href = '/contact'}
              >
                {language === 'sv' ? 'Boka en demo' : 'Book a Demo'}
              </MemphisButton>
              
              <p className="text-center text-sm text-muted-foreground mt-4">
                {language === 'sv' 
                  ? '14 dagars gratis provperiod • Ingen bindningstid' 
                  : '14-day free trial • No commitment'}
              </p>
            </Card>
          </InteractiveCard>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default PricingSection;
