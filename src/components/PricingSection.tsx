import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const PricingSection = () => {
  const { language } = useLanguage();
  
  const plans = [
    {
      name: 'Essential',
      price: language === 'sv' ? '999 kr' : '€99',
      period: language === 'sv' ? '/mån' : '/mo',
      description: language === 'sv' 
        ? 'För företag som vill komma igång med AI-receptionist' 
        : 'For businesses getting started with AI receptionist',
      features: [
        language === 'sv' ? 'Samtalsvidarekoppling' : 'Call forwarding',
        language === 'sv' ? 'Anpassad efter ert företag' : 'Customized for your business',
        language === 'sv' ? 'Samtalssammanfattningar via e-post' : 'Call summaries via email',
        language === 'sv' ? '1 språk' : '1 language',
      ],
      highlighted: false
    },
    {
      name: 'Pro',
      price: language === 'sv' ? '2 999 kr' : '€299',
      period: language === 'sv' ? '/mån' : '/mo',
      description: language === 'sv' 
        ? 'För företag som behöver daglig service och support' 
        : 'For businesses needing daily service and support',
      features: [
        language === 'sv' ? 'Allt i Essential' : 'Everything in Essential',
        language === 'sv' ? 'Kalenderintegration' : 'Calendar integration',
        language === 'sv' ? 'Automatisk mötesbokning' : 'Automatic appointment booking',
        language === 'sv' ? '3 språk' : '3 languages',
        language === 'sv' ? 'Prioriterad support' : 'Priority support',
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: language === 'sv' ? 'Enligt avtal' : 'Custom',
      period: '',
      description: language === 'sv' 
        ? 'För större företag med specifika behov' 
        : 'For larger businesses with specific needs',
      features: [
        language === 'sv' ? 'Allt i Pro' : 'Everything in Pro',
        language === 'sv' ? 'Anpassade integrationer' : 'Custom integrations',
        language === 'sv' ? 'Obegränsat antal språk' : 'Unlimited languages',
        language === 'sv' ? 'Dedikerad support' : 'Dedicated support',
        language === 'sv' ? 'SLA-avtal' : 'SLA agreement',
      ],
      highlighted: false
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {language === 'sv' ? 'Enkel och transparent prissättning' : 'Simple and Transparent Pricing'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'sv' 
              ? 'Välj den plan som passar ditt företags behov.' 
              : 'Choose the plan that fits your business needs.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative p-8 ${plan.highlighted 
                ? 'border-2 border-secondary shadow-elevated bg-gradient-to-b from-card to-accent/30' 
                : 'border border-border/50'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                  {language === 'sv' ? 'Populärast' : 'Most Popular'}
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-secondary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${plan.highlighted 
                  ? 'bg-gradient-mimer hover:opacity-90' 
                  : ''
                }`}
                variant={plan.highlighted ? 'default' : 'outline'}
                onClick={() => window.location.href = '/contact'}
              >
                {language === 'sv' ? 'Kontakta oss' : 'Contact Us'}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
