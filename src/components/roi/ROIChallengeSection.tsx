import { Card } from "@/components/ui/card";
import { PhoneOff, TrendingDown, Clock, AlertTriangle } from "lucide-react";

const ROIChallengeSection = () => {
  const challenges = [
    {
      icon: TrendingDown,
      title: "Lost Revenue",
      description: "A new customer who immediately calls your competitor."
    },
    {
      icon: AlertTriangle,
      title: "Damaged Reputation",
      description: "An existing customer who feels their business isn't valued."
    },
    {
      icon: Clock,
      title: "Constant Interruptions",
      description: "Your own valuable time and focus, shattered by the need to be your own receptionist."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-accent/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-destructive/10 mb-4">
              <PhoneOff className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Challenge: <span className="text-gradient">The True Cost of a Missed Call</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Industry data is clear: <strong className="text-destructive">over 60% of calls to small businesses go unanswered</strong>. Each one of those calls isn't just a missed connection; it's a tangible loss.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {challenges.map((challenge, index) => (
              <Card 
                key={index}
                className="demo-card p-6 text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-lg bg-gradient-secondary flex items-center justify-center shadow-secondary mx-auto mb-4">
                  <challenge.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
                <p className="text-muted-foreground text-sm">{challenge.description}</p>
              </Card>
            ))}
          </div>

          <Card className="demo-card p-6 bg-accent/50 border-primary/20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-center text-muted-foreground leading-relaxed">
              Your phone service ensures the call gets through. <strong className="text-primary text-lg">Alva ensures the opportunity is captured.</strong>
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ROIChallengeSection;
