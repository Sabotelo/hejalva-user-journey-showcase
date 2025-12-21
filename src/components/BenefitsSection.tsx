import { Clock, Users, Globe, MessageSquare, Sparkles, Headphones } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const BenefitsSection = () => {
  const { language } = useLanguage();
  
  const benefits = [
    {
      icon: Clock,
      title: language === 'sv' ? 'Tillgänglig 24/7' : 'Available 24/7',
      description: language === 'sv' 
        ? 'Alltid där för dina kunder – även utanför era öppettider. Service som jobbar dygnet runt.' 
        : 'Always there for your customers – even outside business hours. Service that works around the clock.',
    },
    {
      icon: Users,
      title: language === 'sv' ? 'Flera samtal samtidigt' : 'Multiple Calls at Once',
      description: language === 'sv' 
        ? 'Ingen väntetid – varje samtal besvaras direkt, oavsett hur många som ringer.' 
        : 'No waiting time – every call is answered immediately, no matter how many are calling.',
    },
    {
      icon: Globe,
      title: language === 'sv' ? 'Flerspråkig' : 'Multilingual',
      description: language === 'sv' 
        ? 'Tillgänglig på flera språk, alltid anpassad för att skapa en naturlig kontakt.' 
        : 'Available in multiple languages, always adapted to create natural connection.',
    },
    {
      icon: MessageSquare,
      title: language === 'sv' ? 'Mer än bara prat' : 'More Than Just Talk',
      description: language === 'sv' 
        ? 'Inte bara dialog – bokar möten och hanterar reservationer automatiskt.' 
        : 'Not just dialogue – books appointments and handles reservations automatically.',
    },
    {
      icon: Sparkles,
      title: language === 'sv' ? 'Mänsklig touch' : 'Human Touch',
      description: language === 'sv' 
        ? 'Anpassa Alva efter era behov så att samtalen blir personliga och engagerande.' 
        : 'Customize Alva to your needs so conversations feel personal and engaging.',
    },
    {
      icon: Headphones,
      title: language === 'sv' ? 'Professionellt intryck' : 'Professional Impression',
      description: language === 'sv' 
        ? 'Hälsa varje kund med en tydlig, artig röst som speglar kvaliteten på din verksamhet.' 
        : 'Greet every customer with a clear, polite voice that reflects your business quality.',
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-accent/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {language === 'sv' ? 'Service som aldrig sover' : 'Service That Never Sleeps'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'sv' 
              ? 'Alva är din virtuella kollega som alltid är redo att hjälpa dina kunder.' 
              : 'Alva is your virtual colleague who is always ready to help your customers.'}
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
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
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
