import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingDown, Calculator, Phone, DollarSign } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const LostRevenueCalculator = () => {
  const { language } = useLanguage();
  const [missedCalls, setMissedCalls] = useState(10);
  const [avgPrice, setAvgPrice] = useState(800);
  const [displayedRevenue, setDisplayedRevenue] = useState(0);
  
  // Calculate yearly lost revenue
  // Assuming 30% of missed calls would have converted to bookings
  const conversionRate = 0.3;
  const weeksPerYear = 52;
  
  // Formula: (missed calls per week) × (average price) × (conversion rate) × (weeks per year)
  // Example: 10 calls × 800 SEK × 30% × 52 weeks = 124,800 SEK/year
  const potentialBookingsPerYear = missedCalls * weeksPerYear;
  const convertedBookingsPerYear = Math.round(potentialBookingsPerYear * conversionRate);
  const yearlyLostRevenue = convertedBookingsPerYear * avgPrice;
  
  // Animate the revenue counter
  useEffect(() => {
    const duration = 800;
    const steps = 30;
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
    <section className="py-24 bg-gradient-to-b from-primary to-primary-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 rounded-full bg-destructive/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-secondary/20 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation variant="bounceUp" className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-destructive/20 text-white px-4 py-2 rounded-full mb-4">
            <TrendingDown className="h-4 w-4" />
            <span className="text-sm font-semibold">
              {language === 'sv' ? 'Se vad du förlorar' : 'See What You\'re Losing'}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {language === 'sv' ? 'Räkna ut din förlorade intäkt' : 'Calculate Your Lost Revenue'}
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {language === 'sv' 
              ? 'Varje missat samtal är en potentiell kund som går till din konkurrent.'
              : 'Every missed call is a potential customer going to your competitor.'}
          </p>
        </ScrollAnimation>

        <ScrollAnimation variant="scale" delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Missed Calls Slider */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-destructive" />
                    </div>
                    <label className="text-lg font-semibold text-foreground">
                      {language === 'sv' ? 'Missade samtal per vecka' : 'Missed calls per week'}
                    </label>
                  </div>
                  
                  <div className="px-2">
                    <Slider
                      value={[missedCalls]}
                      onValueChange={(value) => setMissedCalls(value[0])}
                      min={0}
                      max={50}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">0</span>
                    <motion.span 
                      className="text-3xl font-bold text-destructive"
                      key={missedCalls}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {missedCalls}
                    </motion.span>
                    <span className="text-sm text-muted-foreground">50</span>
                  </div>
                </div>

                {/* Average Price Input */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-secondary" />
                    </div>
                    <label className="text-lg font-semibold text-foreground">
                      {language === 'sv' ? 'Genomsnittligt pris (SEK)' : 'Average service price (SEK)'}
                    </label>
                  </div>
                  
                  <div className="px-2">
                    <Slider
                      value={[avgPrice]}
                      onValueChange={(value) => setAvgPrice(value[0])}
                      min={100}
                      max={5000}
                      step={100}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">100 kr</span>
                    <motion.span 
                      className="text-3xl font-bold text-primary"
                      key={avgPrice}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {formatCurrency(avgPrice)} kr
                    </motion.span>
                    <span className="text-sm text-muted-foreground">5 000 kr</span>
                  </div>
                </div>
              </div>

              {/* Result Display */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-destructive/10 via-destructive/5 to-destructive/10 rounded-2xl blur-xl" />
                
                <motion.div 
                  className="relative bg-gradient-to-br from-primary-dark to-primary rounded-2xl p-8 text-center overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Animated background elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-white/10"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + (i % 3) * 20}%`,
                        }}
                        animate={{
                          y: [-10, 10, -10],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 3 + i,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Calculator className="h-6 w-6 text-white/70" />
                      <p className="text-white/70 text-lg">
                        {language === 'sv' ? 'Du förlorar uppskattningsvis' : 'You\'re losing approximately'}
                      </p>
                    </div>
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={displayedRevenue}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-4"
                      >
                        <span className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
                          {formatCurrency(displayedRevenue)}
                        </span>
                        <span className="text-3xl md:text-4xl font-bold text-secondary ml-2">
                          SEK
                        </span>
                      </motion.div>
                    </AnimatePresence>
                    
                    <p className="text-white/60 text-lg">
                      {language === 'sv' ? 'per år i missade bokningar' : 'per year in missed bookings'}
                    </p>
                    
                    <div className="text-white/40 text-sm mt-4 space-y-1">
                      <p>
                        {language === 'sv' 
                          ? `* ${missedCalls} samtal/vecka × 52 veckor × 30% konvertering = ${convertedBookingsPerYear} bokningar/år`
                          : `* ${missedCalls} calls/week × 52 weeks × 30% conversion = ${convertedBookingsPerYear} bookings/year`}
                      </p>
                      <p>
                        {language === 'sv' 
                          ? `* ${convertedBookingsPerYear} bokningar × ${formatCurrency(avgPrice)} kr = ${formatCurrency(yearlyLostRevenue)} kr`
                          : `* ${convertedBookingsPerYear} bookings × ${formatCurrency(avgPrice)} SEK = ${formatCurrency(yearlyLostRevenue)} SEK`}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Context callout */}
              <motion.div 
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="text-muted-foreground">
                  {language === 'sv' 
                    ? `Med Alva för ${formatCurrency(2999)} kr/mån kan du fånga upp till ${formatCurrency(Math.round(yearlyLostRevenue * 0.8))} kr per år.`
                    : `With Alva at ${formatCurrency(2999)} SEK/mo, you could capture up to ${formatCurrency(Math.round(yearlyLostRevenue * 0.8))} SEK per year.`}
                </p>
                <p className="text-secondary font-semibold mt-1">
                  {language === 'sv' 
                    ? `Det är ${Math.round((yearlyLostRevenue * 0.8) / (2999 * 12))}x avkastning på din investering!`
                    : `That's a ${Math.round((yearlyLostRevenue * 0.8) / (2999 * 12))}x return on your investment!`}
                </p>
              </motion.div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default LostRevenueCalculator;
