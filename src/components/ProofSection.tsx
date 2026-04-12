import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const ProofSection = () => {
  const { language } = useLanguage();

  const conversation = language === 'sv' ? [
    { from: 'customer', sender: 'Kund', text: 'Hej, har ni tid för klippning på fredag?' },
    { from: 'alva', sender: 'Alva', text: 'Hej och välkommen! Ja, på fredag har vi ledigt klockan 10 och 14. Vilken tid passar dig bäst?' },
    { from: 'customer', sender: 'Kund', text: 'Klockan 10 låter perfekt.' },
    { from: 'alva', sender: 'Alva', text: 'Toppen! Jag lägger in fredag kl 10 åt dig. Kan jag få ditt namn?' },
  ] : [
    { from: 'customer', sender: 'Customer', text: 'Hi, do you have time for a haircut on Friday?' },
    { from: 'alva', sender: 'Alva', text: 'Hello and welcome! Yes, on Friday we have openings at 10 and 14. Which time works best for you?' },
    { from: 'customer', sender: 'Customer', text: '10 o\'clock sounds perfect.' },
    { from: 'alva', sender: 'Alva', text: 'Great! I\'ll book Friday at 10 for you. Can I have your name?' },
  ];

  const stats = language === 'sv'
    ? ['Svarstid under 1 sekund', 'Flytande svenska', 'Du godkänner bokningen']
    : ['Response under 1 second', 'Fluent Swedish', 'You approve the booking'];

  return (
    <section className="py-20 px-6 flex justify-center">
      <div className="max-w-[800px] w-full">
        <ScrollAnimation>
          <div className="text-xs font-semibold tracking-[0.15em] uppercase text-moss mb-6">
            {language === 'sv' ? 'Så låter det i verkligheten' : 'What it sounds like in reality'}
          </div>

          <div className="bg-warm-white border border-sand-dark rounded-2xl p-6 md:p-8">
            <div className="flex flex-col gap-4">
              {conversation.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-1 max-w-[85%] ${
                    msg.from === 'alva' ? 'self-end' : 'self-start'
                  }`}
                >
                  <span className={`text-[0.7rem] font-semibold uppercase tracking-wider ${
                    msg.from === 'alva' ? 'text-moss text-right' : 'text-stone'
                  }`}>
                    {msg.sender}
                  </span>
                  <div className={`px-4 py-3 rounded-xl text-[0.95rem] leading-relaxed ${
                    msg.from === 'alva'
                      ? 'bg-moss-pale text-earth rounded-br-sm'
                      : 'bg-sand text-earth rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-sand-dark flex flex-wrap justify-between gap-3">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-bark">
                  <div className="w-2 h-2 rounded-full bg-moss-light" />
                  {stat}
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ProofSection;
