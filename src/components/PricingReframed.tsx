import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const PricingReframed = () => {
  const { language } = useLanguage();

  const features = language === 'sv'
    ? [
      '24/7 samtalshantering med naturlig svensk röst',
      'Integrerar med ditt bokningssystem och kalender',
      'Samtalssammanfattningar via SMS och e-post',
      'Obegränsad användning',
      'Svarar på frågor om dina tjänster och öppettider',
    ]
    : [
      '24/7 call handling with natural Swedish voice',
      'Integrates with your booking system and calendar',
      'Call summaries via SMS and email',
      'Unlimited usage',
      'Answers questions about your services and hours',
    ];

  return (
    <section id="pris" className="py-20 px-6 bg-sand">
      <ScrollAnimation className="text-center mb-14">
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-night mb-3">
          {language === 'sv' ? 'En enkel plan' : 'One simple plan'}
        </h2>
        <p className="text-bark text-lg max-w-[500px] mx-auto">
          {language === 'sv' ? 'Allt du behöver. Ingen bindningstid.' : 'Everything you need. No commitment.'}
        </p>
      </ScrollAnimation>

      <ScrollAnimation delay={0.2}>
        <div className="max-w-[560px] mx-auto bg-cream rounded-2xl p-8 md:p-10 text-center border border-sand-dark shadow-elevated">
          <p className="text-bark text-[0.95rem] leading-relaxed mb-8">
            {language === 'sv' ? (
              <>En missad kund kostar dig i snitt <strong className="text-accent-warm font-semibold">800 kr</strong>.<br />Alva kostar <strong className="text-accent-warm font-semibold">117 kr om dagen</strong>.</>
            ) : (
              <>A missed customer costs you on average <strong className="text-accent-warm font-semibold">800 kr</strong>.<br />Alva costs <strong className="text-accent-warm font-semibold">117 kr per day</strong>.</>
            )}
          </p>

          <div className="font-serif text-[3.5rem] text-night mb-1">3 500 kr</div>
          <div className="text-sm text-stone mb-8">{language === 'sv' ? 'per månad' : 'per month'}</div>

          <ul className="text-left space-y-3 mb-8">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-earth">
                <span className="w-1.5 h-1.5 rounded-full bg-moss mt-2 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <a
            href="#kontakt"
            className="inline-block bg-earth text-cream px-8 py-4 rounded-full font-semibold text-base hover:bg-night transition-all duration-300 hover:-translate-y-0.5"
          >
            {language === 'sv' ? 'Boka en demo' : 'Book a demo'}
          </a>

          <div className="mt-3 text-xs text-stone">
            {language === 'sv' ? '14 dagars gratis provperiod' : '14-day free trial'}
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
};

export default PricingReframed;
