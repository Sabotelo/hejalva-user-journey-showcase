import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

const HowItWorksSimple = () => {
  const { language } = useLanguage();

  const steps = language === 'sv' ? [
    { num: '1', title: 'Kunden ringer', desc: 'En kund ringer din företagslinje. Alva svarar direkt — oavsett tid på dygnet.' },
    { num: '2', title: 'Alva hanterar samtalet', desc: 'Alva lyssnar, förstår vad kunden vill, och föreslår en tid utifrån ditt schema.' },
    { num: '3', title: 'Du godkänner', desc: 'Du får en sammanfattning. Klicka godkänn eller omboka. Du har alltid kontrollen.' },
  ] : [
    { num: '1', title: 'Customer calls', desc: 'A customer calls your business line. Alva answers immediately — regardless of time.' },
    { num: '2', title: 'Alva handles the call', desc: 'Alva listens, understands what the customer wants, and suggests a time based on your schedule.' },
    { num: '3', title: 'You approve', desc: 'You get a summary. Click approve or reschedule. You always have control.' },
  ];

  return (
    <section id="hur" className="py-20 px-6 bg-sand">
      <ScrollAnimation className="text-center mb-14">
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-night mb-3">
          {language === 'sv' ? 'Tre steg. Noll krångel.' : 'Three steps. Zero hassle.'}
        </h2>
        <p className="text-bark text-lg max-w-[500px] mx-auto">
          {language === 'sv'
            ? 'Från inkommande samtal till godkänd bokning på sekunder.'
            : 'From incoming call to approved booking in seconds.'}
        </p>
      </ScrollAnimation>

      <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-[960px] mx-auto" staggerDelay={0.15}>
        {steps.map((step, i) => (
          <StaggerItem key={i} variant="fadeUp">
            <div className="text-center px-4 py-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-stone bg-cream font-serif text-xl text-earth mb-5">
                {step.num}
              </div>
              <h3 className="font-serif text-xl text-night mb-3">{step.title}</h3>
              <p className="text-sm text-bark leading-relaxed">{step.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
};

export default HowItWorksSimple;
