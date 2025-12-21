import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight, Brain, Calendar, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === 'sv' ? 'Uråldrig visdom, modern hastighet.' : 'Ancient Wisdom, Modern Speed.'}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {language === 'sv' 
              ? 'Alva är inte bara en chatbot. Hon är en kontextmedveten AI-agent som drivs av Mimer Technologies. Hon förstår din kalender, din prissättning och din ton.'
              : "Alva isn't just a chatbot. She is a Context-Aware Agent powered by Mimer Technologies. She understands your calendar, your pricing, and your tone of voice."}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/20 to-primary/10 border border-secondary/30 mb-4">
                <feature.icon className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-lg mx-auto">
          <h3 className="text-center text-xl font-semibold text-foreground mb-8">
            {language === 'sv' ? 'Vad våra kunder säger' : 'What Our Customers Say'}
          </h3>
          
          <div className="relative">
            {/* SMS-style testimonial */}
            <div className="bg-card rounded-3xl border border-border/50 p-6 shadow-lg min-h-[200px] flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/30">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-secondary to-primary-glow flex items-center justify-center text-white font-semibold">
                  {testimonials[activeTestimonial].name.charAt(0)}
                </div>
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
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevTestimonial}
                className="h-10 w-10 rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeTestimonial 
                        ? 'w-6 bg-secondary' 
                        : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextTestimonial}
                className="h-10 w-10 rounded-full"
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