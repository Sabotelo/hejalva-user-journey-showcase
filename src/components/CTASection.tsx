import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check, Phone, Clock, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CTASection = () => {
  const { language } = useLanguage();
  
  const benefits = [
    {
      icon: Phone,
      text: language === 'sv' ? 'Svarar på alla samtal 24/7' : 'Answers all calls 24/7'
    },
    {
      icon: Calendar,
      text: language === 'sv' ? 'Bokar möten automatiskt' : 'Books appointments automatically'
    },
    {
      icon: Clock,
      text: language === 'sv' ? 'Kom igång på minuter' : 'Get started in minutes'
    }
  ];

  const urgencyText = language === 'sv' 
    ? 'Varje minut du väntar kan kosta dig en kund' 
    : 'Every minute you wait could cost you a customer';

  return (
    <section id="contact-cta" className="py-24 bg-gradient-to-br from-primary via-primary-dark to-primary">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto p-10 md:p-14 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="text-center text-white">
            {/* Urgency badge */}
            <div className="inline-flex items-center gap-2 bg-destructive/30 text-white px-4 py-2 rounded-full mb-6 text-sm animate-pulse">
              <span>⚡</span>
              <span>{urgencyText}</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {language === 'sv' 
                ? 'Sluta förlora kunder idag' 
                : 'Stop Losing Customers Today'}
            </h2>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
              {language === 'sv' 
                ? 'Boka en kostnadsfri demo och se hur Alva kan hjälpa ditt företag växa genom att aldrig missa ett samtal igen.' 
                : 'Book a free demo and see how Alva can help your business grow by never missing a call again.'}
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2"
                >
                  <benefit.icon className="h-4 w-4 text-secondary" />
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-7 shadow-lg hover:shadow-xl transition-all"
                onClick={() => window.location.href = '/demo'}
              >
                {language === 'sv' ? 'Boka gratis demo' : 'Book Free Demo'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-lg px-10 py-7"
                onClick={() => window.location.href = '/demo#try-alva'}
              >
                <Phone className="mr-2 h-5 w-5" />
                {language === 'sv' ? 'Ring Alva nu' : 'Call Alva Now'}
              </Button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-secondary" />
                <span>{language === 'sv' ? 'Ingen bindningstid' : 'No commitment'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-secondary" />
                <span>{language === 'sv' ? 'Installation på minuter' : 'Setup in minutes'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-secondary" />
                <span>{language === 'sv' ? 'Svenskt företag' : 'Swedish company'}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;