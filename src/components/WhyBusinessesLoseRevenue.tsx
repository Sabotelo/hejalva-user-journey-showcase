import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, PhoneMissed, FileWarning, Zap, CheckCircle2, CalendarCheck } from "lucide-react";

interface PainPoint {
  id: string;
  titleKey: string;
  problemKey: string;
  problemDescKey: string;
  solutionKey: string;
  solutionDescKey: string;
  problemIcon: typeof Clock;
  solutionIcon: typeof Zap;
}

const painPoints: PainPoint[] = [
  {
    id: "time-trap",
    titleKey: "timeTrap",
    problemKey: "limitedHours",
    problemDescKey: "limitedHoursDesc",
    solutionKey: "booking247",
    solutionDescKey: "booking247Desc",
    problemIcon: Clock,
    solutionIcon: Zap,
  },
  {
    id: "busy-signal",
    titleKey: "busySignal",
    problemKey: "missedCalls",
    problemDescKey: "missedCallsDesc",
    solutionKey: "zeroLatency",
    solutionDescKey: "zeroLatencyDesc",
    problemIcon: PhoneMissed,
    solutionIcon: CheckCircle2,
  },
  {
    id: "admin-burden",
    titleKey: "adminBurden",
    problemKey: "manualChaos",
    problemDescKey: "manualChaosDesc",
    solutionKey: "automatedSync",
    solutionDescKey: "automatedSyncDesc",
    problemIcon: FileWarning,
    solutionIcon: CalendarCheck,
  },
];

const translations: Record<string, Record<string, string>> = {
  sv: {
    sectionTitle: "Varför Företag Förlorar Intäkter",
    timeTrap: "TIDSFÄLLAN",
    limitedHours: "Begränsade Öppettider",
    limitedHoursDesc: "De flesta bokar tider efter jobbet – när du är stängd.",
    booking247: "24/7 Bokning",
    booking247Desc: "Alva fyller din kalender medan du sover.",
    busySignal: "UPPTAGET-SIGNALEN",
    missedCalls: "Missade Samtal = Förlorade Pengar",
    missedCallsDesc: "Du kan inte svara i telefon medan du jobbar med en kund.",
    zeroLatency: "Noll Latens",
    zeroLatencyDesc: "Alva svarar på varje samtal direkt, hanterar tusentals samtidigt.",
    adminBurden: "ADMIN-BÖRDAN",
    manualChaos: "Manuellt Schema-Kaos",
    manualChaosDesc: "Att SMSa fram och tillbaka för att hitta en tid är långsamt.",
    automatedSync: "Automatisk Synk",
    automatedSyncDesc: "Bokningar hamnar direkt i din kalender utan att du lyfter ett finger.",
    problem: "Problem",
    solution: "Lösning",
  },
  en: {
    sectionTitle: "Why Businesses Lose Revenue",
    timeTrap: "THE TIME TRAP",
    limitedHours: "Limited Opening Hours",
    limitedHoursDesc: "Most people book appointments after work – when you're closed.",
    booking247: "24/7 Booking",
    booking247Desc: "Alva fills your calendar while you sleep.",
    busySignal: "THE BUSY SIGNAL",
    missedCalls: "Missed Calls = Lost Money",
    missedCallsDesc: "You can't answer the phone while working with a client.",
    zeroLatency: "Zero Latency",
    zeroLatencyDesc: "Alva answers every call instantly, handling thousands at once.",
    adminBurden: "THE ADMIN BURDEN",
    manualChaos: "Manual Scheduling Chaos",
    manualChaosDesc: "Texting back and forth to find a time slot is slow.",
    automatedSync: "Automated Sync",
    automatedSyncDesc: "Appointments drop directly into your calendar without you lifting a finger.",
    problem: "Problem",
    solution: "Solution",
  },
};

// Memphis-style floating decorations
const MemphisDecorations = () => (
  <>
    {/* Stars */}
    <motion.div
      className="absolute -top-2 -right-2 text-[#CCFF00]"
      initial={{ scale: 0, rotate: 0 }}
      animate={{ scale: 1, rotate: 360 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12,2 15,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9,9" />
      </svg>
    </motion.div>
    <motion.div
      className="absolute -bottom-3 -left-3 text-[#FF00CC]"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12,2 15,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9,9" />
      </svg>
    </motion.div>
    {/* Dots */}
    <motion.div
      className="absolute top-1/2 -right-4 w-3 h-3 rounded-full bg-[#FFD700]"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ duration: 0.3, delay: 0.2 }}
    />
    <motion.div
      className="absolute -top-4 left-1/3 w-2 h-2 rounded-full bg-[#CCFF00]"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ duration: 0.3, delay: 0.15 }}
    />
    {/* Squiggles */}
    <motion.div
      className="absolute bottom-0 right-1/4 text-[#00FFFF]"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
    >
      <svg width="30" height="12" viewBox="0 0 30 12" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 6 C 6 2, 10 10, 14 6 C 18 2, 22 10, 28 6" />
      </svg>
    </motion.div>
  </>
);

const FlipCard = ({ point, language }: { point: PainPoint; language: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const t = translations[language] || translations.en;

  const ProblemIcon = point.problemIcon;
  const SolutionIcon = point.solutionIcon;

  return (
    <motion.div
      className="relative h-80 cursor-pointer perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Problem State (Default) */}
      <motion.div
        className={`absolute inset-0 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 ${
          isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "2px dashed rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Geometric shape behind icon */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/5" />
        
        <div className="relative z-10">
          <div className="mb-4 p-4 rounded-full bg-white/10">
            <ProblemIcon className="w-8 h-8 text-white/70" strokeWidth={1.5} />
          </div>
          <h3 className="text-sm font-bold tracking-wider text-white/60 mb-3 font-display">
            {t[point.titleKey]}
          </h3>
          <h4 className="text-xl font-bold text-white mb-2">
            {t[point.problemKey]}
          </h4>
          <p className="text-white/60 text-sm leading-relaxed">
            {t[point.problemDescKey]}
          </p>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <span className="text-xs text-white/40 uppercase tracking-widest">
            {t.problem}
          </span>
        </div>
      </motion.div>

      {/* Solution State (Hover) */}
      <motion.div
        className={`absolute inset-0 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: "linear-gradient(135deg, #CCFF00 0%, #FF00CC 100%)",
          border: "3px solid #CCFF00",
        }}
      >
        {/* Memphis decorations */}
        {isHovered && <MemphisDecorations />}

        {/* Geometric shape behind icon */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rotate-45 bg-black/10" />

        <div className="relative z-10">
          <motion.div 
            className="mb-4 p-4 rounded-full bg-black/20"
            initial={{ rotate: 0 }}
            animate={isHovered ? { rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <SolutionIcon className="w-8 h-8 text-white" strokeWidth={2} fill="white" fillOpacity={0.2} />
          </motion.div>
          <h3 className="text-sm font-bold tracking-wider text-black/60 mb-3 font-display">
            {t[point.titleKey]}
          </h3>
          <h4 className="text-xl font-bold text-black mb-2">
            {t[point.solutionKey]}
          </h4>
          <p className="text-black/70 text-sm leading-relaxed">
            {t[point.solutionDescKey]}
          </p>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <span className="text-xs text-black/50 uppercase tracking-widest font-semibold">
            {t.solution}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const WhyBusinessesLoseRevenue = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#2D1B69" }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#CCFF00]/5" />
        <div className="absolute bottom-20 right-20 w-48 h-48 rotate-45 bg-[#FF00CC]/5" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-[#00FFFF]/5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
            {t.sectionTitle}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {language === 'sv' 
              ? 'Hovra över korten för att se hur Alva löser varje problem'
              : 'Hover over the cards to see how Alva solves each problem'
            }
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FlipCard point={point} language={language} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBusinessesLoseRevenue;
