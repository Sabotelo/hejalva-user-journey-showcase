import { Phone, Calendar, MessageCircle, Clock, UserCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const FeatureCards = () => {
  const { language } = useLanguage();
  
  const features = [
    {
      icon: Phone,
      title: language === 'sv' ? 'Svarar på varje samtal' : 'Answers Every Call',
      description: language === 'sv' 
        ? 'Aldrig mer missade samtal. Alva svarar omedelbart, dygnet runt – även på helger och kvällar.' 
        : 'No more missed calls. Alva answers immediately, 24/7 – even on weekends and evenings.',
      highlight: language === 'sv' ? '100% svarfrekvens' : '100% answer rate',
      gradient: 'from-secondary/20 to-primary-glow/10'
    },
    {
      icon: Calendar,
      title: language === 'sv' ? 'Bokar möten automatiskt' : 'Books Appointments Automatically',
      description: language === 'sv' 
        ? 'Alva kollar din kalender och bokar in kunder direkt. Bekräftelser skickas automatiskt.' 
        : 'Alva checks your calendar and books customers directly. Confirmations sent automatically.',
      highlight: language === 'sv' ? 'Synkar med din kalender' : 'Syncs with your calendar',
      gradient: 'from-primary-glow/20 to-secondary/10'
    },
    {
      icon: MessageCircle,
      title: language === 'sv' ? 'Svarar på kundfrågor' : 'Answers Customer Questions',
      description: language === 'sv' 
        ? 'Öppettider, priser, tjänster – Alva vet allt om ditt företag och svarar professionellt.' 
        : 'Hours, prices, services – Alva knows everything about your business and answers professionally.',
      highlight: language === 'sv' ? 'Tränad på ditt företag' : 'Trained on your business',
      gradient: 'from-secondary/15 to-primary/10'
    }
  ];

  const additionalBenefits = [
    {
      icon: Clock,
      text: language === 'sv' ? 'Tillgänglig 24/7/365' : 'Available 24/7/365'
    },
    {
      icon: UserCheck,
      text: language === 'sv' ? 'Mänsklig touch' : 'Human-like touch'
    },
    {
      icon: Sparkles,
      text: language === 'sv' ? 'Fantastisk service alltid' : 'Amazing service always'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'sv' 
              ? 'Alva blir din virtuella receptionist' 
              : 'Alva Becomes Your Virtual Receptionist'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'sv' 
              ? 'Som en kollega som alltid är tillgänglig, aldrig blir sjuk och ger fantastisk service varje gång.' 
              : 'Like a colleague who\'s always available, never gets sick, and delivers amazing service every time.'}
          </p>
        </div>

        {/* Main Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
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
                
                <div className="inline-block bg-secondary/20 text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {feature.highlight}
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

        {/* Additional Benefits Bar */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {additionalBenefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-muted-foreground">
              <benefit.icon className="h-5 w-5 text-secondary" />
              <span className="font-medium">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;