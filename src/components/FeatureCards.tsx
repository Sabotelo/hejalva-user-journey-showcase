import { Phone, ArrowRight, CalendarCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const FeatureCards = () => {
  const { language } = useLanguage();
  
  const features = [
    {
      icon: Phone,
      title: language === 'sv' ? 'Svarar direkt' : 'Answers Instantly',
      description: language === 'sv' 
        ? 'Tar emot samtal och välkomnar era kunder samt ger snabba svar på frågor om öppettider och tjänster.' 
        : 'Receives calls and welcomes your customers, providing quick answers about hours and services.',
      gradient: 'from-secondary/20 to-primary-glow/10'
    },
    {
      icon: ArrowRight,
      title: language === 'sv' ? 'Kopplar rätt' : 'Routes Correctly',
      description: language === 'sv' 
        ? 'Mindre manuellt arbete, mer tid åt annat. Vid behov kopplar Alva samtalen till rätt kollega.' 
        : 'Less manual work, more time for other things. When needed, Alva routes calls to the right colleague.',
      gradient: 'from-primary-glow/20 to-secondary/10'
    },
    {
      icon: CalendarCheck,
      title: language === 'sv' ? 'Bokar möten' : 'Books Appointments',
      description: language === 'sv' 
        ? 'Genomför kunders bokningar och reservationer direkt i samtalet – smidigt, enkelt och helt automatiskt.' 
        : 'Handles customer bookings and reservations directly during the call – smooth, simple, and fully automated.',
      gradient: 'from-secondary/15 to-primary/10'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden p-8 border-0 bg-gradient-to-br ${feature.gradient} hover:shadow-elevated transition-all duration-300 group`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-secondary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="h-14 w-14 rounded-xl bg-gradient-mimer flex items-center justify-center mb-6 shadow-primary group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
