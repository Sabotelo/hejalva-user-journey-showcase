import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Scissors, Clock, Calendar, Monitor, Check, MessageSquare, Sparkles, ShieldCheck } from "lucide-react";

const steps = [
  {
    id: 1,
    titleEn: "User Calls",
    titleSv: "Kunden Ringer",
    descEn: "A client calls your business line. Alva answers instantly.",
    descSv: "En kund ringer din företagslinje. Alva svarar direkt.",
  },
  {
    id: 2,
    titleEn: "AI Analysis",
    titleSv: "AI-Analys",
    descEn: "Alva listens, transcribes, and identifies the intent (e.g., Haircut, Tuesday).",
    descSv: "Alva lyssnar, transkriberar och identifierar avsikten (t.ex. Klippning, Tisdag).",
  },
  {
    id: 3,
    titleEn: "Smart Routing",
    titleSv: "Smart Routing",
    descEn: "Alva checks your calendar and proposes a time – never overwrites your schedule.",
    descSv: "Alva kollar din kalender och föreslår en tid – skriver aldrig över ditt schema.",
  },
  {
    id: 4,
    titleEn: "You Have the Final Say",
    titleSv: "Du Har Sista Ordet",
    descEn:
      "Alva drafts the appointment and summarizes the call, but nothing is confirmed until you click Approve. You maintain 100% control.",
    descSv:
      "Alva skapar ett utkast och sammanfattar samtalet, men ingenting bekräftas förrän du klickar Godkänn. Du har 100% kontroll.",
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

// Scene 1: The Call
const SceneCall = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="flex items-center justify-center h-full"
  >
    <div className="relative">
      {/* Phone shape */}
      <motion.div
        className="w-32 h-56 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border-4 border-[#CCFF00] shadow-2xl flex items-center justify-center"
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="absolute top-4 w-16 h-1 bg-slate-700 rounded-full" />

        {/* Waveform */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 bg-[#CCFF00] rounded-full"
              animate={{
                height: [12, 32 + i * 8, 12],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        <div className="absolute bottom-6 w-12 h-12 rounded-full bg-[#FF00CC] flex items-center justify-center">
          <Phone className="w-6 h-6 text-white" />
        </div>
      </motion.div>

      {/* Incoming call indicator */}
      <motion.div
        className="absolute -top-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#CCFF00] rounded-full text-[#2D1B69] font-bold text-sm"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        Incoming Call...
      </motion.div>
    </div>
  </motion.div>
);

// Scene 2: Analysis
const SceneAnalysis = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex items-center justify-center h-full"
  >
    <div className="relative w-full max-w-md">
      {/* Speech bubbles morphing */}
      <motion.div
        className="absolute left-8 top-0 w-32 h-24 rounded-2xl bg-white/20 backdrop-blur border-2 border-[#FF00CC] flex items-center justify-center"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <MessageSquare className="w-8 h-8 text-[#FF00CC]" />
        <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white/20 border-l-2 border-b-2 border-[#FF00CC] rotate-[-45deg]" />
      </motion.div>

      {/* Connecting dashed lines */}
      <motion.svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
      >
        <motion.path
          d="M 50 30 Q 150 60 250 30"
          stroke="#FFD700"
          strokeWidth="3"
          strokeDasharray="8 4"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.svg>

      {/* Intent blocks */}
      <motion.div
        className="absolute right-8 top-0 px-4 py-3 rounded-xl bg-[#CCFF00] flex items-center gap-2"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Scissors className="w-5 h-5 text-[#2D1B69]" />
        <span className="text-[#2D1B69] font-bold text-sm">Haircut</span>
      </motion.div>

      <motion.div
        className="absolute right-16 top-20 px-4 py-3 rounded-xl bg-[#FFD700] flex items-center gap-2"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Clock className="w-5 h-5 text-[#2D1B69]" />
        <span className="text-[#2D1B69] font-bold text-sm">Tuesday 2PM</span>
      </motion.div>

      {/* AI processing indicator */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full border border-white/30"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <motion.div
          className="w-3 h-3 rounded-full bg-[#CCFF00]"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        <span className="text-white text-sm font-medium">Analyzing intent...</span>
      </motion.div>
    </div>
  </motion.div>
);

// Scene 3: Smart Routing
const SceneRouting = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex items-center justify-center h-full"
  >
    <div className="relative">
      {/* Calendar grid */}
      <motion.div
        className="grid grid-cols-5 gap-2 p-4 bg-white/10 rounded-2xl backdrop-blur border border-white/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
          <div key={day} className="text-center">
            <div className="text-white/60 text-xs mb-2">{day}</div>
            {[...Array(3)].map((_, j) => (
              <motion.div
                key={j}
                className={`w-12 h-8 rounded-lg mb-1 ${
                  i === 1 && j === 1
                    ? "bg-[#CCFF00]/30 border-2 border-dashed border-[#CCFF00]"
                    : j % 2 === 0
                      ? "bg-white/20"
                      : "bg-[#FF00CC]/30"
                }`}
                animate={i === 1 && j === 1 ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
            ))}
          </div>
        ))}
      </motion.div>

      {/* Lead card sliding */}
      <motion.div
        className="absolute -left-20 top-1/2 -translate-y-1/2 px-4 py-3 bg-[#FF00CC] rounded-xl shadow-lg"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 120, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-white" />
          <span className="text-white font-bold text-sm">New Lead</span>
        </div>
      </motion.div>

      {/* Dotted path */}
      <motion.div
        className="absolute -left-16 top-1/2 w-32 border-t-2 border-dashed border-[#FFD700]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1 }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  </motion.div>
);

// Scene 4: Human Control - You Have the Final Say
const SceneHandoff = () => {
  const [phase, setPhase] = useState<"draft" | "hovering" | "approved">("draft");

  useEffect(() => {
    // Phase 1: Show draft state (pause for 2 seconds to emphasize review)
    const hoverTimer = setTimeout(() => setPhase("hovering"), 2000);
    // Phase 2: Cursor hovers, then clicks after 1.5 more seconds
    const approveTimer = setTimeout(() => setPhase("approved"), 3500);

    return () => {
      clearTimeout(hoverTimer);
      clearTimeout(approveTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center h-full"
    >
      <div className="relative">
        {/* Human-in-the-Loop Trust Badge */}
        <motion.div
          className="absolute -top-2 -right-2 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-[#CCFF00] rounded-full shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <ShieldCheck className="w-4 h-4 text-[#2D1B69]" />
          <span className="text-[#2D1B69] text-xs font-bold whitespace-nowrap">Human-in-the-Loop</span>
        </motion.div>

        {/* Monitor */}
        <motion.div
          className="w-72 h-52 rounded-xl bg-slate-800 border-4 border-slate-600 overflow-hidden shadow-2xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {/* Screen content */}
          <div className="h-full bg-gradient-to-b from-slate-700 to-slate-800 p-3 relative">
            {phase !== "approved" ? (
              <>
                {/* Draft Booking Card */}
                <motion.div
                  className={`absolute top-3 right-3 left-3 rounded-lg p-3 shadow-lg border-2 transition-colors duration-300 ${
                    phase === "hovering" ? "bg-white border-[#CCFF00]" : "bg-amber-50 border-amber-400"
                  }`}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Draft Badge */}
                  <motion.div
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold mb-2 ${
                      phase === "hovering" ? "bg-[#CCFF00]/20 text-[#2D1B69]" : "bg-amber-200 text-amber-800"
                    }`}
                    animate={phase === "draft" ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {phase === "draft" ? "⏳ DRAFT - AWAITING APPROVAL" : "✓ READY TO CONFIRM"}
                  </motion.div>

                  <div className="text-xs text-slate-500 mb-0.5">Call Summary</div>
                  <div className="text-sm font-bold text-slate-800">Haircut - Tuesday 2PM</div>
                  <div className="text-xs text-slate-500 mt-1">Customer: Maria S.</div>

                  {/* Review & Confirm Button */}
                  <motion.button
                    className={`mt-3 w-full py-2.5 rounded-md text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                      phase === "hovering"
                        ? "bg-[#CCFF00] text-[#2D1B69] shadow-lg scale-105"
                        : "bg-slate-200 text-slate-600"
                    }`}
                    animate={phase === "draft" ? {} : { scale: [1.05, 1.08, 1.05] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    <Check className="w-4 h-4" />
                    Review & Confirm
                  </motion.button>
                </motion.div>

                {/* Cursor - appears and hovers over button */}
                {phase === "hovering" && (
                  <motion.div
                    className="absolute w-6 h-6 z-10"
                    initial={{ x: 180, y: 120 }}
                    animate={{ x: 130, y: 115 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      className="drop-shadow-lg"
                      style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
                    >
                      <path d="M5.5 3.21V20.8l5.5-5.5h7.21L5.5 3.21z" />
                    </svg>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                className="h-full flex flex-col items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-[#CCFF00] flex items-center justify-center mb-3"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                >
                  <Check className="w-8 h-8 text-[#2D1B69]" strokeWidth={3} />
                </motion.div>
                <div className="text-white text-sm font-medium">Booking Confirmed!</div>
                <div className="text-white/60 text-xs mt-1">SMS sent to customer</div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Monitor stand */}
        <div className="mx-auto w-16 h-4 bg-slate-600 rounded-b-lg" />
        <div className="mx-auto w-24 h-2 bg-slate-500 rounded-full" />

        {/* Bottom text */}
        <motion.div
          className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-[#CCFF00] font-bold text-sm whitespace-nowrap">
            {phase === "approved" ? "✓ You approved it!" : "👆 Nothing happens without YOUR click"}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const scenes = [SceneCall, SceneAnalysis, SceneRouting, SceneHandoff];

const HowItWorksVisualization = () => {
  const { language } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play through steps
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const ActiveScene = scenes[activeStep];

  return (
    <div
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex flex-col lg:flex-row min-h-[auto] lg:min-h-[500px]">
        {/* Left Side - Navigation */}
        <div className="lg:w-1/3 p-6 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
          <div className="space-y-3">
            {steps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                  activeStep === index
                    ? "bg-white shadow-lg border-2 border-[#CCFF00]"
                    : "bg-white/50 hover:bg-white border-2 border-transparent hover:border-slate-200"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
                      activeStep === index ? "bg-[#CCFF00] text-[#2D1B69]" : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {step.id}
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-sm transition-colors ${
                        activeStep === index ? "text-[#2D1B69]" : "text-slate-700"
                      }`}
                    >
                      {language === "sv" ? step.titleSv : step.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {language === "sv" ? step.descSv : step.descEn}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Progress indicator */}
          <div className="mt-6 flex gap-2">
            {steps.map((_, index) => (
              <motion.div key={index} className="h-1 flex-1 rounded-full overflow-hidden bg-slate-200">
                <motion.div
                  className="h-full bg-[#CCFF00]"
                  initial={{ width: "0%" }}
                  animate={{
                    width: activeStep === index ? "100%" : activeStep > index ? "100%" : "0%",
                  }}
                  transition={{
                    duration: activeStep === index && !isPaused ? 4 : 0.3,
                    ease: "linear",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side - The Stage (hidden on mobile) */}
        <div className="hidden lg:block lg:w-2/3 relative" style={{ backgroundColor: "#2D1B69" }}>
          <FloatingElements />

          <div className="relative z-10 h-full min-h-[500px] p-8">
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
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/80 text-sm font-medium"
            >
              Step {activeStep + 1} of 4: {language === "sv" ? steps[activeStep].titleSv : steps[activeStep].titleEn}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksVisualization;
