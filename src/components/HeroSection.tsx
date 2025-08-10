import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-primary opacity-20 blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-secondary opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 h-60 w-60 rounded-full bg-gradient-hero opacity-10 blur-2xl animate-pulse-slow"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Experience the Future of{" "}
            <span className="text-gradient">Interactive Demos</span>
          </h1>
          
          <p className="mb-8 text-lg text-muted-foreground md:text-xl lg:text-2xl max-w-2xl mx-auto">
            Discover how HejaLva transforms user experiences through intelligent, 
            interactive demonstrations that adapt to your needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-primary shadow-primary hover:shadow-elevated hover:scale-105 transition-all duration-300 text-lg px-8 py-3"
            >
              Start Interactive Demo
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group text-lg px-8 py-3 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Preview
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            ✨ No signup required • Interactive experience in 2 minutes
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;