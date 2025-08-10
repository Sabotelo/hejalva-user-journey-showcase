import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <Card className="demo-card max-w-4xl mx-auto p-8 md:p-12 text-center bg-gradient-card border-2 border-primary/10">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-gradient-hero flex items-center justify-center shadow-elevated animate-bounce-subtle">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold">
                Ready to Transform Your{" "}
                <span className="text-gradient">User Experience?</span>
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of companies already using HejaLva to create 
                engaging, interactive experiences that drive results.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary shadow-primary hover:shadow-elevated hover:scale-105 transition-all duration-300 text-lg px-8 py-4 group"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              >
                Schedule a Demo
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Free 14-day trial
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                No credit card required
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Setup in minutes
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;