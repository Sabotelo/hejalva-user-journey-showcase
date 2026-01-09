import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Phone, MapPin, ArrowRight, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [messageForm, setMessageForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  console.log('ContactSection rendered, messageForm:', messageForm);
  console.log('ContactSection isOpen state:', isOpen);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', messageForm);
    
    if (!messageForm.name || !messageForm.email || !messageForm.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Call the Supabase Edge Function to send email
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: messageForm.name,
          email: messageForm.email,
          phone: messageForm.phone,
          message: messageForm.message,
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (data?.success) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. We'll get back to you soon.",
        });
        
        // Reset form and close dialog
        setMessageForm({ name: '', email: '', phone: '', message: '' });
        setIsOpen(false);
      } else {
        throw new Error(data?.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log('Input changed:', name, value);
    setMessageForm(prev => ({ ...prev, [name]: value }));
  };

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
          <Card 
            className="demo-card p-6 text-center cursor-pointer hover:shadow-lg transition-shadow" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Email card clicked!');
              setIsOpen(true);
            }}
            style={{ pointerEvents: 'auto', zIndex: 1 }}
          >
            <div className="h-12 w-12 rounded-full bg-gradient-alva flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">{t('contact.info.email')}</h3>
            <p className="text-primary hover:underline">
              admin@hejalva.com
            </p>
            <p className="text-sm text-muted-foreground mt-2">Click to send message</p>
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

      {/* Modal rendered outside the main content for proper z-index */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50" 
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full mx-4 relative z-[10000]" 
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  name="name"
                  placeholder="Your name *"
                  value={messageForm.name}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  autoComplete="name"
                />
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Your email *"
                  value={messageForm.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  autoComplete="email"
                />
              </div>
              <div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Your phone (optional)"
                  value={messageForm.phone}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  autoComplete="tel"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your message *"
                  value={messageForm.message}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  rows={4}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  <Send className="mr-2 h-4 w-4" />
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactSection;