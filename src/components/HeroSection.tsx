import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const { language } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-secondary/30 to-primary-glow/20 blur-3xl"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary-glow/30 to-secondary/20 blur-3xl"
          animate={{ scale: [1, 1.15, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-20 pb-12">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            className="relative z-20 rounded-3xl p-8 md:p-12 bg-primary-dark/80 backdrop-blur-sm border border-white/5"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Phone className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">
                {language === 'sv' ? 'AI-receptionist för svenska företag' : 'AI receptionist for Swedish businesses'}
              </span>
            </motion.div>

            <motion.h1
              className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {language === 'sv'
                ? 'Missa aldrig ett samtal igen.'
                : 'Never Miss a Call Again.'}
            </motion.h1>

            <motion.p
              className="mb-8 text-lg text-white/80 md:text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {language === 'sv'
                ? 'Alva svarar på dina samtal dygnet runt, bokar möten och ger professionell service – så att du kan fokusera på ditt jobb.'
                : 'Alva answers your calls 24/7, books appointments and delivers professional service – so you can focus on your work.'}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                size="lg"
                className="h-14 px-8 rounded-full bg-secondary hover:bg-secondary/90 text-white font-semibold text-lg shadow-[0_0_40px_rgba(0,200,180,0.4)] hover:shadow-[0_0_60px_rgba(0,200,180,0.6)] transition-all"
                onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {language === 'sv' ? 'Bli uppringd av Alva' : 'Get a Call from Alva'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 rounded-full border-white/20 text-white hover:bg-white/10 font-semibold text-lg"
                onClick={() => document.getElementById('try-alva')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {language === 'sv' ? 'Prata med Alva nu' : 'Talk to Alva Now'}
              </Button>
            </motion.div>

            <motion.a
              href="tel:+46766866572"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm md:pointer-events-none md:cursor-default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Phone className="h-4 w-4" />
              <span>+46 76 686 65 72</span>
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, y: { duration: 2, repeat: Infinity } }}
          >
            <ArrowDown className="h-6 w-6 text-white/40 mx-auto" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
