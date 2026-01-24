import { TrendingUp, Clock, Users, MessageSquare, Brain, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollAnimation, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/ui/scroll-animation";

const BenefitsSection = () => {
  const { language } = useLanguage();
  
  const benefits = [
    {
      icon: TrendingUp,
      title: language === 'sv' ? 'Fånga varje lead' : 'Capture Every Lead',
      description: language === 'sv' 
        ? 'Varje missat samtal är en kund som ringer din konkurrent. Alva ser till att det aldrig händer.' 
        : 'Every missed call is a customer calling your competitor. Alva ensures that never happens.',
      stat: language === 'sv' ? 'Ökade affärsmöjligheter' : 'Increased opportunities'
    },
    {
      icon: Clock,
      title: language === 'sv' ? 'Spara tid varje dag' : 'Save Time Every Day',
      description: language === 'sv' 
        ? 'Sluta avbryta ditt arbete för att svara i telefon. Fokusera på det du gör bäst.' 
        : 'Stop interrupting your work to answer the phone. Focus on what you do best.',
      stat: language === 'sv' ? 'Minskad stress' : 'Reduced stress'
    },
    {
      icon: Users,
      title: language === 'sv' ? 'Nöjdare kunder' : 'Happier Customers',
      description: language === 'sv' 
        ? 'Ingen väntetid, alltid svar. Kunder älskar att alltid nå fram direkt.' 
        : 'No wait time, always answered. Customers love always getting through.',
      stat: language === 'sv' ? '24/7 tillgänglighet' : '24/7 availability'
    },
    {
      icon: MessageSquare,
      title: language === 'sv' ? 'Samtalssammanfattningar' : 'Call Summaries',
      description: language === 'sv' 
        ? 'Få sammanfattningar av varje samtal via SMS och e-post. Håll koll utan att behöva lyssna på röstmeddelanden.' 
        : 'Get summaries of every call via SMS and email. Stay informed without listening to voicemails.',
      stat: language === 'sv' ? 'SMS & e-post' : 'SMS & email'
    },
    {
      icon: Brain,
      title: language === 'sv' ? 'Tränad på ditt företag' : 'Trained on Your Business',
      description: language === 'sv' 
        ? 'Alva lär sig allt om dina tjänster, priser och processer. Som en riktig kollega.' 
        : 'Alva learns everything about your services, prices, and processes. Like a real colleague.',
      stat: language === 'sv' ? 'Personlig anpassning' : 'Personalized'
    },
    {
      icon: Shield,
      title: language === 'sv' ? 'Naturlig svensk röst' : 'Natural Swedish Voice',
      description: language === 'sv' 
        ? 'Varje kund möts av en varm, naturlig röst på svenska. Ditt företag får det intryck det förtjänar.' 
        : 'Every customer is greeted with a warm, natural Swedish voice. Your business gets the impression it deserves.',
      stat: language === 'sv' ? 'Mänsklig touch' : 'Human-like touch'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-primary-dark to-primary">
      <div className="container mx-auto px-4">
        <ScrollAnimation className="text-center mb-16" variant="bounceUp">
          <div className="inline-block bg-secondary/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
            {language === 'sv' ? 'Varför företag väljer Alva' : 'Why Businesses Choose Alva'}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            {language === 'sv' ? 'Sluta förlora pengar på missade samtal' : 'Stop Losing Money on Missed Calls'}
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {language === 'sv' 
              ? 'Varje samtal du missar kostar dig pengar. Alva ser till att det aldrig händer igen.' 
              : 'Every call you miss costs you money. Alva ensures that never happens again.'}
          </p>
        </ScrollAnimation>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
          {benefits.map((benefit, index) => (
            <StaggerItem key={index} variant="bounceUp">
              <InteractiveCard hoverEffect="bounce" className="h-full">
                <div 
                  className="group p-6 rounded-2xl bg-white hover:shadow-lg transition-all duration-300 border border-white/50 h-full"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-mimer flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {benefit.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        {benefit.description}
                      </p>
                      <div className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-3 py-1 rounded-full">
                        {benefit.stat}
                      </div>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default BenefitsSection;
