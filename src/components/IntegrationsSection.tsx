import { Calendar, Mail, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

const IntegrationsSection = () => {
  const { language } = useLanguage();
  
  const integrations = [
    { name: 'Google Calendar', icon: '📅' },
    { name: 'Outlook', icon: '📧' },
    { name: 'Microsoft Teams', icon: '💼' },
    { name: 'Slack', icon: '💬' },
  ];

  const features = [
    {
      icon: Check,
      title: language === 'sv' ? 'Enkel setup' : 'Easy Setup',
      description: language === 'sv' ? 'Igång på minuter' : 'Up and running in minutes',
    },
    {
      icon: Calendar,
      title: language === 'sv' ? 'Automatisk sync' : 'Auto Sync',
      description: language === 'sv' ? 'Alltid uppdaterad' : 'Always up to date',
    },
    {
      icon: Mail,
      title: language === 'sv' ? 'Notifikationer' : 'Notifications',
      description: language === 'sv' ? 'Direkt till dig' : 'Straight to you',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary-dark to-primary text-white">
      <div className="container mx-auto px-4">
        <ScrollAnimation className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {language === 'sv' ? 'Integreras med era verktyg' : 'Integrates with Your Tools'}
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {language === 'sv' 
              ? 'Alva kopplas enkelt ihop med verktygen ni redan använder.' 
              : 'Alva easily connects with the tools you already use.'}
          </p>
        </ScrollAnimation>

        <StaggerContainer className="flex flex-wrap justify-center gap-6 mb-16" staggerDelay={0.1}>
          {integrations.map((integration, index) => (
            <StaggerItem key={index} variant="scale">
              <div 
                className="bg-white/10 backdrop-blur-sm rounded-xl px-8 py-6 flex items-center gap-4 border border-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <span className="text-3xl">{integration.icon}</span>
                <span className="text-lg font-medium">{integration.name}</span>
              </div>
            </StaggerItem>
          ))}
          
          <StaggerItem variant="scale">
            <div className="bg-secondary/20 backdrop-blur-sm rounded-xl px-8 py-6 flex items-center gap-4 border border-secondary/30">
              <span className="text-3xl">+</span>
              <span className="text-lg font-medium">{language === 'sv' ? 'Och fler...' : 'And more...'}</span>
            </div>
          </StaggerItem>
        </StaggerContainer>

        <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto" staggerDelay={0.15}>
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default IntegrationsSection;
