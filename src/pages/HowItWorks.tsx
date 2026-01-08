import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { language } = useLanguage();

  const steps = [
    {
      number: 1,
      title: language === 'sv' ? 'Kunden ringer' : 'Customer Calls',
      description: language === 'sv' 
        ? 'Alva svarar direkt och lyssnar på kundens behov.'
        : 'Alva answers immediately and listens to the customer\'s needs.',
    },
    {
      number: 2,
      title: language === 'sv' ? 'Alva förstår' : 'Alva Understands',
      description: language === 'sv'
        ? 'AI:n analyserar och samlar in relevant information.'
        : 'The AI analyzes and collects relevant information.',
    },
    {
      number: 3,
      title: language === 'sv' ? 'Ärendet skapas' : 'Case Created',
      description: language === 'sv'
        ? 'Ett komplett ärende skickas till dig för godkännande.'
        : 'A complete case is sent to you for approval.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {language === 'sv' ? 'Hur Alva AI Fungerar' : 'How Alva AI Works'}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {language === 'sv' 
              ? 'Från inkommande samtal till accepterat ärende på sekunder.'
              : 'From incoming call to accepted case in seconds.'}
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Video Placeholder */}
                <div className="aspect-video bg-muted rounded-xl mb-6 flex items-center justify-center border-2 border-dashed border-border">
                  <span className="text-muted-foreground font-medium">
                    {language === 'sv' ? `Steg ${step.number}` : `Step ${step.number}`}
                  </span>
                </div>
                
                {/* Step Content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white text-sm font-bold">
                      {step.number}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
