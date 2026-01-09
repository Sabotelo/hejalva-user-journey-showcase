import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, PhoneMissed, FileWarning, Zap, CheckCircle2, CalendarCheck, Moon, Users, MessageSquare, Sparkles } from "lucide-react";

const issues = [
  {
    id: 1,
    titleEn: "The Time Trap",
    titleSv: "Tidsfällan",
    problemEn: "Limited Opening Hours",
    problemSv: "Begränsade Öppettider",
    problemDescEn: "Most people book appointments after work – when you're closed.",
    problemDescSv: "De flesta bokar tider efter jobbet – när du är stängd.",
    solutionEn: "24/7 Booking",
    solutionSv: "24/7 Bokning",
    solutionDescEn: "Alva fills your calendar while you sleep.",
    solutionDescSv: "Alva fyller din kalender medan du sover.",
    problemIcon: Clock,
    solutionIcon: Zap,
  },
  {
    id: 2,
    titleEn: "The Busy Signal",
    titleSv: "Upptaget-Signalen",
    problemEn: "Missed Calls = Lost Money",
    problemSv: "Missade Samtal = Förlorade Pengar",
    problemDescEn: "You can't answer the phone while working with a client.",
    problemDescSv: "Du kan inte svara i telefon medan du jobbar med en kund.",
    solutionEn: "Zero Latency",
    solutionSv: "Noll Latens",
    solutionDescEn: "Alva answers every call instantly, handling thousands at once.",
    solutionDescSv: "Alva svarar på varje samtal direkt, hanterar tusentals samtidigt.",
    problemIcon: PhoneMissed,
    solutionIcon: CheckCircle2,
  },
  {
    id: 3,
    titleEn: "The Admin Burden",
    titleSv: "Admin-Bördan",
    problemEn: "Manual Scheduling Chaos",
    problemSv: "Manuellt Schema-Kaos",
    problemDescEn: "Texting back and forth to find a time slot is slow.",
    problemDescSv: "Att SMSa fram och tillbaka för att hitta en tid är långsamt.",
    solutionEn: "Automated Sync",
    solutionSv: "Automatisk Synk",
    solutionDescEn: "Appointments drop directly into your calendar without you lifting a finger.",
    solutionDescSv: "Bokningar hamnar direkt i din kalender utan att du lyfter ett finger.",
    problemIcon: FileWarning,
    solutionIcon: CalendarCheck,
  },
];

// Floating decorative elements
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Dotted grid */}
    <div className="absolute inset-0 opacity-20">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
          style={{
            left: `${(i % 5) * 25 + 10}%`,
            top: `${Math.floor(i / 5) * 25 + 10}%`,
          }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </div>
    
    {/* Floating plus signs */}
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={`plus-${i}`}
        className="absolute text-[#CCFF00]/40 text-2xl font-bold"
        style={{
          left: `${15 + i * 18}%`,
          top: `${10 + (i % 3) * 30}%`,
        }}
        animate={{
          y: [-5, 5, -5],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 4 + i, repeat: Infinity }}
      >
        +
      </motion.div>
    ))}
    
    {/* Hollow stars */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={`star-${i}`}
        className="absolute"
        style={{
          right: `${10 + i * 25}%`,
          bottom: `${15 + i * 20}%`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 6 + i * 2, repeat: Infinity }}
      >
        <Sparkles className="w-6 h-6 text-[#FFD700]/50" />
      </motion.div>
    ))}
  </div>
);

// Scene 1: The Time Trap
const SceneTimeTrap = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="flex items-center justify-center h-full"
  >
    <div className="relative flex items-center gap-8">
      {/* Problem side - closed shop */}
      <motion.div
        className="relative"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="w-32 h-40 rounded-xl bg-slate-700/50 border-2 border-dashed border-slate-500 flex flex-col items-center justify-center">
          <Clock className="w-10 h-10 text-slate-400 mb-2" />
          <div className="text-slate-400 text-xs font-bold">CLOSED</div>
          <div className="text-slate-500 text-xs">After 5 PM</div>
        </div>
        <motion.div
          className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-red-500/80 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Moon className="w-4 h-4 text-white" />
        </motion.div>
      </motion.div>

      {/* Arrow */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-[#FF00CC] font-bold text-xs mb-2">WITH ALVA</div>
        <motion.div
          className="w-12 h-1 bg-gradient-to-r from-[#FF00CC] to-[#CCFF00] rounded-full"
          animate={{ scaleX: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <div className="text-[#CCFF00] text-2xl">→</div>
      </motion.div>

      {/* Solution side - 24/7 */}
      <motion.div
        className="relative"
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="w-32 h-40 rounded-xl bg-gradient-to-br from-[#CCFF00]/20 to-[#00FFFF]/20 border-2 border-[#CCFF00] flex flex-col items-center justify-center">
          <Zap className="w-10 h-10 text-[#CCFF00] mb-2" />
          <div className="text-[#CCFF00] text-xs font-bold">24/7</div>
          <div className="text-white/70 text-xs">Always Open</div>
        </div>
        <motion.div
          className="absolute -top-4 -right-4 px-2 py-1 rounded-full bg-[#CCFF00] text-[#2D1B69] text-xs font-bold"
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          LIVE
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
);

// Scene 2: The Busy Signal
const SceneBusySignal = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex items-center justify-center h-full"
  >
    <div className="relative w-full max-w-md">
      {/* Multiple incoming calls */}
      <div className="flex justify-center gap-4 mb-8">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="relative"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-[#FF00CC]/30 border-2 border-[#FF00CC] flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
            >
              <PhoneMissed className="w-6 h-6 text-[#FF00CC]" />
            </motion.div>
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-red-400 text-xs font-bold"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              MISSED
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Alva handling all */}
      <motion.div
        className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-[#CCFF00]/50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-[#CCFF00] flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <CheckCircle2 className="w-6 h-6 text-[#2D1B69]" />
            </motion.div>
            <div>
              <div className="text-white font-bold text-sm">Alva Active</div>
              <div className="text-white/60 text-xs">Handling all calls</div>
            </div>
          </div>
          <div className="text-right">
            <motion.div
              className="text-[#CCFF00] text-2xl font-bold"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              ∞
            </motion.div>
            <div className="text-white/60 text-xs">Capacity</div>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// Scene 3: The Admin Burden
const SceneAdminBurden = () => {
  const [synced, setSynced] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setSynced(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center h-full"
    >
      <div className="relative">
        {/* SMS chaos */}
        {!synced && (
          <div className="absolute -left-24 top-0 space-y-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
              >
                <MessageSquare className="w-4 h-4 text-slate-400" />
                <div className="text-slate-400 text-xs">Tuesday?</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Calendar */}
        <motion.div
          className="w-48 bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20"
          animate={synced ? { borderColor: "#CCFF00", boxShadow: "0 0 20px rgba(204, 255, 0, 0.3)" } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-3">
            <CalendarCheck className={`w-5 h-5 ${synced ? "text-[#CCFF00]" : "text-white/60"}`} />
            <span className="text-white/60 text-xs">Your Calendar</span>
          </div>
          
          <div className="space-y-2">
            {["9:00 AM", "11:00 AM", "2:00 PM"].map((time, i) => (
              <motion.div
                key={time}
                className={`px-3 py-2 rounded-lg text-xs font-medium ${
                  synced && i === 1
                    ? "bg-[#CCFF00] text-[#2D1B69]"
                    : "bg-white/10 text-white/60"
                }`}
                animate={synced && i === 1 ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {time} {synced && i === 1 && "- New Booking ✓"}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Auto-sync indicator */}
        {synced && (
          <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[#CCFF00] text-sm font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle2 className="w-4 h-4" />
            Auto-synced!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const scenes = [SceneTimeTrap, SceneBusySignal, SceneAdminBurden];

const IssuesWeSolveVisualization = () => {
  const { language } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Auto-play through steps
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % issues.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isPaused]);
  
  const ActiveScene = scenes[activeStep];
  const currentIssue = issues[activeStep];
  
  return (
    <div
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex flex-col lg:flex-row min-h-[500px]">
        {/* Left Side - Navigation */}
        <div className="lg:w-1/3 p-6 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
          <div className="space-y-3">
            {issues.map((issue, index) => {
              const ProblemIcon = issue.problemIcon;
              const SolutionIcon = issue.solutionIcon;
              
              return (
                <motion.button
                  key={issue.id}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    activeStep === index
                      ? 'bg-white shadow-lg border-2 border-[#CCFF00]'
                      : 'bg-white/50 hover:bg-white border-2 border-transparent hover:border-slate-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        activeStep === index
                          ? 'bg-[#CCFF00] text-[#2D1B69]'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {activeStep === index ? (
                        <SolutionIcon className="w-4 h-4" />
                      ) : (
                        <ProblemIcon className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h3
                        className={`font-bold text-sm transition-colors ${
                          activeStep === index ? 'text-[#2D1B69]' : 'text-slate-700'
                        }`}
                      >
                        {language === 'sv' ? issue.titleSv : issue.titleEn}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        <span className="line-through opacity-60">
                          {language === 'sv' ? issue.problemSv : issue.problemEn}
                        </span>
                        {" → "}
                        <span className={activeStep === index ? "text-[#2D1B69] font-medium" : ""}>
                          {language === 'sv' ? issue.solutionSv : issue.solutionEn}
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
          
          {/* Progress indicator */}
          <div className="mt-6 flex gap-2">
            {issues.map((_, index) => (
              <motion.div
                key={index}
                className="h-1 flex-1 rounded-full overflow-hidden bg-slate-200"
              >
                <motion.div
                  className="h-full bg-[#CCFF00]"
                  initial={{ width: '0%' }}
                  animate={{
                    width: activeStep === index ? '100%' : activeStep > index ? '100%' : '0%',
                  }}
                  transition={{
                    duration: activeStep === index && !isPaused ? 4 : 0.3,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Right Side - The Stage */}
        <div className="lg:w-2/3 relative" style={{ backgroundColor: '#2D1B69' }}>
          <FloatingElements />
          
          <div className="relative z-10 h-full min-h-[350px] lg:min-h-[500px] p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                className="h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ActiveScene />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Step title overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <motion.div
              key={`title-${activeStep}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/30 backdrop-blur-sm rounded-xl px-4 py-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[#CCFF00] text-xs font-bold uppercase tracking-wider mb-1">
                    {language === 'sv' ? 'Lösning' : 'Solution'}
                  </div>
                  <div className="text-white font-bold">
                    {language === 'sv' ? currentIssue.solutionSv : currentIssue.solutionEn}
                  </div>
                </div>
                <div className="text-white/40 text-sm">
                  {activeStep + 1} / {issues.length}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuesWeSolveVisualization;
