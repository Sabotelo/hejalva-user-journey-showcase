import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Settings, Sparkles } from "lucide-react";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

const HowItWorksSimple = () => {
  const { language } = useLanguage();

  const steps = [
    {
      icon: Settings,
      number: "1",
      title: language === 'sv' ? 'Vi konfigurerar Alva' : 'We Configure Alva',
      description: language === 'sv'
        ? 'Berätta om ditt företag, tjänster och öppettider. Vi tränar Alva att bli din perfekta receptionist.'
        : 'Tell us about your business, services and hours. We train Alva to be your perfect receptionist.',
    },
    {
      icon: Phone,
      number: "2",
      title: language === 'sv' ? 'Koppla ditt nummer' : 'Connect Your Number',
      description: language === 'sv'
        ? 'Alva kopplas till ditt befintliga företagsnummer. Inga nya nummer behövs.'
        : 'Alva connects to your existing business number. No new numbers needed.',
    },
    {
      icon: Sparkles,
      number: "3",
      title: language === 'sv' ? 'Alva tar emot samtal' : 'Alva Takes Calls',
      description: language === 'sv'
        ? 'Alva svarar dygnet runt, bokar möten och skickar sammanfattningar. Du fokuserar på jobbet.'
        : 'Alva answers 24/7, books appointments and sends summaries. You focus on work.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-primary to-primary-dark">
      <div className="container mx-auto px-4">
        <ScrollAnimation className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {language === 'sv' ? 'Så enkelt fungerar det' : 'How It Works'}
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {language === 'sv'
              ? 'Tre steg. Ingen teknik krävs av dig.'
              : 'Three steps. No tech required from you.'}
          </p>
        </ScrollAnimation>

        <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto" staggerDelay={0.15}>
          {steps.map((step, index) => (
            <StaggerItem key={index} variant="bounceUp">
              <div className="text-center">
                <div className="relative mx-auto mb-6">
                  <div className="h-16 w-16 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto">
                    <step.icon className="h-8 w-8 text-secondary" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-secondary flex items-center justify-center text-white text-sm font-bold">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/60 leading-relaxed">{step.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default HowItWorksSimple;
