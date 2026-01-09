import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useConversation } from "@elevenlabs/react";
import { Phone, PhoneOff, Mic, Pizza, Scissors, Car, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Scenario {
  id: string;
  titleSv: string;
  titleEn: string;
  descriptionSv: string;
  descriptionEn: string;
  icon: typeof Phone;
  enabled: boolean;
}

const scenarios: Scenario[] = [
  {
    id: "pizzeria",
    titleSv: "Pizzeria",
    titleEn: "Pizzeria",
    descriptionSv: "Ring och beställ en pizza eller boka bord",
    descriptionEn: "Call to order pizza or book a table",
    icon: Pizza,
    enabled: false,
  },
  {
    id: "salon",
    titleSv: "Frisörsalong",
    titleEn: "Hair Salon",
    descriptionSv: "Boka tid för klippning eller behandling",
    descriptionEn: "Book an appointment for a haircut or treatment",
    icon: Scissors,
    enabled: false,
  },
  {
    id: "workshop",
    titleSv: "Bilverkstad",
    titleEn: "Auto Workshop",
    descriptionSv: "Boka service eller felsökning",
    descriptionEn: "Book service or diagnostics",
    icon: Car,
    enabled: true,
  },
];

const TryAlvaLive = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [activeScenario, setActiveScenario] = useState(2); // Default to workshop (index 2)
  const [isConnecting, setIsConnecting] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to Alva");
      setIsConnecting(false);
    },
    onDisconnect: () => {
      console.log("Disconnected from Alva");
    },
    onError: (error) => {
      console.error("Conversation error:", error);
      setIsConnecting(false);
      toast({
        variant: "destructive",
        title: language === 'sv' ? "Anslutningsfel" : "Connection Error",
        description: language === 'sv' 
          ? "Kunde inte ansluta till Alva. Försök igen."
          : "Failed to connect to Alva. Please try again.",
      });
    },
  });

  const scenario = scenarios[activeScenario];

  const startConversation = useCallback(async () => {
    if (!scenario.enabled) {
      toast({
        title: language === 'sv' ? "Kommer snart" : "Coming Soon",
        description: language === 'sv'
          ? "Detta scenario är under utveckling."
          : "This scenario is under development.",
      });
      return;
    }

    setIsConnecting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const { data, error } = await supabase.functions.invoke('elevenlabs-conversation-token', {
        body: { scenario: scenario.id }
      });

      if (error || !data?.signed_url) {
        throw new Error(error?.message || 'Failed to get signed URL');
      }

      await conversation.startSession({
        signedUrl: data.signed_url,
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
      setIsConnecting(false);
      toast({
        variant: "destructive",
        title: language === 'sv' ? "Fel" : "Error",
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }, [conversation, language, toast, scenario]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <section id="try-alva" className="py-20 bg-gradient-to-b from-[#0A2342] to-[#061428] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#00F5FF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary-glow/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/20 mb-6">
            <Phone className="h-4 w-4 text-[#00F5FF]" />
            <span className="text-sm font-medium text-[#00F5FF]">
              {language === 'sv' ? 'Live Demo' : 'Live Demo'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {language === 'sv' ? 'Prata med Alva Nu' : 'Talk to Alva Now'}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {language === 'sv' 
              ? 'Välj ett scenario och ring Alva direkt. Upplev hur hon hanterar verkliga samtal.'
              : 'Choose a scenario and call Alva directly. Experience how she handles real conversations.'}
          </p>
        </div>

        {/* Scenario Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {scenarios.map((s, index) => (
            <button
              key={s.id}
              onClick={() => {
                if (conversation.status === 'connected') {
                  stopConversation();
                }
                setActiveScenario(index);
              }}
              disabled={conversation.status === 'connected'}
              className={`relative flex flex-col items-center gap-2 px-8 py-6 rounded-2xl font-medium transition-all duration-300 min-w-[160px] ${
                activeScenario === index
                  ? s.enabled 
                    ? 'bg-[#00F5FF] text-[#0A2342] shadow-[0_0_40px_rgba(0,245,255,0.4)]'
                    : 'bg-white/20 text-white/60 border border-white/20'
                  : s.enabled
                    ? 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white disabled:opacity-50'
                    : 'bg-white/5 text-white/40 border border-white/10 opacity-60'
              }`}
            >
              {!s.enabled && (
                <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-semibold bg-white/20 text-white/60 rounded-full">
                  {language === 'sv' ? 'Snart' : 'Soon'}
                </span>
              )}
              <s.icon className="h-8 w-8" />
              <span className="text-base font-semibold">
                {language === 'sv' ? s.titleSv : s.titleEn}
              </span>
            </button>
          ))}
        </div>

        {/* Main Call Interface */}
        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Scenario Info */}
            <div className="text-center mb-8">
              <scenario.icon className="h-12 w-12 text-[#00F5FF] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                {language === 'sv' ? scenario.titleSv : scenario.titleEn}
              </h3>
              <p className="text-white/60">
                {language === 'sv' ? scenario.descriptionSv : scenario.descriptionEn}
              </p>
            </div>


            {/* Call Status */}
            <div className="flex flex-col items-center gap-6">
              {/* Voice Indicator */}
              <div className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
                conversation.status === 'connected'
                  ? 'bg-[#00F5FF]/20'
                  : 'bg-white/5'
              }`}>
                {/* Animated rings when speaking */}
                {conversation.isSpeaking && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#00F5FF]"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#00F5FF]"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    />
                  </>
                )}
                
                <Mic className={`h-12 w-12 transition-colors ${
                  conversation.status === 'connected' 
                    ? conversation.isSpeaking 
                      ? 'text-[#00F5FF]' 
                      : 'text-white' 
                    : 'text-white/40'
                }`} />
              </div>

              {/* Status Text */}
              <p className={`text-lg font-medium ${
                conversation.status === 'connected' ? 'text-[#00F5FF]' : 'text-white/60'
              }`}>
                {isConnecting 
                  ? (language === 'sv' ? 'Ansluter...' : 'Connecting...')
                  : conversation.status === 'connected'
                    ? conversation.isSpeaking
                      ? (language === 'sv' ? 'Alva pratar...' : 'Alva is speaking...')
                      : (language === 'sv' ? 'Alva lyssnar...' : 'Alva is listening...')
                    : (language === 'sv' ? 'Tryck för att ringa' : 'Press to call')
                }
              </p>

              {/* Call Button */}
              {conversation.status === 'disconnected' ? (
                <Button
                  size="lg"
                  onClick={startConversation}
                  disabled={isConnecting || !scenario.enabled}
                  className={`h-16 px-10 rounded-full font-semibold text-lg transition-all duration-300 ${
                    scenario.enabled
                      ? 'bg-[#00F5FF] hover:bg-[#00F5FF]/90 text-[#0A2342] shadow-[0_0_40px_rgba(0,245,255,0.4)] hover:shadow-[0_0_60px_rgba(0,245,255,0.6)]'
                      : 'bg-white/20 text-white/40 cursor-not-allowed'
                  }`}
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      {language === 'sv' ? 'Ansluter...' : 'Connecting...'}
                    </>
                  ) : !scenario.enabled ? (
                    <>{language === 'sv' ? 'Kommer snart' : 'Coming Soon'}</>
                  ) : (
                    <>
                      <Phone className="h-5 w-5 mr-2" />
                      {language === 'sv' ? 'Ring Alva' : 'Call Alva'}
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={stopConversation}
                  className="h-16 px-10 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold text-lg transition-all duration-300"
                >
                  <PhoneOff className="h-5 w-5 mr-2" />
                  {language === 'sv' ? 'Avsluta samtal' : 'End Call'}
                </Button>
              )}
            </div>

            {/* Tip */}
            <p className="text-center text-white/40 text-sm mt-8">
              {language === 'sv' 
                ? '💡 Tips: Prata svenska med Alva – hon förstår och svarar på ditt språk!'
                : '💡 Tip: Speak Swedish with Alva – she understands and responds in your language!'}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TryAlvaLive;
