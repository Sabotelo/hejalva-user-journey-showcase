import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Clock, 
  PhoneMissed, 
  CloudLightning, 
  MessageSquareX,
  Moon,
  Star,
  Hourglass,
  User,
  Calendar,
  Phone,
  HelpCircle,
  Sparkles
} from "lucide-react";

const issues = [
  {
    id: 1,
    titleEn: "The 'Closed' Sign",
    titleSv: "'Stängt'-Skylten",
    descriptionEn: "60% of booking attempts happen after hours. That's money walking away to competitors.",
    descriptionSv: "60% av bokningsförsök sker efter stängning. Det är pengar som går till konkurrenterna.",
    icon: Clock,
  },
  {
    id: 2,
    titleEn: "The Endless Hold",
    titleSv: "Den Eviga Väntan",
    descriptionEn: "Customers hang up after 90 seconds of hold music. They won't call back.",
    descriptionSv: "Kunder lägger på efter 90 sekunder av väntmusik. De ringer inte tillbaka.",
    icon: PhoneMissed,
  },
  {
    id: 3,
    titleEn: "The Human Element",
    titleSv: "Den Mänskliga Faktorn",
    descriptionEn: "Stressed staff means rushed or rude service. One bad interaction kills loyalty.",
    descriptionSv: "Stressad personal betyder hastad eller otrevlig service. En dålig interaktion dödar lojaliteten.",
    icon: CloudLightning,
  },
  {
    id: 4,
    titleEn: "Scheduling Ping-Pong",
    titleSv: "Schema-Pingis",
    descriptionEn: "The back-and-forth texting to find a time slot wastes hours of your week.",
    descriptionSv: "SMS-andet fram och tillbaka för att hitta en tid slösar timmar av din vecka.",
    icon: MessageSquareX,
  },
];

// Floating decorative elements with pain palette
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
    
    {/* Floating X marks */}
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={`x-${i}`}
        className="absolute text-[#FF00CC]/40 text-2xl font-bold"
        style={{
          left: `${15 + i * 18}%`,
          top: `${10 + (i % 3) * 30}%`,
        }}
        animate={{
          y: [-5, 5, -5],
          rotate: [0, 15, -15, 0],
        }}
        transition={{ duration: 4 + i, repeat: Infinity }}
      >
        ×
      </motion.div>
    ))}
    
    {/* Warning triangles */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={`warn-${i}`}
        className="absolute"
        style={{
          right: `${10 + i * 25}%`,
          bottom: `${15 + i * 20}%`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3 + i, repeat: Infinity }}
      >
        <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-[#FF4500]/50" />
      </motion.div>
    ))}
  </div>
);

// Scene 1: After Hours - Closed shop at night
const SceneAfterHours = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ type: "spring", stiffness: 100, damping: 15 }}
    className="flex items-center justify-center h-full"
  >
    <div className="relative">
      {/* Night sky with moon and stars */}
      <motion.div
        className="absolute -top-8 right-0"
        animate={{ y: [-5, 5, -5], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Moon className="w-10 h-10 text-[#FFD700]" fill="#FFD700" />
      </motion.div>
      
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ 
            top: `${-20 + (i % 3) * 15}px`, 
            left: `${-40 + i * 35}px` 
          }}
          animate={{ 
            opacity: [0.3, 1, 0.3], 
            scale: [0.8, 1, 0.8] 
          }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        >
          <Star className="w-4 h-4 text-[#FFD700]" fill="#FFD700" />
        </motion.div>
      ))}

      {/* Shop facade */}
      <div className="relative">
        {/* Building */}
        <div className="w-48 h-56 bg-gradient-to-b from-slate-700 to-slate-800 rounded-t-xl border-2 border-slate-600">
          {/* Windows (dark) */}
          <div className="flex gap-3 p-4 justify-center mt-4">
            {[0, 1].map((i) => (
              <div key={i} className="w-12 h-16 bg-slate-900/80 rounded border border-slate-600" />
            ))}
          </div>
          
          {/* Door */}
          <div className="mx-auto w-16 h-24 bg-slate-900 rounded-t border-2 border-slate-600 mt-2" />
        </div>

        {/* CLOSED sign - glowing */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(255, 69, 0, 0.5)",
              "0 0 40px rgba(255, 69, 0, 0.8)",
              "0 0 20px rgba(255, 69, 0, 0.5)"
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="bg-[#FF4500] px-6 py-3 rounded-lg border-4 border-[#FF4500]/50 transform -rotate-6">
            <span className="text-white font-black text-xl tracking-wider">CLOSED</span>
          </div>
        </motion.div>

        {/* Phone bouncing off */}
        <motion.div
          className="absolute -right-16 top-1/2"
          initial={{ x: -30, rotate: 0 }}
          animate={{ 
            x: [0, 20, 0],
            y: [-10, 10, -10],
            rotate: [-15, 15, -15]
          }}
          transition={{ duration: 1.5, repeat: Infinity, type: "spring", stiffness: 200 }}
        >
          <div className="relative">
            <Phone className="w-10 h-10 text-[#FF00CC]" />
            {/* Sad waveform */}
            <motion.div
              className="absolute -top-3 -right-3"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <svg width="24" height="16" viewBox="0 0 24 16">
                <path
                  d="M2 8 Q6 2, 8 8 T 14 8 T 20 8"
                  stroke="#FF00CC"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="4 2"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

// Scene 2: Endless Hold - Chaotic waves and frozen hourglass
const SceneEndlessHold = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex items-center justify-center h-full"
  >
    <div className="relative w-full max-w-md h-64">
      {/* Tangled, chaotic wave lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.path
            key={i}
            d={`M0 ${80 + i * 15} Q50 ${40 + i * 20}, 100 ${90 + i * 10} T 200 ${70 + i * 15} T 300 ${100 + i * 8} T 400 ${60 + i * 20}`}
            stroke={i % 2 === 0 ? "#FF00CC" : "#FF4500"}
            strokeWidth={3 - i * 0.3}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0.3, 0.8, 0.3],
              pathOffset: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 3 + i * 0.5, 
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>

      {/* Center head profile with confusion */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="relative">
          {/* Abstract head */}
          <div className="w-20 h-24 bg-gradient-to-b from-slate-500 to-slate-600 rounded-t-full border-2 border-slate-400" />
          
          {/* Confusion spirals */}
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <svg width="60" height="40" viewBox="0 0 60 40">
              <motion.path
                d="M30 35 Q30 5, 15 10 Q5 15, 10 25 Q15 35, 30 30 Q45 25, 50 15 Q55 5, 40 5"
                stroke="#FFD700"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                animate={{ pathLength: [0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Frozen hourglass */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2"
        animate={{ 
          rotate: [-5, 5, -5],
          y: [-3, 3, -3]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Hourglass className="w-14 h-14 text-[#FF4500]" />
        {/* Stuck indicator */}
        <motion.div
          className="absolute -top-2 -right-2 bg-[#FF00CC] rounded-full px-2 py-0.5"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          <span className="text-white text-xs font-bold">STUCK</span>
        </motion.div>
      </motion.div>

      {/* Wait time counter */}
      <motion.div
        className="absolute left-8 bottom-4 bg-black/40 backdrop-blur rounded-lg px-4 py-2"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="text-[#FF4500] text-xs font-bold">WAIT TIME</div>
        <motion.div
          className="text-white text-2xl font-mono font-bold"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          12:47
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
);

// Scene 3: Human Element - Clashing speech bubbles
const SceneHumanElement = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex items-center justify-center h-full"
  >
    <div className="relative w-full max-w-lg h-64">
      {/* Storm cloud with lightning */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="relative">
          <CloudLightning className="w-16 h-16 text-slate-400" />
          {/* Lightning bolts */}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${20 + i * 25}px`, top: "45px" }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: [0, 1, 0], scaleY: [0, 1, 0] }}
              transition={{ 
                duration: 0.3, 
                repeat: Infinity, 
                repeatDelay: 2,
                delay: i * 0.1 
              }}
            >
              <svg width="12" height="24" viewBox="0 0 12 24">
                <path d="M6 0 L2 10 L6 10 L4 24 L10 12 L6 12 L8 0 Z" fill="#FFD700" />
              </svg>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Reception desk */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-12 bg-gradient-to-t from-slate-700 to-slate-600 rounded-t-lg border-t-2 border-l-2 border-r-2 border-slate-500" />

      {/* Clashing speech bubbles */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
        {/* Large angry bubble (staff) */}
        <motion.div
          initial={{ x: 50, opacity: 0, scale: 0.5 }}
          animate={{ 
            x: [10, 0, 10],
            opacity: 1, 
            scale: 1,
            rotate: [-2, 2, -2]
          }}
          transition={{ 
            x: { duration: 1.5, repeat: Infinity },
            opacity: { duration: 0.5 },
            scale: { type: "spring", stiffness: 150 }
          }}
          className="relative"
        >
          {/* Jagged spiky bubble */}
          <svg width="120" height="80" viewBox="0 0 120 80">
            <motion.path
              d="M10 40 L20 10 L35 25 L50 5 L65 20 L80 8 L95 25 L110 15 L105 45 L115 55 L100 60 L105 75 L80 65 L60 80 L45 65 L20 70 L25 55 L5 50 Z"
              fill="#FF4500"
              stroke="#FF00CC"
              strokeWidth="2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-lg">!!!</span>
          </div>
        </motion.div>

        {/* Small shrinking bubble (customer) */}
        <motion.div
          initial={{ x: -50, opacity: 0, scale: 0.5 }}
          animate={{ 
            x: [-10, 0, -10],
            opacity: 1, 
            scale: [0.6, 0.5, 0.6]
          }}
          transition={{ 
            x: { duration: 1.5, repeat: Infinity },
            scale: { duration: 2, repeat: Infinity }
          }}
          className="relative"
        >
          <div className="w-14 h-14 bg-slate-500/50 rounded-full border-2 border-dashed border-slate-400 flex items-center justify-center">
            <User className="w-6 h-6 text-slate-400" />
          </div>
          {/* Shrinking indicator */}
          <motion.div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[#FF00CC] text-xs font-bold"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↓ leaving
          </motion.div>
        </motion.div>
      </div>

      {/* Negative indicator */}
      <motion.div
        className="absolute bottom-20 right-4 bg-[#FF4500]/20 border border-[#FF4500] rounded-lg px-3 py-2"
        animate={{ x: [-2, 2, -2] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      >
        <div className="text-[#FF4500] text-xs font-bold">LOYALTY</div>
        <div className="text-white text-lg font-bold">-100%</div>
      </motion.div>
    </div>
  </motion.div>
);

// Scene 4: Phone Tag - Chaotic calendar with ping-pong
const ScenePhoneTag = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex items-center justify-center h-full"
  >
    <div className="relative w-full max-w-md h-72">
      {/* Spinning clock */}
      <motion.div
        className="absolute top-2 right-4"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Clock className="w-10 h-10 text-[#FF4500]" />
      </motion.div>

      {/* Chaotic calendar */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <div className="relative bg-white/10 backdrop-blur rounded-xl p-4 border-2 border-dashed border-[#FF00CC]">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-[#FF4500]" />
            <span className="text-white/60 text-xs font-bold">SCHEDULE CHAOS</span>
          </div>
          
          {/* Calendar grid with X marks and scribbles */}
          <div className="grid grid-cols-5 gap-1">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${
                  i % 3 === 0 
                    ? "bg-[#FF4500]/30 text-[#FF4500]" 
                    : i % 4 === 0 
                    ? "bg-[#FF00CC]/30 text-[#FF00CC]"
                    : "bg-white/5 text-white/30"
                }`}
                animate={i % 2 === 0 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
              >
                {i % 3 === 0 ? "✗" : i % 4 === 0 ? "?" : i + 1}
              </motion.div>
            ))}
          </div>

          {/* Scribble overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 150">
            <motion.path
              d="M20 30 Q80 60, 40 90 T 120 70 T 180 110"
              stroke="#FFD700"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="8 4"
              animate={{ pathOffset: [0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>
      </motion.div>

      {/* Phone ping-pong */}
      <motion.div
        className="absolute left-4 top-1/2 -translate-y-1/2"
        animate={{ 
          x: [0, 120, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Phone className="w-8 h-8 text-[#FF00CC]" />
      </motion.div>

      {/* Question mark block */}
      <motion.div
        className="absolute right-4 top-1/2 -translate-y-1/2"
        animate={{ 
          x: [0, -120, 0],
          y: [-20, 20, -20]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center">
          <HelpCircle className="w-6 h-6 text-[#2D1B69]" />
        </div>
      </motion.div>

      {/* Dotted trail */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 280">
        <motion.path
          d="M40 140 Q100 80, 200 140 T 360 140"
          stroke="#FF00CC"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 6"
          strokeLinecap="round"
          animate={{ pathOffset: [0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Hours wasted counter */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur rounded-lg px-4 py-2"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <div className="text-[#FF4500] text-xs font-bold text-center">HOURS WASTED</div>
        <motion.div
          className="text-white text-xl font-bold text-center"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          +4.5 hrs/week
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
);

const scenes = [SceneAfterHours, SceneEndlessHold, SceneHumanElement, ScenePhoneTag];

const IssuesWeSolveVisualization = () => {
  const { language } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Auto-play through steps every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % issues.length);
    }, 5000);
    
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
              const Icon = issue.icon;
              
              return (
                <motion.button
                  key={issue.id}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    activeStep === index
                      ? 'bg-white shadow-lg border-2 border-[#FF00CC]'
                      : 'bg-white/50 hover:bg-white border-2 border-transparent hover:border-slate-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        activeStep === index
                          ? 'bg-gradient-to-r from-[#FF00CC] to-[#FF4500] text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3
                        className={`font-bold text-sm uppercase tracking-wide transition-colors ${
                          activeStep === index ? 'text-[#FF4500]' : 'text-slate-700'
                        }`}
                      >
                        {language === 'sv' ? issue.titleSv : issue.titleEn}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {language === 'sv' ? issue.descriptionSv : issue.descriptionEn}
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
                  className="h-full bg-gradient-to-r from-[#FF00CC] to-[#FF4500]"
                  initial={{ width: '0%' }}
                  animate={{
                    width: activeStep === index ? '100%' : activeStep > index ? '100%' : '0%',
                  }}
                  transition={{
                    duration: activeStep === index && !isPaused ? 5 : 0.3,
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
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
                  <div className="text-[#FF00CC] text-xs font-bold uppercase tracking-wider mb-1">
                    {language === 'sv' ? 'Problem' : 'Pain Point'} {activeStep + 1}/{issues.length}
                  </div>
                  <div className="text-white font-bold">
                    {language === 'sv' ? currentIssue.titleSv : currentIssue.titleEn}
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Sparkles className="w-6 h-6 text-[#FFD700]" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuesWeSolveVisualization;
