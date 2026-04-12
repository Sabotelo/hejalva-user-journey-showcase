import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Phone, Calendar, MessageCircle, Clock, UserCheck } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const PricingReframed = () => {
  const { language } = useLanguage();

  const features = [
    language === 'sv' ? 'Svarar på alla samtal 24/7' : 'Answers all calls 24/7',
    language === 'sv' ? 'Bokar möten automatiskt' : 'Books appointments automatically',
    language === 'sv' ? 'Sammanfattningar via SMS/e-post' : 'Summaries via SMS/email',
    language === 'sv' ? 'Tränad på ditt företag' : 'Trained on your business',
    language === 'sv' ? 'Obegränsade samtal' : 'Unlimited calls',
    language === 'sv' ? 'Ingen bindningstid' : 'No commitment',
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-primary-dark to-primary">
      <div className="container mx-auto px-4">
        <ScrollAnimation className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {language === 'sv' ? 'Billigare än ett missat samtal' : 'Cheaper Than a Missed Call'}
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {language === 'sv'
              ? 'Ett enda missat samtal kan kosta dig tusentals kronor. Alva kostar mindre än en kopp kaffe om dagen.'
              : 'A single missed call can cost you thousands. Alva costs less than a cup of coffee a day.'}
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="max-w-lg mx-auto">
            <motion.div
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="text-center mb-8">
                <div className="inline-block bg-secondary/20 text-secondary px-4 py-1 rounded-full text-sm font-medium mb-4">
                  {language === 'sv' ? 'Allt ingår' : 'Everything included'}
                </div>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-5xl font-bold text-white">3 500 kr</span>
                  <span className="text-white/50">{language === 'sv' ? '/mån' : '/mo'}</span>
                </div>
                <p className="text-white/50 text-sm">
                  {language === 'sv' ? '≈ 117 kr/dag – billigare än ditt kaffe' : '≈ 117 kr/day – cheaper than your coffee'}
                </p>
              </div>

              <div className="space-y-3 mb-8">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full h-14 rounded-full bg-secondary hover:bg-secondary/90 text-white font-semibold text-lg shadow-[0_0_40px_rgba(0,200,180,0.4)] transition-all"
                onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {language === 'sv' ? 'Prova gratis i 14 dagar' : 'Try Free for 14 Days'}
              </Button>

              <p className="text-center text-white/30 text-xs mt-4">
                {language === 'sv' ? 'Ingen bindningstid • Inget kreditkort krävs' : 'No commitment • No credit card required'}
              </p>
            </motion.div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default PricingReframed;
