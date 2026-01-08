import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { language } = useLanguage();

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
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
            {/* Video Placeholder */}
            <div className="aspect-video bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
              <span className="text-muted-foreground font-medium text-lg">
                {language === 'sv' ? 'Så fungerar Alva' : 'How Alva Works'}
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
