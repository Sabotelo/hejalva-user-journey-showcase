import { Calendar, Briefcase, FileText, Headphones } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const UseCasesSection = () => {
  const { language } = useLanguage();
  
  const useCases = [
    {
      icon: Calendar,
      title: language === 'sv' ? 'Bokning och ombokning' : 'Booking & Rescheduling',
      description: language === 'sv' 
        ? 'Tar emot bokningsförfrågningar, samlar in nödvändig information och hanterar ombokningar. Bekräftelser skickas automatiskt.' 
        : 'Receives booking requests, gathers necessary information, and handles rescheduling. Confirmations are sent automatically.',
    },
    {
      icon: Briefcase,
      title: language === 'sv' ? 'Orderhantering' : 'Order Management',
      description: language === 'sv' 
        ? 'Svarar på frågor om orderstatus och hanterar ändringsförfrågningar direkt i samtalet.' 
        : 'Answers questions about order status and handles change requests directly during the call.',
    },
    {
      icon: FileText,
      title: language === 'sv' ? 'Administration' : 'Administration',
      description: language === 'sv' 
        ? 'Hanterar rutinuppgifter och dokumentation så att ditt team kan fokusera på viktigare arbete.' 
        : 'Handles routine tasks and documentation so your team can focus on more important work.',
    },
    {
      icon: Headphones,
      title: language === 'sv' ? 'Kundservice' : 'Customer Service',
      description: language === 'sv' 
        ? 'Svarar på vanliga frågor och ger support dygnet runt utan väntetid.' 
        : 'Answers common questions and provides support around the clock with no wait time.',
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {language === 'sv' ? 'Vanliga användningsområden' : 'Common Use Cases'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'sv' 
              ? 'Alva anpassar sig efter din verksamhets behov.' 
              : 'Alva adapts to your business needs.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card 
              key={index}
              className="p-8 border border-border/50 hover:border-secondary/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-5">
                <div className="h-14 w-14 rounded-xl bg-gradient-mimer flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-primary">
                  <useCase.icon className="h-7 w-7 text-white" />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {useCase.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
