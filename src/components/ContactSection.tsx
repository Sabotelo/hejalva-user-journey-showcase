import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t('contact.title')}{" "}
            <span className="text-gradient">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          <Card className="demo-card p-6 text-center">
            <div className="h-12 w-12 rounded-full bg-gradient-alva flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">{t('contact.info.email')}</h3>
            <a 
              href="mailto:dev@hejalva.com" 
              className="text-primary hover:underline"
            >
              dev@hejalva.com
            </a>
          </Card>

          <Card className="demo-card p-6 text-center">
            <div className="h-12 w-12 rounded-full bg-gradient-alva flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">{t('contact.info.phone')}</h3>
            <a 
              href="tel:+46737587867" 
              className="text-primary hover:underline"
            >
              +46 737 587 867
            </a>
          </Card>

          <Card className="demo-card p-6 text-center">
            <div className="h-12 w-12 rounded-full bg-gradient-alva flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">{t('contact.info.location')}</h3>
            <p className="text-muted-foreground">Stockholm, Sverige</p>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-alva shadow-primary hover:shadow-elevated transition-all duration-300"
            onClick={() => window.location.href = '/contact'}
          >
            {t('contact.form.title')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;