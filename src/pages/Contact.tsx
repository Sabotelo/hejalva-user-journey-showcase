import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
          message: formData.message,
          phone: formData.company // Using company field, can add phone if needed
        }
      });

      if (error) throw error;

      toast({
        title: t('contact.form.success'),
        description: t('contact.form.successMessage'),
      });
      setFormData({ name: "", email: "", company: "", subject: "", message: "" });
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
                  className="w-full bg-gradient-primary text-white shadow-primary hover:shadow-elevated transition-all duration-300"
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
                        href="mailto:admin@hejalva.com" 
                        className="text-primary hover:underline"
                      >
                        admin@hejalva.com
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