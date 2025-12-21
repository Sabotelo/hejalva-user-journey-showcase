import { Stethoscope, Wrench, Scissors, Car, Utensils, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const UseCasesSection = () => {
  const { language } = useLanguage();
  
  const useCases = [
    {
      icon: Stethoscope,
      title: language === 'sv' ? 'Tandläkare & Vårdcentraler' : 'Dentists & Healthcare',
      description: language === 'sv' 
        ? 'Boka patientbesök, svara på frågor om behandlingar och öppettider. Alva hanterar det medan du fokuserar på patienterna.' 
        : 'Book patient visits, answer questions about treatments and hours. Alva handles it while you focus on patients.',
      example: language === 'sv' 
        ? '"Jag vill boka tid för en undersökning nästa vecka"' 
        : '"I want to book an exam for next week"'
    },
    {
      icon: Wrench,
      title: language === 'sv' ? 'Hantverkare & Servicebolag' : 'Contractors & Service Companies',
      description: language === 'sv' 
        ? 'Ta emot jobbförfrågningar och boka hembesök medan du är ute på jobb. Missa aldrig en ny kund.' 
        : 'Receive job requests and book home visits while you\'re on a job. Never miss a new customer.',
      example: language === 'sv' 
        ? '"Kan ni komma och titta på mitt element?"' 
        : '"Can you come look at my radiator?"'
    },
    {
      icon: Scissors,
      title: language === 'sv' ? 'Frisörer & Skönhetssalonger' : 'Hair & Beauty Salons',
      description: language === 'sv' 
        ? 'Boka klippningar och behandlingar automatiskt. Alva vet när du har lediga tider.' 
        : 'Book haircuts and treatments automatically. Alva knows when you have available slots.',
      example: language === 'sv' 
        ? '"Har ni tid för färgning på fredag?"' 
        : '"Do you have time for coloring on Friday?"'
    },
    {
      icon: Car,
      title: language === 'sv' ? 'Bilverkstäder' : 'Auto Repair Shops',
      description: language === 'sv' 
        ? 'Boka in servicebesök och besvara frågor om priser. Fokusera på bilarna, inte telefonen.' 
        : 'Book service appointments and answer price questions. Focus on the cars, not the phone.',
      example: language === 'sv' 
        ? '"Vad kostar ett oljebyte för en Volvo V70?"' 
        : '"What does an oil change cost for a Volvo V70?"'
    },
    {
      icon: Utensils,
      title: language === 'sv' ? 'Restauranger & Caféer' : 'Restaurants & Cafes',
      description: language === 'sv' 
        ? 'Ta emot bordsreservationer och svara på frågor om menyn. Alva hanterar rusningen.' 
        : 'Take table reservations and answer menu questions. Alva handles the rush.',
      example: language === 'sv' 
        ? '"Kan vi boka bord för 6 personer kl 19?"' 
        : '"Can we book a table for 6 at 7pm?"'
    },
    {
      icon: Building2,
      title: language === 'sv' ? 'Småföretag & Konsulter' : 'Small Businesses & Consultants',
      description: language === 'sv' 
        ? 'Ge ett professionellt intryck med en receptionist som alltid svarar. Perfekt för soloföretagare.' 
        : 'Make a professional impression with a receptionist who always answers. Perfect for solo entrepreneurs.',
      example: language === 'sv' 
        ? '"Jag vill boka ett möte för att diskutera mitt projekt"' 
        : '"I want to book a meeting to discuss my project"'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-primary to-primary-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-secondary/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
            {language === 'sv' ? 'Perfekt för serviceföretag' : 'Perfect for Service Businesses'}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            {language === 'sv' ? 'Alva förstår din bransch' : 'Alva Understands Your Industry'}
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {language === 'sv' 
              ? 'Tränad specifikt för att bli som en kollega som förstår just ditt företag.' 
              : 'Trained specifically to become like a colleague who understands your exact business.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <Card 
              key={index}
              className="p-6 border-0 bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-mimer flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-primary">
                    <useCase.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {useCase.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">
                  {useCase.description}
                </p>
                
                <div className="bg-accent/50 rounded-lg p-3 italic text-sm text-muted-foreground">
                  {useCase.example}
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