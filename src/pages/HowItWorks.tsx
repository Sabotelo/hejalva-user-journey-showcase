import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import HowItWorksVisualization from "@/components/HowItWorksVisualization";
import IssuesWeSolveVisualization from "@/components/IssuesWeSolveVisualization";

const HowItWorks = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary-dark to-primary">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {language === 'sv' ? 'Hur Alva AI Fungerar' : 'How Alva AI Works'}
          </h1>
          <p className="text-xl md:text-2xl text-white/70">
            {language === 'sv' 
              ? 'Från inkommande samtal till accepterat ärende på sekunder.'
              : 'From incoming call to accepted case in seconds.'}
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <HowItWorksVisualization />
        </div>
      </section>

      {/* Issues We Solve Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {language === 'sv' ? 'Problemen Vi Löser' : 'The Issues We Solve'}
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              {language === 'sv' 
                ? 'Hovra över korten för att se hur Alva löser varje problem'
                : 'Hover over the cards to see how Alva solves each problem'}
            </p>
          </div>
          <IssuesWeSolveVisualization />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
