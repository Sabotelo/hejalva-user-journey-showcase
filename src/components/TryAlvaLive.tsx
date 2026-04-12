import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useConversation } from "@elevenlabs/react";
import { Phone, PhoneOff, Mic, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const TryAlvaLive = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);

  const conversation = useConversation({
    onConnect: () => setIsConnecting(false),
    onDisconnect: () => {},
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

  const startConversation = useCallback(async () => {
    setIsConnecting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const { data, error } = await supabase.functions.invoke('elevenlabs-conversation-token', {
        body: { scenario: 'workshop' }
      });
      if (error || !data?.signed_url) throw new Error(error?.message || 'Failed to get signed URL');
      await conversation.startSession({ signedUrl: data.signed_url });
    } catch (error) {
      console.error("Failed to start conversation:", error);
      setIsConnecting(false);
      toast({
        variant: "destructive",
        title: language === 'sv' ? "Fel" : "Error",
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }, [conversation, language, toast]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <section id="try-alva" className="py-20 px-6 bg-sand">
      <div className="max-w-[600px] mx-auto">
        <ScrollAnimation className="text-center mb-10">
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-night mb-3">
            {language === 'sv' ? 'Prata med Alva direkt' : 'Talk to Alva Now'}
          </h2>
          <p className="text-bark text-lg max-w-[480px] mx-auto">
            {language === 'sv'
              ? 'Tryck på knappen och prata med Alva direkt i din webbläsare.'
              : 'Press the button and talk to Alva right in your browser.'}
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="bg-cream border border-sand-dark rounded-2xl p-8 md:p-10 shadow-elevated">
            <div className="flex flex-col items-center gap-6">
              {/* Voice indicator */}
              <div className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
                conversation.status === 'connected' ? 'bg-moss-pale' : 'bg-sand'
              }`}>
                {conversation.isSpeaking && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-moss"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-moss"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    />
                  </>
                )}
                <Mic className={`h-8 w-8 transition-colors ${
                  conversation.status === 'connected'
                    ? conversation.isSpeaking ? 'text-moss' : 'text-earth'
                    : 'text-stone'
                }`} />
              </div>

              {/* Status text */}
              <p className={`text-base font-medium ${
                conversation.status === 'connected' ? 'text-moss' : 'text-bark'
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

              {/* Call button */}
              {conversation.status === 'disconnected' ? (
                <button
                  onClick={startConversation}
                  disabled={isConnecting}
                  className="inline-flex items-center gap-2 bg-earth text-cream px-8 py-4 rounded-full font-semibold text-base hover:bg-night transition-all duration-300 shadow-[0_4px_24px_rgba(92,79,61,0.15)] hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {isConnecting ? (
                    <><Loader2 className="h-5 w-5 animate-spin" />{language === 'sv' ? 'Ansluter...' : 'Connecting...'}</>
                  ) : (
                    <><Phone className="h-5 w-5" />{language === 'sv' ? 'Prata med Alva' : 'Talk to Alva'}</>
                  )}
                </button>
              ) : (
                <button
                  onClick={stopConversation}
                  className="inline-flex items-center gap-2 bg-accent-warm text-cream px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 transition-all duration-300"
                >
                  <PhoneOff className="h-5 w-5" />
                  {language === 'sv' ? 'Avsluta samtal' : 'End Call'}
                </button>
              )}
            </div>

            <p className="text-center text-stone text-xs mt-6">
              {language === 'sv'
                ? '💡 Prata svenska med Alva — hon förstår och svarar på ditt språk!'
                : '💡 Speak Swedish with Alva — she understands and responds in your language!'}
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default TryAlvaLive;
