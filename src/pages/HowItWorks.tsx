import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Play } from "lucide-react";

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
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            {/* Video Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
              {/* Play Button */}
              <button className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group">
                <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
              </button>
              <span className="text-slate-500 font-medium text-lg mt-4">
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
