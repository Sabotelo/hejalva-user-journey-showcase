import { MemphisButton } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Sparkles, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

const HeroSection = () => {
  const { language } = useLanguage();
  const [missedCalls, setMissedCalls] = useState(10);
  const [avgPrice, setAvgPrice] = useState(800);
  const [displayedRevenue, setDisplayedRevenue] = useState(0);
  
  // Simple calculation: missed calls × price × 52 weeks
  const weeksPerYear = 52;
  const yearlyLostRevenue = missedCalls * avgPrice * weeksPerYear;
  
  // Animate the revenue counter
  useEffect(() => {
    const duration = 600;
    const steps = 20;
    const increment = (yearlyLostRevenue - displayedRevenue) / steps;
    let current = displayedRevenue;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setDisplayedRevenue(yearlyLostRevenue);
        clearInterval(timer);
      } else {
        setDisplayedRevenue(Math.round(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [yearlyLostRevenue]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-secondary/30 to-primary-glow/20 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary-glow/30 to-secondary/20 blur-3xl"
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-secondary/10 to-transparent blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 pt-20 pb-12">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main headline */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.8 
            }}
          >
            <motion.h1 
              className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.2 
              }}
            >
              {language === 'sv' 
                ? 'Sluta Förlora Pengar på Missade Samtal' 
                : 'Stop Losing Money on Missed Calls'}
            </motion.h1>
            
            <motion.p 
              className="text-lg text-white/80 md:text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.3 
              }}
            >
              {language === 'sv' 
                ? 'Möt Alva. AI-receptionisten som svarar dygnet runt och bokar möten medan du sover.' 
                : 'Meet Alva. The AI receptionist who answers 24/7 and books appointments while you sleep.'}
            </motion.p>
          </motion.div>

          {/* Integrated Calculator */}
          <motion.div 
            className="glass-panel rounded-3xl p-6 md:p-8 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.4 
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <TrendingDown className="h-5 w-5 text-destructive" />
              <p className="text-white/80 font-medium">
                {language === 'sv' ? 'Se vad du förlorar varje år' : 'See what you\'re losing each year'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Missed Calls Slider */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">
                  {language === 'sv' ? 'Missade samtal/vecka' : 'Missed calls/week'}
                </label>
                <Slider
                  value={[missedCalls]}
                  onValueChange={(value) => setMissedCalls(value[0])}
                  min={0}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <motion.span 
                  className="block text-2xl font-bold text-white"
                  key={missedCalls}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                >
                  {missedCalls}
                </motion.span>
              </div>

              {/* Average Price Slider */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">
                  {language === 'sv' ? 'Snittintäkt per kund' : 'Avg. revenue per customer'}
                </label>
                <Slider
                  value={[avgPrice]}
                  onValueChange={(value) => setAvgPrice(value[0])}
                  min={100}
                  max={5000}
                  step={100}
                  className="w-full"
                />
                <motion.span 
                  className="block text-2xl font-bold text-white"
                  key={avgPrice}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                >
                  {formatCurrency(avgPrice)} kr
                </motion.span>
              </div>
            </div>

            {/* Result */}
            <div className="bg-destructive/20 rounded-xl p-4 border border-destructive/30">
              <p className="text-white/60 text-sm mb-1">
                {language === 'sv' ? 'Du förlorar uppskattningsvis' : 'You\'re losing approximately'}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayedRevenue}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <span className="text-3xl md:text-4xl font-bold text-white">
                    {formatCurrency(displayedRevenue)}
                  </span>
                  <span className="text-xl font-bold text-secondary ml-2">
                    SEK/år
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.5 
            }}
          >
            <MemphisButton 
              variant="cta"
              size="lg"
              onClick={() => window.location.href = '/demo#try-alva'}
            >
              <Phone className="h-5 w-5" />
              {language === 'sv' ? 'Ring Alva Nu' : 'Call Alva Now'}
            </MemphisButton>
            
            <MemphisButton 
              variant="outline"
              size="lg"
              className="border-gold/50 text-gold hover:bg-gold/20 shadow-[0_0_20px_rgba(255,215,0,0.2)]"
              onClick={() => window.location.href = '/demo'}
            >
              <Sparkles className="h-5 w-5" />
              {language === 'sv' ? 'Boka Demo' : 'Book a Demo'}
            </MemphisButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
