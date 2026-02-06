import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Loader2, PhoneCall } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }
      });

      if (error) throw error;

      toast({
        title: t('contact.form.success'),
        description: t('contact.form.successMessage'),
      });
      setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-grow bg-gradient-to-b from-primary via-primary-dark to-primary pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              {t('contact.title')}{" "}
              <span className="text-secondary">{t('contact.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="p-8 bg-white border-0 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">{t('contact.form.title')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('contact.form.name')}</Label>
                     <Input
                       id="name"
                       name="name"
                       value={formData.name}
                       onChange={handleInputChange}
                       placeholder={t('contact.form.namePlaceholder')}
                       required
                       autoComplete="off"
                       disabled={isLoading}
                     />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('contact.form.email')}</Label>
                     <Input
                       id="email"
                       name="email"
                       type="email"
                       value={formData.email}
                       onChange={handleInputChange}
                       placeholder={t('contact.form.emailPlaceholder')}
                       required
                       autoComplete="off"
                       disabled={isLoading}
                     />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('contact.info.phone')}</Label>
                     <Input
                       id="phone"
                       name="phone"
                       type="tel"
                       value={formData.phone}
                       onChange={handleInputChange}
                       placeholder="+46 70 123 4567"
                       autoComplete="off"
                       disabled={isLoading}
                     />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">{t('contact.form.company')}</Label>
                     <Input
                       id="company"
                       name="company"
                       value={formData.company}
                       onChange={handleInputChange}
                       placeholder={t('contact.form.companyPlaceholder')}
                       autoComplete="off"
                       disabled={isLoading}
                     />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                   <Input
                     id="subject"
                     name="subject"
                     value={formData.subject}
                     onChange={handleInputChange}
                     placeholder={t('contact.form.subjectPlaceholder')}
                     required
                     autoComplete="off"
                     disabled={isLoading}
                   />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('contact.form.message')}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={6}
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-muted text-muted-foreground hover:bg-gradient-primary hover:text-white hover:shadow-elevated transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-5 w-5" />
                  )}
                  {isLoading ? "Sending..." : t('contact.form.send')}
                </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-8 bg-white border-0 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">{t('contact.info.title')}</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-secondary to-primary-glow flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{t('contact.info.email')}</h3>
                      <a 
                        href="mailto:dev@hejalva.com" 
                        className="text-primary hover:underline"
                      >
                        dev@hejalva.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-secondary to-primary-glow flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{t('contact.info.phone')}</h3>
                      <a 
                        href="tel:+46737587867" 
                        className="text-primary hover:underline"
                      >
                        +46 737 587 867
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-secondary to-primary-glow flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{t('contact.info.location')}</h3>
                      <p className="text-muted-foreground">Stockholm, Sweden</p>
                      <p className="text-muted-foreground">Karlskrona, Sweden</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Try Alva - Call Demo */}
              <Card className="p-8 bg-gradient-to-br from-secondary/10 to-primary-glow/10 border-2 border-secondary/30 rounded-2xl">
                <div className="text-center">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-secondary to-primary-glow flex items-center justify-center mx-auto mb-4">
                    <PhoneCall className="h-7 w-7 text-primary-dark" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {language === 'sv' ? 'Testa Alva direkt' : 'Try Alva directly'}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-5">
                    {language === 'sv' 
                      ? 'Ring Alva och upplev vår AI-receptionist live. Du kan även boka en demo direkt genom samtalet.'
                      : 'Call Alva and experience our AI receptionist live. You can also book a demo directly through the call.'}
                  </p>
                  {/* Only link to tel: on mobile, no action on desktop */}
                  <a href="tel:+46766866572" className="block md:pointer-events-none">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-secondary to-primary-glow text-primary-dark hover:from-secondary/90 hover:to-primary-glow/90 font-bold shadow-[0_0_20px_rgba(0,245,255,0.3)] md:cursor-default"
                      tabIndex={-1}
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      +46 76 686 65 72
                    </Button>
                  </a>
                </div>
              </Card>

              <Card className="p-8 bg-white/90 border-0 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">{t('contact.support.title')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('contact.support.description')}
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">{t('contact.support.hours')}</span>
                    <span className="text-muted-foreground">09:00 - 17:00 CET</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">{t('contact.support.response')}</span>
                    <span className="text-muted-foreground">&lt; 24h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">{t('contact.support.languages')}</span>
                    <span className="text-muted-foreground">Svenska, English</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;