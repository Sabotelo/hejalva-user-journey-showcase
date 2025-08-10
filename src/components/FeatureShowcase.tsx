import { Card } from "@/components/ui/card";
import { 
  Zap, 
  Users, 
  BarChart3, 
  Shield, 
  Smartphone, 
  Workflow 
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant interactions with zero loading time for seamless user experiences."
  },
  {
    icon: Users,
    title: "User-Centric Design",
    description: "Adaptive interfaces that learn and evolve with user behavior patterns."
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Deep insights into user journeys and interaction patterns."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with end-to-end encryption and compliance."
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Perfect experience across all devices and screen sizes."
  },
  {
    icon: Workflow,
    title: "Workflow Integration",
    description: "Seamlessly integrates with your existing tools and workflows."
  }
];

const FeatureShowcase = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Powerful <span className="text-gradient">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create engaging, interactive experiences that convert visitors into customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="demo-card p-6 group hover:shadow-elevated transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-4">
                <div className="relative">
                  <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center shadow-primary group-hover:shadow-elevated group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-primary opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
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

export default FeatureShowcase;