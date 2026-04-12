import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, Loader2 } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SignupForm = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!phone.trim()) {
      toast({
        variant: "destructive",
        title: language === 'sv' ? "Ange ditt telefonnummer" : "Enter your phone number",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: 'Callback Request',
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
    <section id="kontakt" className="py-20 px-6">
      <ScrollAnimation>
        <div className="max-w-[480px] mx-auto text-center">
          {isSubmitted ? (
            <div className="py-8">
              <CheckCircle className="h-14 w-14 text-moss mx-auto mb-4" />
              <h2 className="font-serif text-2xl text-night mb-2">
                {language === 'sv' ? 'Tack!' : 'Thank you!'}
              </h2>
              <p className="text-bark">
                {language === 'sv'
                  ? 'Vi ringer dig inom 24 timmar.'
                  : 'We\'ll call you within 24 hours.'}
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.5rem)] text-night mb-3">
                {language === 'sv' ? 'Redo att testa?' : 'Ready to try?'}
              </h2>
              <p className="text-bark mb-8">
                {language === 'sv'
                  ? 'Skriv ditt telefonnummer så ringer vi dig inom 24 timmar.'
                  : 'Enter your phone number and we\'ll call you within 24 hours.'}
              </p>

              <div className="flex gap-3">
                <input
                  type="tel"
                  placeholder="+46 70 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 px-5 py-3 rounded-full border-[1.5px] border-sand-dark bg-warm-white text-night text-base font-sans outline-none focus:border-moss transition-colors placeholder:text-stone"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-earth text-cream rounded-full text-sm font-semibold hover:bg-night transition-colors whitespace-nowrap disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    language === 'sv' ? 'Ring mig' : 'Call me'
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </ScrollAnimation>
    </section>
  );
};

export default SignupForm;
