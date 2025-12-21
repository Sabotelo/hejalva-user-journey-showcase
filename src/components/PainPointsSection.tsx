import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, PhoneOff, Wrench, Phone, CheckCircle, XCircle } from "lucide-react";

const PainPointsSection = () => {
  const { language } = useLanguage();
  const [revenueSaved, setRevenueSaved] = useState(24750);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevenueSaved(prev => prev + Math.floor(Math.random() * 50) + 10);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const painPoints = [
    {
      icon: Clock,
      title: language === 'sv' ? '"17:05-Problemet"' : 'The "5:05 PM" Problem',
      oldWay: language === 'sv' 
        ? 'Stängt kl 17:00. Missat samtal kl 17:05. Förlorad kund.'
        : 'Closed at 5 PM. Missed call at 5:05 PM. Lost customer.',
      newWay: language === 'sv'
        ? 'Alva jobbar nattskiftet så du slipper.'
        : 'Alva works the night shift so you don\'t have to.',
      description: language === 'sv'
        ? 'Din verkstad stänger kl 17:00. Dina kunder ringer kl 17:05.'
        : 'Your shop closes at 5 PM. Your customers call at 5:05 PM.',
    },
    {
      icon: PhoneOff,
      title: language === 'sv' ? '"Telefonångesten"' : 'The "Phone Anxiety" Factor',
      oldWay: language === 'sv'
        ? '70% lägger på vid pipet. Ingen bokning.'
        : '70% hang up at the beep. No booking.',
      newWay: language === 'sv'
        ? 'Alva svarar direkt med naturlig konversation.'
        : 'Alva answers instantly with natural conversation.',
      description: language === 'sv'
        ? 'Gen Z hatar att lämna röstmeddelanden.'
        : 'Gen Z hates leaving voicemails.',
    },
    {
      icon: Wrench,
      title: language === 'sv' ? '"Upptagna Händer"' : 'The "Busy Hands" Scenario',
      oldWay: language === 'sv'
        ? 'Avbryt ditt arbete. Tappa fokus. Tappa kund.'
        : 'Interrupt your work. Lose focus. Lose customer.',
      newWay: language === 'sv'
        ? 'Fokusera på ditt hantverk. Alva sköter resten.'
        : 'Focus on your craft. Alva handles the rest.',
      description: language === 'sv'
        ? 'Du får betalt för att fixa bilar/tänder, inte svara i telefon.'
        : 'You are paid to fix cars/teeth, not to answer phones.',
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
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {painPoints.map((point, index) => (
            <div 
              key={index}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
            >
              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30">
                <point.icon className="h-7 w-7 text-secondary" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
              <p className="text-white/60 text-sm mb-6">{point.description}</p>

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