import { useLanguage } from "@/contexts/LanguageContext";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const { language } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 pb-16 overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute -top-[30%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-moss-pale/50 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-[20%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-blush/30 blur-3xl pointer-events-none" />

      <motion.div
        className="text-xs font-semibold tracking-[0.15em] uppercase text-moss mb-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {language === 'sv' ? 'AI-receptionist för svenska företag' : 'AI receptionist for Swedish businesses'}
      </motion.div>

      <motion.h1
        className="font-serif text-[clamp(2.8rem,6vw,5rem)] text-night max-w-[700px] mb-6 relative z-10 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        {language === 'sv' ? (
          <>Din telefon svarar <em className="italic text-moss">sig själv</em></>
        ) : (
          <>Your phone answers <em className="italic text-moss">itself</em></>
        )}
      </motion.h1>

      <motion.p
        className="text-lg text-bark max-w-[480px] mb-10 relative z-10 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {language === 'sv'
          ? 'Alva svarar dina kunder, bokar tider och sammanfattar samtalen — dygnet runt, på flytande svenska.'
          : 'Alva answers your customers, books appointments and summarizes calls — 24/7, in fluent Swedish.'}
      </motion.p>

    </section>
  );
};

export default HeroSection;
