import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle, Loader2 } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SignupForm = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast({
        variant: "destructive",
        title: language === 'sv' ? "Fyll i alla fält" : "Fill in all fields",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: name.trim(),
          email: 'callback-request@hejalva.com',
          message: `Callback request – Ring upp: ${phone.trim()}`,
          phone: phone.trim(),
        }
      });

      if (error) throw error;

      setIsSubmitted(true);
    } catch (err) {
      console.error('Signup error:', err);
      toast({
        variant: "destructive",
        title: language === 'sv' ? "Något gick fel" : "Something went wrong",
        description: language === 'sv' ? "Försök igen senare." : "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="signup" className="py-20 bg-gradient-to-b from-primary to-primary-dark">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <div className="max-w-md mx-auto text-center">
            {isSubmitted ? (
              <div className="rounded-3xl border border-secondary/20 bg-secondary/10 backdrop-blur-xl p-8">
                <CheckCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">
                  {language === 'sv' ? 'Tack!' : 'Thank you!'}
                </h2>
                <p className="text-white/70">
                  {language === 'sv'
                    ? 'Vi ringer dig inom 24 timmar för att visa hur Alva kan hjälpa ditt företag.'
                    : 'We\'ll call you within 24 hours to show how Alva can help your business.'}
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {language === 'sv' ? 'Vill du testa Alva?' : 'Want to Try Alva?'}
                </h2>
                <p className="text-white/60 text-lg mb-8">
                  {language === 'sv'
                    ? 'Lämna ditt nummer så ringer vi upp inom 24 timmar med en personlig demo.'
                    : 'Leave your number and we\'ll call you within 24 hours with a personal demo.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder={language === 'sv' ? 'Ditt namn' : 'Your name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-14 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/40 text-lg"
                  />
                  <Input
                    type="tel"
                    placeholder={language === 'sv' ? 'Ditt telefonnummer' : 'Your phone number'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-14 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/40 text-lg"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-full bg-secondary hover:bg-secondary/90 text-white font-semibold text-lg shadow-[0_0_40px_rgba(0,200,180,0.4)] transition-all"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <Phone className="h-5 w-5 mr-2" />
                        {language === 'sv' ? 'Ring mig' : 'Call Me'}
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-white/30 text-xs mt-4">
                  {language === 'sv'
                    ? 'Ingen spam. Vi ringer bara för att visa Alva.'
                    : 'No spam. We only call to demo Alva.'}
                </p>
              </>
            )}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default SignupForm;
