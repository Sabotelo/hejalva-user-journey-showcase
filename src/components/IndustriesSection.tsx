import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

const IndustriesSection = () => {
  const { language } = useLanguage();

  const industries = language === 'sv' ? [
    { title: 'Frisörer & Salonger', quote: '"Har ni tid för färgning på fredag?"' },
    { title: 'Bilverkstäder', quote: '"Vad kostar ett oljebyte för en Volvo V70?"' },
    { title: 'Tandläkare & Vård', quote: '"Jag vill boka en undersökning nästa vecka"' },
    { title: 'Restauranger & Caféer', quote: '"Kan vi boka bord för 6 personer kl 19?"' },
    { title: 'Hantverkare & VVS', quote: '"Kan ni komma och titta på mitt element?"' },
    { title: 'Småföretag & Konsulter', quote: '"Jag vill boka ett möte för att diskutera mitt projekt"' },
  ] : [
    { title: 'Hairdressers & Salons', quote: '"Do you have time for coloring on Friday?"' },
    { title: 'Auto Workshops', quote: '"How much for an oil change on a Volvo V70?"' },
    { title: 'Dentists & Healthcare', quote: '"I want to book an exam for next week"' },
    { title: 'Restaurants & Cafés', quote: '"Can we book a table for 6 at 7 PM?"' },
    { title: 'Plumbers & HVAC', quote: '"Can you come look at my radiator?"' },
    { title: 'Small Business & Consultants', quote: '"I want to book a meeting to discuss my project"' },
  ];

  return (
    <section className="py-20 px-6">
      <ScrollAnimation className="text-center mb-14">
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-night mb-3">
          {language === 'sv' ? 'Byggd för din bransch' : 'Built for your industry'}
        </h2>
        <p className="text-bark text-lg max-w-[500px] mx-auto">
          {language === 'sv'
            ? 'Alva tränas specifikt för att bli som en kollega som förstår just ditt företag.'
            : 'Alva is trained specifically to become a colleague who understands your business.'}
        </p>
      </ScrollAnimation>

      <StaggerContainer className="grid md:grid-cols-3 gap-4 max-w-[960px] mx-auto" staggerDelay={0.08}>
        {industries.map((item, i) => (
          <StaggerItem key={i} variant="fadeUp">
            <div className="bg-warm-white border border-sand-dark rounded-xl p-6 hover:border-stone hover:-translate-y-1 hover:shadow-elevated transition-all duration-300 cursor-default">
              
              <h3 className="font-serif text-lg text-night mb-2">{item.title}</h3>
              <p className="text-sm text-bark italic">{item.quote}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
};

export default IndustriesSection;
