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
            className="glass-panel rounded-3xl p-8 md:p-12 mb-8"
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

          {/* 3D Sound Wave Visualization */}
          <motion.div 
            className="relative h-48 md:h-64 mb-12"
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
            
            {/* Sound wave bars */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-end justify-center gap-1 md:gap-2">
              {[...Array(20)].map((_, i) => {
                const height = Math.sin((i / 19) * Math.PI) * 100 + 20;
                const delay = i * 0.05;
                return (
                  <motion.div
                    key={i}
                    className="w-2 md:w-3 rounded-full bg-gradient-to-t from-secondary via-secondary to-white/80 shadow-[0_0_20px_rgba(0,255,255,0.5)]"
                    animate={{
                      height: [`${height * 0.5}px`, `${height}px`, `${height * 0.5}px`],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay,
                    }}
                  />
                );
              })}
            </div>
            
            {/* Reflection */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-start justify-center gap-1 md:gap-2 opacity-30 scale-y-[-0.5] blur-[2px]">
              {[...Array(20)].map((_, i) => {
                const height = Math.sin((i / 19) * Math.PI) * 100 + 20;
                const delay = i * 0.05;
                return (
                  <motion.div
                    key={i}
                    className="w-2 md:w-3 rounded-full bg-gradient-to-t from-secondary to-transparent"
                    animate={{
                      height: [`${height * 0.25}px`, `${height * 0.5}px`, `${height * 0.25}px`],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay,
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
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
