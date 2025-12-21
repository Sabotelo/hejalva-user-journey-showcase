import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, Wrench, Phone, CheckCircle, XCircle } from "lucide-react";

const STORAGE_KEY = 'alva_revenue_saved';

const getStoredRevenue = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const { value, timestamp } = JSON.parse(stored);
      // Reset weekly (7 days)
      const weekInMs = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - timestamp < weekInMs) {
        return value;
      }
    }
  } catch {
    // Ignore localStorage errors
  }
  return 24750;
};

const PainPointsSection = () => {
  const { language } = useLanguage();
  const [revenueSaved, setRevenueSaved] = useState(() => getStoredRevenue());

  useEffect(() => {
    const interval = setInterval(() => {
      setRevenueSaved(prev => {
        const newValue = prev + Math.floor(Math.random() * 50) + 10;
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ value: newValue, timestamp: Date.now() }));
        } catch {
          // Ignore localStorage errors
        }
        return newValue;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const painPoints = [
    {
      icon: Clock,
      title: language === 'sv' ? 'Efter stängning' : 'After Hours',
      oldWay: language === 'sv' 
        ? 'Samtalet går till röstbrevlådan.'
        : 'The call goes to voicemail.',
      newWay: language === 'sv'
        ? 'Alva svarar och bokar åt dig.'
        : 'Alva answers and books for you.',
      description: language === 'sv'
        ? 'Kunder ringer när det passar dem – inte bara när du har öppet.'
        : 'Customers call when it suits them – not just during your hours.',
    },
    {
      icon: Wrench,
      title: language === 'sv' ? 'Mitt i arbetet' : 'In the Middle of Work',
      oldWay: language === 'sv'
        ? 'Avbryt det du gör för att svara.'
        : 'Stop what you\'re doing to answer.',
      newWay: language === 'sv'
        ? 'Fortsätt fokusera – Alva tar hand om samtalet.'
        : 'Stay focused – Alva handles the call.',
      description: language === 'sv'
        ? 'Du är bäst på ditt hantverk. Låt Alva sköta telefonen.'
        : 'You\'re best at your craft. Let Alva handle the phone.',
    },
    {
      icon: Phone,
      title: language === 'sv' ? 'Mer tid för det viktiga' : 'More Time for What Matters',
      oldWay: language === 'sv'
        ? 'Kvällar spenderas på att ringa tillbaka.'
        : 'Evenings spent returning calls.',
      newWay: language === 'sv'
        ? 'Gå hem i tid. Alva har redan bokat mötet.'
        : 'Go home on time. Alva already booked the meeting.',
      description: language === 'sv'
        ? 'Familj, hobbies, vila – du förtjänar din fritid.'
        : 'Family, hobbies, rest – you deserve your time off.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-primary-dark to-primary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 h-[300px] w-[300px] rounded-full bg-destructive/10 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {language === 'sv' ? 'Verkligheten för småföretagare' : 'The Reality of SME Ownership'}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {language === 'sv' 
              ? 'Varje missat samtal är en förlorad möjlighet. Så här löser Alva dina största frustrationer.'
              : 'Every missed call is a lost opportunity. Here\'s how Alva solves your biggest frustrations.'}
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 items-stretch">
          {painPoints.map((point, index) => (
            <div 
              key={index}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 flex flex-col"
            >
              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30">
                <point.icon className="h-7 w-7 text-secondary" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
              <p className="text-white/60 text-sm mb-6 flex-grow">{point.description}</p>

              {/* Comparison */}
              <div className="space-y-3">
                {/* Old Way */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <span className="text-destructive text-xs font-semibold uppercase tracking-wide">
                      {language === 'sv' ? 'Utan Alva' : 'Without Alva'}
                    </span>
                    <p className="text-white/70 text-sm mt-1">{point.oldWay}</p>
                  </div>
                </div>

                {/* New Way */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                  <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-secondary text-xs font-semibold uppercase tracking-wide">
                      {language === 'sv' ? 'Med Alva' : 'With Alva'}
                    </span>
                    <p className="text-white/80 text-sm mt-1">{point.newWay}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Counter */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-2 rounded-2xl border border-secondary/30 bg-secondary/10 backdrop-blur-xl px-8 py-6">
            <span className="text-secondary/80 text-sm font-medium uppercase tracking-wide">
              {language === 'sv' ? 'Intäkter sparade denna vecka' : 'Revenue Saved This Week'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl md:text-5xl font-bold text-white tabular-nums">
                {revenueSaved.toLocaleString('sv-SE')}
              </span>
              <span className="text-2xl text-secondary font-semibold">SEK</span>
            </div>
            <span className="text-white/50 text-xs">
              {language === 'sv' ? '* Baserat på genomsnittlig bokning' : '* Based on average booking value'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;