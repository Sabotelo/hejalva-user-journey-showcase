import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const PricingReframed = () => {
  const { language } = useLanguage();

  const features = language === 'sv'
    ? [
      '24/7 samtalshantering med naturlig svensk röst',
      'Integrerar med ditt bokningssystem och kalender',
      'Samtalssammanfattningar via SMS och e-post',
      'Svarar på frågor om dina tjänster och öppettider',
      'Skalar efter ditt företags behov',
    ]
    : [
      '24/7 call handling with natural Swedish voice',
      'Integrates with your booking system and calendar',
      'Call summaries via SMS and email',
      'Answers questions about your services and hours',
      'Scales to your business needs',
    ];

  return (
    <section id="pris" className="py-20 px-6 bg-sand">
      <ScrollAnimation className="text-center mb-14">
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-night mb-3">
          {language === 'sv' ? 'Skräddarsytt för ditt företag' : 'Tailored for your business'}
        </h2>
        <p className="text-bark text-lg max-w-[520px] mx-auto">
          {language === 'sv'
            ? 'Varje företag är unikt. Kontakta oss för ett prisförslag anpassat efter just dina behov.'
            : 'Every business is unique. Contact us for a quote tailored to your needs.'}
        </p>
      </ScrollAnimation>

      <ScrollAnimation delay={0.2}>
        <div className="max-w-[560px] mx-auto bg-cream rounded-2xl p-8 md:p-10 text-center border border-sand-dark shadow-elevated">
          <p className="text-bark text-[0.95rem] leading-relaxed mb-8">
            {language === 'sv' ? (
              <>En missad kund kostar dig i snitt <strong className="text-accent-warm font-semibold">800 kr</strong>. Alva ser till att det aldrig händer.</>
            ) : (
              <>A missed customer costs you on average <strong className="text-accent-warm font-semibold">800 kr</strong>. Alva makes sure it never happens.</>
            )}
          </p>

          <ul className="text-left space-y-3 mb-8">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-earth">
                <span className="w-1.5 h-1.5 rounded-full bg-moss mt-2 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-chat-bubble'))}
            className="inline-block bg-earth text-cream px-8 py-4 rounded-full font-semibold text-base hover:bg-night transition-all duration-300 hover:-translate-y-0.5"
          >
            {language === 'sv' ? 'Kontakta oss för prisförslag' : 'Contact us for a quote'}
          </button>

          <div className="mt-3 text-xs text-stone">
            {language === 'sv' ? 'Ingen bindningstid — 14 dagars gratis provperiod' : 'No commitment — 14-day free trial'}
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
};

export default PricingReframed;
