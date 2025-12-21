import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight, Brain, Calendar, Mic, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const TrustSection = () => {
  const { language } = useLanguage();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const features = [
    {
      icon: Brain,
      title: language === 'sv' ? 'Kontextmedveten' : 'Context-Aware',
      description: language === 'sv' 
        ? 'Förstår din verksamhet, prissättning och tillgänglighet.'
        : 'Understands your business, pricing, and availability.',
    },
    {
      icon: Calendar,
      title: language === 'sv' ? 'Kalenderintegration' : 'Calendar Integration',
      description: language === 'sv'
        ? 'Synkar direkt med ditt bokningssystem.'
        : 'Syncs directly with your booking system.',
    },
    {
      icon: Mic,
      title: language === 'sv' ? 'Naturlig röst' : 'Natural Voice',
      description: language === 'sv'
        ? 'Låter som en riktig person, inte en robot.'
        : 'Sounds like a real person, not a robot.',
    },
  ];

  const testimonials = [
    {
      name: "Anna K.",
      business: language === 'sv' ? 'Tandläkare, Stockholm' : 'Dentist, Stockholm',
      message: language === 'sv' 
        ? 'Min kalender var full när jag vaknade! 🎉 Alva hade bokat 3 nya patienter under natten.'
        : 'My calendar was full when I woke up! 🎉 Alva had booked 3 new patients overnight.',
      time: "07:32",
    },
    {
      name: "Erik M.",
      business: language === 'sv' ? 'Bilverkstad, Göteborg' : 'Auto Shop, Gothenburg',
      message: language === 'sv'
        ? 'Äntligen kan jag fokusera på bilarna. Alva sköter telefonen bättre än min förra receptionist!'
        : 'Finally I can focus on the cars. Alva handles the phone better than my old receptionist!',
      time: "14:15",
    },
    {
      name: "Lisa S.",
      business: language === 'sv' ? 'Frisörsalong, Malmö' : 'Hair Salon, Malmö',
      message: language === 'sv'
        ? 'Kunder säger att de älskar att kunna boka när som helst. Mina kvällar är mina igen. 💆‍♀️'
        : 'Customers say they love being able to book anytime. My evenings are mine again. 💆‍♀️',
      time: "19:48",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setActiveTestimonial(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-primary-dark to-primary relative overflow-hidden">
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 h-3 w-3 rounded-full bg-secondary/40"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-40 right-20 h-4 w-4 rounded-full bg-gold/30"
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-40 left-1/4 h-2 w-2 rounded-full bg-primary-glow/50"
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.5, 0.9, 0.5]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div 
          className="absolute top-60 right-1/3 h-5 w-5 rounded-full bg-secondary/20"
          animate={{ 
            y: [0, -25, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {language === 'sv' ? 'Uråldrig visdom, modern hastighet.' : 'Ancient Wisdom, Modern Speed.'}
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            {language === 'sv' 
              ? 'Alva är inte bara en chatbot. Hon är en kontextmedveten AI-agent som drivs av Mimer Technologies. Hon förstår din kalender, din prissättning och din ton.'
              : "Alva isn't just a chatbot. She is a Context-Aware Agent powered by Mimer Technologies. She understands your calendar, your pricing, and your tone of voice."}
          </p>
        </div>

        {/* Features Grid with animations */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="text-center p-6 rounded-2xl border border-white/10 bg-white backdrop-blur-sm hover:bg-white/95 transition-all duration-300 group"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/20 to-primary/10 border border-secondary/30 mb-4"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="h-7 w-7 text-secondary group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-lg mx-auto">
          <h3 className="text-center text-xl font-semibold text-white mb-8 flex items-center justify-center gap-2">
            <MessageSquare className="h-5 w-5 text-secondary" />
            {language === 'sv' ? 'Vad våra kunder säger' : 'What Our Customers Say'}
          </h3>
          
          <div className="relative">
            {/* SMS-style testimonial with animation */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTestimonial}
                className="bg-white rounded-3xl border border-white/50 p-6 shadow-lg min-h-[200px] flex flex-col"
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/30">
                  <motion.div 
                    className="h-10 w-10 rounded-full bg-gradient-to-br from-secondary to-primary-glow flex items-center justify-center text-white font-semibold"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {testimonials[activeTestimonial].name.charAt(0)}
                  </motion.div>
                  <div>
                    <p className="font-medium text-foreground">{testimonials[activeTestimonial].name}</p>
                    <p className="text-xs text-muted-foreground">{testimonials[activeTestimonial].business}</p>
                  </div>
                </div>

                {/* Message bubble */}
                <div className="flex-grow">
                  <div className="inline-block bg-secondary/10 rounded-2xl rounded-tl-none px-4 py-3 max-w-[90%]">
                    <p className="text-foreground">{testimonials[activeTestimonial].message}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 ml-1">
                    {testimonials[activeTestimonial].time}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevTestimonial}
                className="h-10 w-10 rounded-full hover:bg-white/10 text-white hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeTestimonial 
                        ? 'w-6 bg-secondary' 
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextTestimonial}
                className="h-10 w-10 rounded-full hover:bg-white/10 text-white hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;