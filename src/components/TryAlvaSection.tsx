import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const TryAlvaSection = () => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 45; // seconds
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 0.1, duration));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (currentTime >= duration) {
      setCurrentTime(0);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate waveform bars
  const bars = 40;
  const generateBarHeight = (index: number, time: number) => {
    if (!isPlaying) return 20;
    const wave = Math.sin((time * 3) + (index * 0.3)) * 0.5 + 0.5;
    const random = Math.sin(index * 1.5 + time * 2) * 0.3 + 0.7;
    return 15 + (wave * random * 50);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === 'sv' ? 'Testa Alva' : 'Try Alva'}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {language === 'sv' 
              ? 'Lyssna på Alva hantera en knepig bokningsförhandling på svenska.'
              : 'Listen to Alva handle a tricky booking negotiation in Swedish.'}
          </p>
        </div>

        {/* Media Player */}
        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 pointer-events-none" />
            
            {/* Player Header */}
            <div className="relative flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-secondary to-primary-glow flex items-center justify-center">
                  <Volume2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Alva</h3>
                  <p className="text-xs text-muted-foreground">
                    {language === 'sv' ? 'AI Receptionist' : 'AI Receptionist'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20">
                <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-xs text-secondary font-medium">
                  {language === 'sv' ? 'Realtid • LiveKit' : 'Real-time • LiveKit'}
                </span>
              </div>
            </div>

            {/* Waveform Visualization */}
            <div className="relative h-32 flex items-center justify-center gap-[2px] mb-6 overflow-hidden rounded-xl bg-muted/30 px-4">
              {[...Array(bars)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 rounded-full bg-gradient-to-t from-secondary via-secondary to-primary-glow"
                  animate={{
                    height: generateBarHeight(i, currentTime),
                    opacity: isPlaying ? 0.7 + Math.sin(i * 0.5) * 0.3 : 0.4,
                  }}
                  transition={{
                    height: { duration: 0.1, ease: "easeOut" },
                    opacity: { duration: 0.2 },
                  }}
                />
              ))}
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-muted/30 via-transparent to-muted/30 pointer-events-none" />
            </div>

            {/* Progress Bar */}
            <div className="relative mb-4">
              <div className="h-1 w-full rounded-full bg-muted">
                <motion.div 
                  className="h-full rounded-full bg-gradient-to-r from-secondary to-primary-glow"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={togglePlay}
                className="h-14 w-14 rounded-full bg-gradient-to-br from-secondary to-primary-glow hover:from-secondary/90 hover:to-primary-glow/90 shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-300"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 text-primary-dark" />
                ) : (
                  <Play className="h-6 w-6 text-primary-dark ml-1" />
                )}
              </Button>
            </div>

            {/* Context Label */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              {language === 'sv' 
                ? '📞 Scenario: Kund vill boka tid utanför ordinarie öppettider'
                : '📞 Scenario: Customer wants to book outside regular hours'}
            </p>
          </div>

          {/* Call to action */}
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              {language === 'sv' 
                ? 'Vill du testa live? Ring Alva direkt.'
                : 'Want to try live? Call Alva directly.'}
            </p>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = 'tel:+46737587867'}
              className="border-secondary/50 text-secondary hover:bg-secondary/10"
            >
              +46 737 587 867
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TryAlvaSection;