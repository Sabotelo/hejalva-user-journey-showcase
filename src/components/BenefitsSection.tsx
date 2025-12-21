import { TrendingUp, Clock, Users, DollarSign, Brain, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const BenefitsSection = () => {
  const { language } = useLanguage();
  
  const benefits = [
    {
      icon: TrendingUp,
      title: language === 'sv' ? 'Fånga varje lead' : 'Capture Every Lead',
      description: language === 'sv' 
        ? 'Varje missat samtal är en kund som ringer din konkurrent. Alva ser till att det aldrig händer.' 
        : 'Every missed call is a customer calling your competitor. Alva ensures that never happens.',
      stat: language === 'sv' ? '+40% fler bokningar' : '+40% more bookings'
    },
    {
      icon: Clock,
      title: language === 'sv' ? 'Spara tid varje dag' : 'Save Time Every Day',
      description: language === 'sv' 
        ? 'Sluta avbryta ditt arbete för att svara i telefon. Fokusera på det du gör bäst.' 
        : 'Stop interrupting your work to answer the phone. Focus on what you do best.',
      stat: language === 'sv' ? '2+ timmar/dag' : '2+ hours/day'
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
      icon: DollarSign,
      title: language === 'sv' ? 'Öka din omsättning' : 'Increase Your Revenue',
      description: language === 'sv' 
        ? 'Varje samtal är en möjlighet. Fler samtal besvarade = fler kunder = mer intäkter.' 
        : 'Every call is an opportunity. More calls answered = more customers = more revenue.',
      stat: language === 'sv' ? 'Upp till 200k kr/år' : 'Up to $20k/year'
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
      title: language === 'sv' ? 'Professionellt intryck' : 'Professional Impression',
      description: language === 'sv' 
        ? 'Varje kund möts av en varm, professionell röst. Ditt företag får det intryck det förtjänar.' 
        : 'Every customer is greeted with a warm, professional voice. Your business gets the impression it deserves.',
      stat: language === 'sv' ? 'Alltid perfekt service' : 'Always perfect service'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-accent/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-secondary/20 text-foreground text-sm font-semibold px-4 py-2 rounded-full mb-4">
            {language === 'sv' ? 'Varför företag väljer Alva' : 'Why Businesses Choose Alva'}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {language === 'sv' ? 'Sluta förlora pengar på missade samtal' : 'Stop Losing Money on Missed Calls'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'sv' 
              ? 'Varje samtal du missar kostar dig pengar. Alva ser till att det aldrig händer igen.' 
              : 'Every call you miss costs you money. Alva ensures that never happens again.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl bg-card hover:bg-gradient-to-br hover:from-card hover:to-accent/50 transition-all duration-300 border border-border/50 hover:border-secondary/30 hover:shadow-lg"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;