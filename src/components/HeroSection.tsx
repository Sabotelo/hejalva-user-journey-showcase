import { MemphisButton } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const { language } = useLanguage();

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
      
      <div className="container relative z-10 mx-auto px-4 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Glassmorphism container for better readability */}
          <motion.div 
            className="relative z-20 rounded-3xl p-8 md:p-12 mb-8 bg-primary-dark/80 backdrop-blur-sm border border-white/5"
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
              className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
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
                ? 'Varje Missat Samtal är en Förlorad Kund.' 
                : 'Every Missed Call is a Lost Customer.'}
            </motion.h1>
            
            <motion.p 
              className="mb-8 text-lg text-white/80 md:text-xl max-w-2xl mx-auto"
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
                ? 'Möt Alva. AI-receptionisten som svarar dygnet runt, talar flytande svenska och bokar möten medan du sover.' 
                : 'Meet Alva. The AI receptionist who answers 24/7, speaks fluent Swedish, and books appointments while you sleep.'}
            </motion.p>
          </motion.div>

          {/* 3D Sound Wave Visualization - Mobile Optimized */}
          <motion.div 
            className="relative z-10 h-48 md:h-64 mb-12 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 150,
              damping: 20,
              delay: 0.4 
            }}
          >
            {/* Dark pool base */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-16 bg-gradient-to-t from-black/60 to-transparent rounded-[100%] blur-sm"></div>
            
            {/* Sound wave bars - optimized for mobile performance */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-end justify-center gap-1.5 md:gap-2">
              {[...Array(12)].map((_, i) => {
                const baseHeight = Math.sin((i / 11) * Math.PI) * 80 + 20;
                const delay = i * 0.08;
                
                return (
                  <div
                    key={`bar-${i}`}
                    className="soundwave-bar w-2.5 md:w-3 rounded-full bg-gradient-to-t from-secondary via-secondary to-white/80"
                    style={{
                      height: `${baseHeight * 0.5}px`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              })}
            </div>
            
            {/* Reflection - simplified for mobile */}
            <div className="hidden md:flex absolute bottom-0 left-1/2 -translate-x-1/2 items-start justify-center gap-2 opacity-30 scale-y-[-0.5] blur-[2px]">
              {[...Array(12)].map((_, i) => {
                const baseHeight = Math.sin((i / 11) * Math.PI) * 80 + 20;
                const delay = i * 0.08;
                
                return (
                  <div
                    key={`reflection-${i}`}
                    className="soundwave-reflection w-3 rounded-full bg-gradient-to-t from-secondary to-transparent"
                    style={{
                      height: `${baseHeight * 0.25}px`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              })}
            </div>
            
            {/* Optimized CSS Keyframes - single animation for all bars */}
            <style>{`
              .soundwave-bar {
                will-change: transform;
                transform: translateZ(0);
                animation: soundwave 1.5s ease-in-out infinite;
              }
              .soundwave-reflection {
                will-change: transform;
                transform: translateZ(0);
                animation: soundwave-ref 1.5s ease-in-out infinite;
              }
              @keyframes soundwave {
                0%, 100% { transform: translateZ(0) scaleY(1); }
                50% { transform: translateZ(0) scaleY(2); }
              }
              @keyframes soundwave-ref {
                0%, 100% { transform: translateZ(0) scaleY(1); }
                50% { transform: translateZ(0) scaleY(2); }
              }
            `}</style>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
