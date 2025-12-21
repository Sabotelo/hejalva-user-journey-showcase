import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Play, Pause, RotateCcw, MessageSquare, Cpu, Phone, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TranscriptLine {
  speaker: "caller" | "alva";
  text: string;
  timestamp: number;
}

interface ActionLog {
  action: string;
  status: "processing" | "success" | "info";
  timestamp: number;
}

interface Scenario {
  id: string;
  titleSv: string;
  titleEn: string;
  icon: typeof Phone;
  transcript: TranscriptLine[];
  actions: ActionLog[];
  outcome: {
    type: "sms" | "email";
    titleSv: string;
    titleEn: string;
    contentSv: string;
    contentEn: string;
  };
}

const scenarios: Scenario[] = [
  {
    id: "booking",
    titleSv: "Boka Tid",
    titleEn: "Booking",
    icon: Calendar,
    transcript: [
      { speaker: "caller", text: "Hej, jag skulle vilja boka en tid hos er.", timestamp: 0 },
      { speaker: "alva", text: "Hej och välkommen! Självklart kan jag hjälpa dig med det. Vilken dag passar dig bäst?", timestamp: 3 },
      { speaker: "caller", text: "Har ni något på tisdag nästa vecka?", timestamp: 8 },
      { speaker: "alva", text: "Jag kollar direkt... Ja, vi har ledigt klockan 10:00 och 14:00 på tisdag. Vilken tid föredrar du?", timestamp: 11 },
      { speaker: "caller", text: "Klockan 14 passar perfekt.", timestamp: 17 },
      { speaker: "alva", text: "Utmärkt! Jag bokar in dig tisdag klockan 14:00. Du får en bekräftelse via SMS inom kort. Något mer jag kan hjälpa dig med?", timestamp: 20 },
      { speaker: "caller", text: "Nej, det var allt. Tack så mycket!", timestamp: 27 },
      { speaker: "alva", text: "Tack för att du ringde! Vi ses på tisdag. Ha en fin dag!", timestamp: 30 },
    ],
    actions: [
      { action: "Inkommande samtal identifierat", status: "info", timestamp: 0 },
      { action: "Startar bokningsflöde", status: "processing", timestamp: 3 },
      { action: "Söker lediga tider: Tisdag", status: "processing", timestamp: 11 },
      { action: "2 tider tillgängliga", status: "success", timestamp: 13 },
      { action: "Bokar tid: Tisdag 14:00", status: "processing", timestamp: 20 },
      { action: "Bokning bekräftad ✓", status: "success", timestamp: 22 },
      { action: "Skickar SMS-bekräftelse", status: "processing", timestamp: 24 },
      { action: "SMS levererat ✓", status: "success", timestamp: 26 },
    ],
    outcome: {
      type: "sms",
      titleSv: "SMS Bekräftelse",
      titleEn: "SMS Confirmation",
      contentSv: "Hej! Din tid är bokad för tisdag kl 14:00. Välkommen! /Kliniken",
      contentEn: "Hi! Your appointment is booked for Tuesday at 2:00 PM. Welcome! /The Clinic",
    },
  },
  {
    id: "difficult",
    titleSv: "Svår Kund",
    titleEn: "Tricky Customer",
    icon: MessageSquare,
    transcript: [
      { speaker: "caller", text: "Hallå? Jag har väntat i evigheter på att någon ska svara!", timestamp: 0 },
      { speaker: "alva", text: "Jag förstår din frustration och ber om ursäkt för väntetiden. Jag är Alva och ska göra mitt bästa för att hjälpa dig. Vad gäller ditt ärende?", timestamp: 3 },
      { speaker: "caller", text: "Jag fick helt fel tid förra veckan. Det är inte acceptabelt!", timestamp: 10 },
      { speaker: "alva", text: "Det låter verkligen jobbigt, och jag beklagar att det blev fel. Låt mig se vad jag kan göra för att rätta till det. Kan du ge mig ditt namn så kollar jag din bokning?", timestamp: 14 },
      { speaker: "caller", text: "Erik Svensson. Men jag vill prata med en chef!", timestamp: 22 },
      { speaker: "alva", text: "Jag noterar det, Erik. Jag ser här att det blev en dubbel bokning. Jag kan erbjuda dig en ny tid redan imorgon kl 09:00 med 20% rabatt som kompensation. Eller så ber jag chefen återkomma inom 2 timmar. Vad föredrar du?", timestamp: 26 },
      { speaker: "caller", text: "Okej... Imorgon kl 9 funkar. Och rabatten låter bra.", timestamp: 38 },
      { speaker: "alva", text: "Perfekt, Erik! Du är nu bokad imorgon kl 09:00 med 20% rabatt. Jag skickar en bekräftelse. Tack för ditt tålamod!", timestamp: 42 },
    ],
    actions: [
      { action: "Missnöjd kund detekterad", status: "info", timestamp: 0 },
      { action: "Aktiverar empati-protokoll", status: "processing", timestamp: 3 },
      { action: "Söker kundhistorik: Erik Svensson", status: "processing", timestamp: 22 },
      { action: "Hittat: Bokningskonflikt 15/12", status: "info", timestamp: 24 },
      { action: "Genererar kompensationserbjudande", status: "processing", timestamp: 26 },
      { action: "Rabattkod skapad: 20%", status: "success", timestamp: 28 },
      { action: "Ny bokning: Imorgon 09:00", status: "success", timestamp: 42 },
      { action: "Ärendet löst ✓", status: "success", timestamp: 44 },
    ],
    outcome: {
      type: "email",
      titleSv: "Ärenderapport till Ägaren",
      titleEn: "Case Report to Owner",
      contentSv: "Kund: Erik Svensson\nÄrende: Bokningsfel (löst)\nKompensation: 20% rabatt\nNy tid: Imorgon 09:00",
      contentEn: "Customer: Erik Svensson\nIssue: Booking error (resolved)\nCompensation: 20% discount\nNew time: Tomorrow 09:00",
    },
  },
  {
    id: "afterhours",
    titleSv: "Efter Stängning",
    titleEn: "After Hours",
    icon: Clock,
    transcript: [
      { speaker: "caller", text: "Hej, är ni öppna? Jag behöver verkligen boka en tid.", timestamp: 0 },
      { speaker: "alva", text: "Hej! Tack för att du ringer. Våra kontor är stängda just nu, men jag är Alva och kan hjälpa dig med bokning dygnet runt. Vad kan jag göra för dig?", timestamp: 3 },
      { speaker: "caller", text: "Åh, vad skönt! Jag jobbar dagtid så det är svårt att ringa. Har ni något på fredag eftermiddag?", timestamp: 10 },
      { speaker: "alva", text: "Självklart, jag förstår. Låt mig kolla fredagens tider... Vi har 15:30 och 16:00 ledigt. Passar någon av de?", timestamp: 17 },
      { speaker: "caller", text: "15:30 är perfekt!", timestamp: 24 },
      { speaker: "alva", text: "Toppen! Jag bokar dig på fredag kl 15:30. Kan jag få ditt namn och telefonnummer för bekräftelsen?", timestamp: 27 },
      { speaker: "caller", text: "Lisa Andersson, 070-123 45 67.", timestamp: 33 },
      { speaker: "alva", text: "Tack Lisa! Din bokning är klar. Du får SMS-bekräftelse nu direkt. Sov gott och välkommen på fredag!", timestamp: 36 },
    ],
    actions: [
      { action: "Samtal utanför öppettider", status: "info", timestamp: 0 },
      { action: "24/7 Bokningsläge aktivt", status: "success", timestamp: 3 },
      { action: "Söker tider: Fredag eftermiddag", status: "processing", timestamp: 17 },
      { action: "2 tider tillgängliga", status: "success", timestamp: 19 },
      { action: "Registrerar ny kund", status: "processing", timestamp: 33 },
      { action: "Kund skapad: Lisa Andersson", status: "success", timestamp: 34 },
      { action: "Bokning: Fredag 15:30 ✓", status: "success", timestamp: 36 },
      { action: "SMS-bekräftelse skickad", status: "success", timestamp: 38 },
    ],
    outcome: {
      type: "sms",
      titleSv: "SMS Bekräftelse (23:47)",
      titleEn: "SMS Confirmation (11:47 PM)",
      contentSv: "Hej Lisa! Din tid är bokad för fredag kl 15:30. Välkommen! /Kliniken 🌙",
      contentEn: "Hi Lisa! Your appointment is booked for Friday at 3:30 PM. Welcome! /The Clinic 🌙",
    },
  },
];

const LiveDemoSection = () => {
  const { language } = useLanguage();
  const [activeScenario, setActiveScenario] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [visibleTranscripts, setVisibleTranscripts] = useState<number[]>([]);
  const [visibleActions, setVisibleActions] = useState<number[]>([]);
  const transcriptRef = useRef<HTMLDivElement>(null);
  
  const scenario = scenarios[activeScenario];
  const duration = Math.max(
    ...scenario.transcript.map(t => t.timestamp),
    ...scenario.actions.map(a => a.timestamp)
  ) + 5;

  // Reset when scenario changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setVisibleTranscripts([]);
    setVisibleActions([]);
  }, [activeScenario]);

  // Playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 0.1;
          if (newTime >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return newTime;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  // Update visible items based on current time
  useEffect(() => {
    const newVisibleTranscripts = scenario.transcript
      .map((t, i) => (t.timestamp <= currentTime ? i : -1))
      .filter(i => i !== -1);
    setVisibleTranscripts(newVisibleTranscripts);

    const newVisibleActions = scenario.actions
      .map((a, i) => (a.timestamp <= currentTime ? i : -1))
      .filter(i => i !== -1);
    setVisibleActions(newVisibleActions);
  }, [currentTime, scenario]);

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptRef.current && visibleTranscripts.length > 0) {
      const lastIndex = visibleTranscripts[visibleTranscripts.length - 1];
      const element = transcriptRef.current.children[lastIndex] as HTMLElement;
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [visibleTranscripts]);

  const togglePlay = () => {
    if (currentTime >= duration) {
      setCurrentTime(0);
      setVisibleTranscripts([]);
      setVisibleActions([]);
    }
    setIsPlaying(!isPlaying);
  };

  const restart = () => {
    setCurrentTime(0);
    setVisibleTranscripts([]);
    setVisibleActions([]);
    setIsPlaying(true);
  };

  // Generate waveform bars
  const bars = 30;
  const generateBarHeight = (index: number, time: number) => {
    if (!isPlaying) return 8;
    const wave = Math.sin((time * 4) + (index * 0.4)) * 0.5 + 0.5;
    const random = Math.sin(index * 1.8 + time * 3) * 0.3 + 0.7;
    return 8 + (wave * random * 40);
  };

  return (
    <section className="py-20 bg-[#0A2342] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00F5FF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-glow/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {language === 'sv' ? 'Lyssna på Alva i Aktion' : 'Listen to Alva in Action'}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {language === 'sv' 
              ? 'Välj ett scenario nedan för att höra hur Alva hanterar verkliga affärssamtal.'
              : 'Choose a scenario below to hear how Alva handles real-world business conversations.'}
          </p>
        </div>

        {/* Scenario Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {scenarios.map((s, index) => (
            <button
              key={s.id}
              onClick={() => setActiveScenario(index)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300 ${
                activeScenario === index
                  ? 'bg-[#00F5FF] text-[#0A2342] shadow-[0_0_30px_rgba(0,245,255,0.4)]'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <s.icon className="h-4 w-4" />
              {language === 'sv' ? s.titleSv : s.titleEn}
            </button>
          ))}
        </div>

        {/* Main Player Card */}
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
            
            {/* Two-column layout */}
            <div className="grid md:grid-cols-5 gap-6">
              
              {/* Left: Voice Side */}
              <div className="md:col-span-3 space-y-6">
                {/* Waveform Visualizer */}
                <div className="relative h-24 flex items-center justify-center gap-[3px] rounded-xl bg-[#0A2342]/80 border border-[#00F5FF]/20 px-4 overflow-hidden">
                  {[...Array(bars)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 rounded-full bg-gradient-to-t from-[#00F5FF] to-[#00F5FF]/60"
                      animate={{
                        height: generateBarHeight(i, currentTime),
                        opacity: isPlaying ? 0.6 + Math.sin(i * 0.5) * 0.4 : 0.3,
                      }}
                      transition={{
                        height: { duration: 0.1, ease: "easeOut" },
                        opacity: { duration: 0.2 },
                      }}
                    />
                  ))}
                  
                  {/* Center play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      onClick={togglePlay}
                      className={`h-16 w-16 rounded-full transition-all duration-300 ${
                        isPlaying 
                          ? 'bg-white/20 hover:bg-white/30' 
                          : 'bg-[#00F5FF] hover:bg-[#00F5FF]/90 shadow-[0_0_40px_rgba(0,245,255,0.5)]'
                      }`}
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6 text-white" />
                      ) : (
                        <Play className="h-6 w-6 text-[#0A2342] ml-1" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full bg-gradient-to-r from-[#00F5FF] to-[#00F5FF]/60"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/50 font-mono">
                      {Math.floor(currentTime)}s / {Math.floor(duration)}s
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={restart}
                      className="text-white/50 hover:text-white h-6 px-2"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      {language === 'sv' ? 'Börja om' : 'Restart'}
                    </Button>
                  </div>
                </div>

                {/* Transcript */}
                <div className="rounded-xl bg-[#0A2342]/60 border border-white/10 p-4 h-48 overflow-y-auto" ref={transcriptRef}>
                  <AnimatePresence>
                    {scenario.transcript.map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: visibleTranscripts.includes(index) ? 1 : 0.2,
                          y: visibleTranscripts.includes(index) ? 0 : 10 
                        }}
                        transition={{ duration: 0.3 }}
                        className={`mb-3 ${!visibleTranscripts.includes(index) && 'hidden'}`}
                      >
                        <div className={`flex gap-2 ${line.speaker === 'alva' ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                            line.speaker === 'alva' 
                              ? 'bg-[#00F5FF]/20 text-white rounded-tl-sm' 
                              : 'bg-white/10 text-white/80 rounded-tr-sm'
                          }`}>
                            <span className={`text-[10px] font-medium block mb-1 ${
                              line.speaker === 'alva' ? 'text-[#00F5FF]' : 'text-white/50'
                            }`}>
                              {line.speaker === 'alva' ? 'Alva' : (language === 'sv' ? 'Kund' : 'Customer')}
                            </span>
                            <p className="text-sm leading-relaxed">{line.text}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {visibleTranscripts.length === 0 && (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-white/30 text-sm">
                        {language === 'sv' ? 'Tryck på play för att starta...' : 'Press play to start...'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Brain Side (Action Log) */}
              <div className="md:col-span-2">
                <div className="rounded-xl bg-[#0A2342] border border-[#00F5FF]/20 h-full overflow-hidden">
                  {/* Terminal header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#00F5FF]/10 border-b border-[#00F5FF]/20">
                    <Cpu className="h-4 w-4 text-[#00F5FF]" />
                    <span className="text-xs font-mono text-[#00F5FF]">
                      {language === 'sv' ? 'MIMER HJÄRNA' : 'MIMER BRAIN'}
                    </span>
                    <span className="ml-auto flex items-center gap-1">
                      <span className={`h-2 w-2 rounded-full ${isPlaying ? 'bg-[#00F5FF] animate-pulse' : 'bg-white/30'}`} />
                      <span className="text-[10px] text-white/50 font-mono">
                        {isPlaying ? 'ACTIVE' : 'STANDBY'}
                      </span>
                    </span>
                  </div>
                  
                  {/* Action log entries */}
                  <div className="p-4 h-80 overflow-y-auto font-mono text-xs space-y-2">
                    <AnimatePresence>
                      {scenario.actions.map((action, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ 
                            opacity: visibleActions.includes(index) ? 1 : 0,
                            x: visibleActions.includes(index) ? 0 : -10
                          }}
                          transition={{ duration: 0.3 }}
                          className={`flex items-start gap-2 ${!visibleActions.includes(index) && 'hidden'}`}
                        >
                          <span className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 ${
                            action.status === 'success' ? 'bg-green-400' :
                            action.status === 'processing' ? 'bg-yellow-400 animate-pulse' :
                            'bg-[#00F5FF]'
                          }`} />
                          <span className="text-white/70 leading-relaxed">{action.action}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {visibleActions.length === 0 && (
                      <div className="h-full flex items-center justify-center">
                        <span className="text-white/30">{'>'} Waiting for input...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Outcome Section */}
            <AnimatePresence>
              {currentTime >= duration - 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="text-sm font-medium text-[#00F5FF] mb-2">
                        {language === 'sv' ? 'Resultat:' : 'Outcome:'}
                      </div>
                      {/* Phone mockup for SMS */}
                      {scenario.outcome.type === 'sms' ? (
                        <div className="w-48 rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 p-2 shadow-xl">
                          <div className="rounded-xl bg-white p-3">
                            <div className="text-[10px] text-gray-500 mb-1">
                              {language === 'sv' ? scenario.outcome.titleSv : scenario.outcome.titleEn}
                            </div>
                            <div className="bg-[#00F5FF]/10 rounded-lg p-2 text-xs text-gray-700">
                              {language === 'sv' ? scenario.outcome.contentSv : scenario.outcome.contentEn}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-64 rounded-lg bg-white shadow-xl overflow-hidden">
                          <div className="bg-gray-100 px-3 py-2 border-b">
                            <div className="text-[10px] text-gray-500">
                              {language === 'sv' ? scenario.outcome.titleSv : scenario.outcome.titleEn}
                            </div>
                          </div>
                          <div className="p-3 text-xs text-gray-700 whitespace-pre-line font-mono">
                            {language === 'sv' ? scenario.outcome.contentSv : scenario.outcome.contentEn}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow text-center md:text-left">
                      <p className="text-white/60 text-sm max-w-md">
                        {language === 'sv' 
                          ? 'Alva hanterade samtalet, bokade tiden och skickade bekräftelse – helt automatiskt, dygnet runt.'
                          : 'Alva handled the call, booked the appointment, and sent confirmation – fully automatic, 24/7.'}
                      </p>
                      <Button 
                        className="mt-4 bg-[#00F5FF] text-[#0A2342] hover:bg-[#00F5FF]/90 shadow-[0_0_20px_rgba(0,245,255,0.3)]"
                        onClick={() => window.location.href = 'tel:+46737587867'}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        {language === 'sv' ? 'Testa Live: Ring Alva' : 'Try Live: Call Alva'}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemoSection;