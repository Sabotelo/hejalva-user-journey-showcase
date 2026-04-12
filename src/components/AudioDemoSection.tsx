import { useLanguage } from "@/contexts/LanguageContext";
import { Play, Pause, Volume2 } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const AudioDemoSection = () => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    // Placeholder - no audio file yet
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-primary to-primary-dark">
      <div className="container mx-auto px-4">
        <ScrollAnimation className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
            <Volume2 className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">
              {language === 'sv' ? 'Hör skillnaden' : 'Hear the difference'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {language === 'sv' ? 'Lyssna på ett riktigt samtal med Alva' : 'Listen to a Real Alva Conversation'}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {language === 'sv'
              ? 'Så här låter det när Alva tar emot ett samtal åt en bilverkstad.'
              : 'This is what it sounds like when Alva takes a call for an auto workshop.'}
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="max-w-xl mx-auto">
            <motion.div
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Scenario label */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Volume2 className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-white font-semibold">
                    {language === 'sv' ? 'Bilverkstad – Boka service' : 'Auto Workshop – Book Service'}
                  </p>
                  <p className="text-white/50 text-sm">
                    {language === 'sv' ? 'Inspelat demo-samtal' : 'Recorded demo call'}
                  </p>
                </div>
              </div>

              {/* Play button + waveform placeholder */}
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/90 transition-colors shadow-[0_0_30px_rgba(0,200,180,0.3)] flex-shrink-0"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6 text-white" />
                  ) : (
                    <Play className="h-6 w-6 text-white ml-1" />
                  )}
                </button>

                {/* Waveform placeholder */}
                <div className="flex-1 flex items-center gap-[3px] h-12">
                  {Array.from({ length: 40 }).map((_, i) => {
                    const height = Math.sin((i / 39) * Math.PI) * 80 + 20;
                    const filled = (i / 39) * 100 < progress;
                    return (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-colors ${
                          filled ? 'bg-secondary' : 'bg-white/20'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Placeholder notice */}
              <p className="text-white/30 text-xs text-center mt-4">
                {language === 'sv'
                  ? '🎧 Ljudfil laddas upp snart – placeholder'
                  : '🎧 Audio file coming soon – placeholder'}
              </p>
            </motion.div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default AudioDemoSection;
