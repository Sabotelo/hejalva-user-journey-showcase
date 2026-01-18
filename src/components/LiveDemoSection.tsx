import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Play, Pause, RotateCcw, Cpu, Phone, Scissors, Car, Stethoscope, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TranscriptLine {
  speaker: "caller" | "alva";
  text: string;
  timestamp: number;
}

interface ActionLog {
  label: string;
  value: string;
  status: "processing" | "success" | "info" | "pending";
  timestamp: number;
}

interface Scenario {
  id: string;
  titleSv: string;
  titleEn: string;
  subtitleSv: string;
  subtitleEn: string;
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

// 1) Vilket ljud som spelas per scenario + transcript-rad (index)
const TRANSCRIPT_SFX: Record<string, Record<number, string>> = {
  booking: {
    0: "/audio/Hairdresser_1.mp3",
    1: "/audio/Hairdresser_2.mp3",
    2: "/audio/Hairdresser_3.mp3",
    3: "/audio/Hairdresser_4.mp3",
  },
  //Lägg till andra scenarios här
};

function playTranscriptSfx(scenarioId: string, transcriptIndex: number) {
  const src = TRANSCRIPT_SFX[scenarioId]?.[transcriptIndex];
  if (!src) return;

  const a = new Audio(src);
  a.volume = 1;
  a.muted = false;

  a.play().catch((e) => {
    console.log("PLAY BLOCKED/FAILED:", e, src);
  });
}

const scenarios: Scenario[] = [
  {
    id: "booking",
    titleSv: "Boka Tid",
    titleEn: "The Booking",
    subtitleSv: "Frisör",
    subtitleEn: "Hairdresser",
    icon: Scissors,
    transcript: [
      { speaker: "caller", text: "Hej, har ni tid för klippning på fredag?", timestamp: 0 },
      {
        speaker: "alva",
        text: "Hej! Fredag ser fullbokad ut i systemet, men jag ser en lucka klockan 10:00 på torsdag. Skulle den tiden passa dig?",
        timestamp: 3,
      },
      { speaker: "caller", text: "Ja, torsdag blir bra.", timestamp: 10 },
      {
        speaker: "alva",
        text: "Utmärkt. Jag skickar en förfrågan till frisören om torsdag klockan 10:00. Så fort de har godkänt bokningen får du en bekräftelse via SMS!",
        timestamp: 13,
      },
    ],
    actions: [
      { label: "User Input", value: "Thursday 10:00", status: "info", timestamp: 0 },
      { label: "Action", value: "Check Availability", status: "processing", timestamp: 3 },
      { label: "Result", value: "→ Slot Open", status: "success", timestamp: 6 },
      { label: "Output", value: "Create Request #402", status: "processing", timestamp: 13 },
      { label: "Status", value: "Pending SME Approval", status: "pending", timestamp: 16 },
    ],
    outcome: {
      type: "sms",
      titleSv: "SMS Bekräftelse",
      titleEn: "SMS Confirmation",
      contentSv:
        "Hej! Din bokningsförfrågan för torsdag kl 10:00 har skickats. Du får bekräftelse så fort frisören godkänner. /Salongen",
      contentEn:
        "Hi! Your booking request for Thursday at 10:00 has been sent. You'll receive confirmation once the stylist approves. /The Salon",
    },
  },
  {
    id: "difficult",
    titleSv: "Svår Kund",
    titleEn: "Tricky Customer",
    subtitleSv: "Bilverkstad",
    subtitleEn: "Auto Workshop",
    icon: Car,
    transcript: [
      { speaker: "caller", text: "Min bil låter konstigt, hur mycket kostar det att fixa den?", timestamp: 0 },
      {
        speaker: "alva",
        text: "Hej, det kan tyda på flera olika saker. Eftersom priset beror på felet behöver verkstaden titta på den först. Jag kan skicka en förfrågan om felsökning imorgon bitti?",
        timestamp: 3,
      },
      { speaker: "caller", text: "Ja, gör det.", timestamp: 12 },
      {
        speaker: "alva",
        text: "Fixat. Jag har skickat ärendet till mekanikern. Om tiden fungerar för dem får du ett SMS med bokningsbekräftelse strax.",
        timestamp: 15,
      },
    ],
    actions: [
      { label: "Intent", value: "Price Inquiry", status: "info", timestamp: 0 },
      { label: "Action", value: "Explain Policy", status: "processing", timestamp: 3 },
      { label: "Note", value: "(Diagnostics first)", status: "info", timestamp: 6 },
      { label: "Output", value: "Draft Case Request", status: "processing", timestamp: 15 },
      { label: "Status", value: "Sent to Workshop Dashboard", status: "success", timestamp: 18 },
    ],
    outcome: {
      type: "email",
      titleSv: "Ärende till Verkstaden",
      titleEn: "Case to Workshop",
      contentSv:
        "Nytt ärende: Felsökning\nKund: Inkommande samtal\nBeskrivning: Bilen låter konstigt\nFöreslagen tid: Imorgon bitti\nStatus: Väntar på godkännande",
      contentEn:
        "New Case: Diagnostics\nCustomer: Incoming call\nDescription: Car making strange noise\nSuggested time: Tomorrow morning\nStatus: Awaiting approval",
    },
  },
  {
    id: "afterhours",
    titleSv: "Efter Stängning",
    titleEn: "After Hours",
    subtitleSv: "Tandläkare",
    subtitleEn: "Dentist",
    icon: Stethoscope,
    transcript: [
      { speaker: "caller", text: "Har ni öppet nu? Jag har så ont i tanden.", timestamp: 0 },
      {
        speaker: "alva",
        text: "Kliniken är stängd för kvällen, men jag ser en möjlig akuttid imorgon klockan 07:30. Ska jag skicka en akut-förfrågan till tandläkaren om den tiden?",
        timestamp: 3,
      },
      { speaker: "caller", text: "Ja snälla.", timestamp: 12 },
      {
        speaker: "alva",
        text: "Det är ordnat. Jag har flaggat detta som akut. Håll utkik i mobilen, du får bekräftelse så fort personalen är på plats imorgon bitti.",
        timestamp: 15,
      },
    ],
    actions: [
      { label: "Time", value: "23:15 (After Hours)", status: "info", timestamp: 0 },
      { label: "Priority", value: "HIGH (Acute pain)", status: "pending", timestamp: 3 },
      { label: "Action", value: "Provisional Booking 07:30", status: "processing", timestamp: 12 },
      { label: "Status", value: "Awaiting Morning Approval", status: "pending", timestamp: 18 },
    ],
    outcome: {
      type: "sms",
      titleSv: "SMS Bekräftelse (23:15)",
      titleEn: "SMS Confirmation (11:15 PM)",
      contentSv:
        "Hej! Din akut-förfrågan för imorgon kl 07:30 har registrerats. Du får bekräftelse så fort kliniken öppnar. /Tandkliniken 🦷",
      contentEn:
        "Hi! Your urgent request for tomorrow at 07:30 has been registered. You'll receive confirmation when the clinic opens. /The Dental Clinic 🦷",
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
  const lastPlayedTranscriptIndexRef = useRef<number>(-1);

  const scenario = scenarios[activeScenario];
  const duration =
    Math.max(...scenario.transcript.map((t) => t.timestamp), ...scenario.actions.map((a) => a.timestamp)) + 5;

  // Reset when scenario changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setVisibleTranscripts([]);
    setVisibleActions([]);
    lastPlayedTranscriptIndexRef.current = -1;
  }, [activeScenario]);

  // Playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
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
      .filter((i) => i !== -1);
    setVisibleTranscripts(newVisibleTranscripts);

    const newVisibleActions = scenario.actions
      .map((a, i) => (a.timestamp <= currentTime ? i : -1))
      .filter((i) => i !== -1);
    setVisibleActions(newVisibleActions);
  }, [currentTime, scenario]);

  // Play audio when a new transcript line becomes visible
  useEffect(() => {
    if (!isPlaying) return;
    if (visibleTranscripts.length === 0) return;

    const newestIndex = visibleTranscripts[visibleTranscripts.length - 1];
    if (newestIndex === lastPlayedTranscriptIndexRef.current) return;

    lastPlayedTranscriptIndexRef.current = newestIndex;
    playTranscriptSfx(scenario.id, newestIndex);
  }, [isPlaying, visibleTranscripts, scenario.id]);

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptRef.current && visibleTranscripts.length > 0) {
      const lastIndex = visibleTranscripts[visibleTranscripts.length - 1];
      const element = transcriptRef.current.children[lastIndex] as HTMLElement;
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
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
    lastPlayedTranscriptIndexRef.current = -1;
    setIsPlaying(true);
  };

  // Generate waveform bars
  const bars = 30;
  const generateBarHeight = (index: number, time: number) => {
    if (!isPlaying) return 8;
    const wave = Math.sin(time * 4 + index * 0.4) * 0.5 + 0.5;
    const random = Math.sin(index * 1.8 + time * 3) * 0.3 + 0.7;
    return 8 + wave * random * 40;
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
            {language === "sv" ? "Lyssna på Alva i Aktion" : "Listen to Alva in Action"}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {language === "sv"
              ? "Välj ett scenario nedan för att höra hur Alva hanterar verkliga affärssamtal."
              : "Choose a scenario below to hear how Alva handles real-world business conversations."}
          </p>
        </div>

        {/* Scenario Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {scenarios.map((s, index) => (
            <button
              key={s.id}
              onClick={() => setActiveScenario(index)}
              className={`flex flex-col items-center gap-1 px-6 py-4 rounded-xl font-medium transition-all duration-300 min-w-[140px] ${
                activeScenario === index
                  ? "bg-[#00F5FF] text-[#0A2342] shadow-[0_0_30px_rgba(0,245,255,0.4)]"
                  : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              <s.icon className="h-5 w-5" />
              <span className="text-sm font-semibold">{language === "sv" ? s.titleSv : s.titleEn}</span>
              <span className={`text-xs ${activeScenario === index ? "text-[#0A2342]/70" : "text-white/50"}`}>
                {language === "sv" ? s.subtitleSv : s.subtitleEn}
              </span>
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
                          ? "bg-white/20 hover:bg-white/30"
                          : "bg-[#00F5FF] hover:bg-[#00F5FF]/90 shadow-[0_0_40px_rgba(0,245,255,0.5)]"
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
                      {language === "sv" ? "Börja om" : "Restart"}
                    </Button>
                  </div>
                </div>

                {/* Transcript */}
                <div
                  className="rounded-xl bg-[#0A2342]/60 border border-white/10 p-4 h-48 overflow-y-auto"
                  ref={transcriptRef}
                >
                  <AnimatePresence>
                    {scenario.transcript.map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: visibleTranscripts.includes(index) ? 1 : 0.2,
                          y: visibleTranscripts.includes(index) ? 0 : 10,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`mb-3 ${!visibleTranscripts.includes(index) && "hidden"}`}
                      >
                        <div className={`flex gap-2 ${line.speaker === "alva" ? "justify-start" : "justify-end"}`}>
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                              line.speaker === "alva"
                                ? "bg-[#00F5FF]/20 text-white rounded-tl-sm"
                                : "bg-white/10 text-white/80 rounded-tr-sm"
                            }`}
                          >
                            <span
                              className={`text-[10px] font-medium block mb-1 ${
                                line.speaker === "alva" ? "text-[#00F5FF]" : "text-white/50"
                              }`}
                            >
                              {line.speaker === "alva" ? "Alva" : language === "sv" ? "Kund" : "Customer"}
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
                        {language === "sv" ? "Tryck på play för att starta..." : "Press play to start..."}
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
                      {language === "sv" ? "MIMER HJÄRNA" : "MIMER BRAIN"}
                    </span>
                    <span className="ml-auto flex items-center gap-1">
                      <span
                        className={`h-2 w-2 rounded-full ${isPlaying ? "bg-[#00F5FF] animate-pulse" : "bg-white/30"}`}
                      />
                      <span className="text-[10px] text-white/50 font-mono">{isPlaying ? "ACTIVE" : "STANDBY"}</span>
                    </span>
                  </div>

                  {/* Action log entries - structured format */}
                  <div className="p-4 h-80 overflow-y-auto font-mono text-xs space-y-3">
                    <AnimatePresence>
                      {scenario.actions.map((action, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: visibleActions.includes(index) ? 1 : 0,
                            x: visibleActions.includes(index) ? 0 : -10,
                          }}
                          transition={{ duration: 0.3 }}
                          className={`${!visibleActions.includes(index) && "hidden"}`}
                        >
                          <div className="flex items-start gap-2">
                            <span
                              className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                                action.status === "success"
                                  ? "bg-green-400"
                                  : action.status === "processing"
                                    ? "bg-yellow-400 animate-pulse"
                                    : action.status === "pending"
                                      ? "bg-orange-400"
                                      : "bg-[#00F5FF]"
                              }`}
                            />
                            <div className="flex-1">
                              <span className="text-white/50">{action.label}:</span>
                              <span
                                className={`ml-2 ${
                                  action.status === "success"
                                    ? "text-green-400"
                                    : action.status === "pending"
                                      ? "text-orange-400"
                                      : "text-white/80"
                                }`}
                              >
                                {action.value}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {visibleActions.length === 0 && (
                      <div className="h-full flex items-center justify-center">
                        <span className="text-white/30">{">"} Waiting for input...</span>
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
                        {language === "sv" ? "Resultat:" : "Outcome:"}
                      </div>
                      {/* Phone mockup for SMS */}
                      {scenario.outcome.type === "sms" ? (
                        <div className="w-52 rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 p-2 shadow-xl">
                          <div className="rounded-xl bg-white p-3">
                            <div className="text-[10px] text-gray-500 mb-1">
                              {language === "sv" ? scenario.outcome.titleSv : scenario.outcome.titleEn}
                            </div>
                            <div className="bg-[#00F5FF]/10 rounded-lg p-2 text-xs text-gray-700 leading-relaxed">
                              {language === "sv" ? scenario.outcome.contentSv : scenario.outcome.contentEn}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-72 rounded-lg bg-white shadow-xl overflow-hidden">
                          <div className="bg-gray-100 px-3 py-2 border-b">
                            <div className="text-[10px] text-gray-500">
                              {language === "sv" ? scenario.outcome.titleSv : scenario.outcome.titleEn}
                            </div>
                          </div>
                          <div className="p-3 text-xs text-gray-700 whitespace-pre-line font-mono leading-relaxed">
                            {language === "sv" ? scenario.outcome.contentSv : scenario.outcome.contentEn}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex-grow text-center md:text-left">
                      <p className="text-white/60 text-sm max-w-md">
                        {language === "sv"
                          ? "Alva hanterade samtalet och skickade förfrågan till företaget. Du godkänner eller ombokar – du har alltid kontrollen."
                          : "Alva handled the call and sent the request to the business. You approve or reschedule – you're always in control."}
                      </p>
                      <Button
                        className="mt-4 bg-[#00F5FF] text-[#0A2342] hover:bg-[#00F5FF]/90 shadow-[0_0_20px_rgba(0,245,255,0.3)]"
                        onClick={() => (window.location.href = "tel:+46737587867")}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        {language === "sv" ? "Testa Live: Ring Alva" : "Try Live: Call Alva"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Marketing Tip - Control Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 max-w-3xl mx-auto"
          >
            <Info className="h-5 w-5 text-[#00F5FF] flex-shrink-0 mt-0.5" />
            <p className="text-white/70 text-sm leading-relaxed">
              {language === "sv"
                ? 'Alva skriver inte över ditt schema. Hon förhandlar tiden, fångar kunduppgifterna och skickar en förfrågan till dig. Du klickar bara "Godkänn" eller "Omboka". Du har alltid kontrollen.'
                : 'Alva doesn\'t overwrite your schedule. She negotiates the time, captures the customer details, and sends you a request. You simply click "Accept" or "Reschedule". You are always in control.'}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemoSection;
