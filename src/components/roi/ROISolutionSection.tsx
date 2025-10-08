import { Card } from "@/components/ui/card";
import { Phone, Calendar, Mail, Star, Sparkles } from "lucide-react";

const ROISolutionSection = () => {
  const features = [
    {
      icon: Phone,
      title: "100% Call Capture",
      description: "Never miss a call again. Alva answers instantly, every time."
    },
    {
      icon: Calendar,
      title: "Automated Appointment Booking",
      description: "Alva checks your calendar and books appointments for you, saving hours of admin time."
    },
    {
      icon: Star,
      title: "Professional First Impression",
      description: "Greet every customer with a clear, polite, and helpful voice that reflects the quality of your business."
    },
    {
      icon: Mail,
      title: "Call Summaries",
      description: "Get a concise summary of every conversation sent directly to your email, so you're always in the loop."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-alva mb-4 animate-bounce-subtle shadow-primary">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Solution: <span className="text-gradient">Alva – Your Intelligent AI Receptionist</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Alva is an AI-driven receptionist designed specifically for SMEs. She integrates with your existing business number to provide an immediate, intelligent, and professional response to every single call, 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="demo-card p-6 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-alva flex items-center justify-center shadow-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary group-hover:text-primary/80 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROISolutionSection;
