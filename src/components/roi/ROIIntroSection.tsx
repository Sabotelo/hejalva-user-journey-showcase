import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const ROIIntroSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <Card className="demo-card max-w-4xl mx-auto p-8 md:p-12 animate-fade-in">
          <div className="flex items-start gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-gradient-alva flex items-center justify-center shadow-primary flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Introduction: The SME Owner's Dilemma
              </h2>
            </div>
          </div>
          
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              As a business owner, your phone is a double-edged sword. It's your direct line to new customers and critical opportunities. But it's also your biggest source of interruptions, pulling you away from the core work that drives your business forward.
            </p>
            <p>
              You're constantly forced to choose: answer the call and lose focus, or ignore it and risk losing a customer forever.
            </p>
            <p className="font-semibold text-foreground">
              This report quantifies the real cost of this dilemma and introduces a new way to operate. A way where you can capture every opportunity without sacrificing your focus, turning your phone from a source of stress into your most valuable asset.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ROIIntroSection;
