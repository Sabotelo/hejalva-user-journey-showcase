import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useConversation } from "@elevenlabs/react";
import { Phone, PhoneOff, Mic, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const TryAlvaLive = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      setIsConnecting(false);
    },
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
  }, [conversation, language, toast]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <section id="try-alva" className="py-20 bg-gradient-to-b from-primary-dark to-primary relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {language === 'sv' ? 'Prata med Alva direkt' : 'Talk to Alva Now'}
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {language === 'sv'
              ? 'Tryck på knappen och prata med Alva direkt i din webbläsare. Testa hur hon hanterar ett samtal.'
              : 'Press the button and talk to Alva right in your browser. Test how she handles a call.'}
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="max-w-lg mx-auto">
            <motion.div
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center gap-6">
                {/* Voice indicator */}
                <div className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 ${
                  conversation.status === 'connected' ? 'bg-secondary/20' : 'bg-white/5'
                }`}>
                  {conversation.isSpeaking && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-secondary"
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-secondary"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                      />
                    </>
                  )}
                  <Mic className={`h-10 w-10 transition-colors ${
                    conversation.status === 'connected'
                      ? conversation.isSpeaking ? 'text-secondary' : 'text-white'
                      : 'text-white/40'
                  }`} />
                </div>

                {/* Status text */}
                <p className={`text-lg font-medium ${
                  conversation.status === 'connected' ? 'text-secondary' : 'text-white/60'
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
                  <Button
                    size="lg"
                    onClick={startConversation}
                    disabled={isConnecting}
                    className="h-14 px-10 rounded-full bg-secondary hover:bg-secondary/90 text-white font-semibold text-lg shadow-[0_0_40px_rgba(0,200,180,0.4)] hover:shadow-[0_0_60px_rgba(0,200,180,0.6)] transition-all"
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        {language === 'sv' ? 'Ansluter...' : 'Connecting...'}
                      </>
                    ) : (
                      <>
                        <Phone className="h-5 w-5 mr-2" />
                        {language === 'sv' ? 'Prata med Alva' : 'Talk to Alva'}
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    onClick={stopConversation}
                    className="h-14 px-10 rounded-full bg-destructive hover:bg-destructive/90 text-white font-semibold text-lg transition-all"
                  >
                    <PhoneOff className="h-5 w-5 mr-2" />
                    {language === 'sv' ? 'Avsluta samtal' : 'End Call'}
                  </Button>
                )}
              </div>

              <p className="text-center text-white/30 text-sm mt-6">
                {language === 'sv'
                  ? '💡 Prata svenska med Alva – hon förstår och svarar på ditt språk!'
                  : '💡 Speak Swedish with Alva – she understands and responds in your language!'}
              </p>
            </motion.div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default TryAlvaLive;
