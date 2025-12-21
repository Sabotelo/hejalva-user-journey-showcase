import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CTASection = () => {
  const { language } = useLanguage();
  
  const benefits = [
    language === 'sv' ? 'Boka demo' : 'Book a demo',
    language === 'sv' ? 'Få offert/prisinformation' : 'Get quote/pricing',
    language === 'sv' ? 'Utforska användningsområden' : 'Explore use cases',
  ];

  return (
    <section id="contact-cta" className="py-24 bg-gradient-to-br from-primary via-primary-dark to-primary">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto p-10 md:p-14 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {language === 'sv' 
                ? 'Uppgradera din telefoni med AI' 
                : 'Upgrade Your Phone System with AI'}
            </h2>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
              {language === 'sv' 
                ? 'Boka en demo idag och upptäck hur Alva kan förvandla era kundsamtal.' 
                : 'Book a demo today and discover how Alva can transform your customer calls.'}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2"
                >
                  <Check className="h-4 w-4 text-secondary" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
                onClick={() => window.location.href = '/demo'}
              >
                {language === 'sv' ? 'Boka en demo' : 'Book a Demo'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
                onClick={() => window.location.href = '/contact'}
              >
                {language === 'sv' ? 'Kontakta oss' : 'Contact Us'}
              </Button>
            </div>
            
            <div className="mt-10 pt-10 border-t border-white/10">
              <p className="text-sm text-white/50 mb-4">
                {language === 'sv' ? 'Betrodd av företag i hela Sverige' : 'Trusted by businesses across Sweden'}
              </p>
              <div className="flex flex-wrap justify-center gap-8 opacity-60">
                <div className="text-white/70 font-semibold">Company 1</div>
                <div className="text-white/70 font-semibold">Company 2</div>
                <div className="text-white/70 font-semibold">Company 3</div>
                <div className="text-white/70 font-semibold">Company 4</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;
