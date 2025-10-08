import { Card } from "@/components/ui/card";
import { Calculator, TrendingUp } from "lucide-react";

const ROIOpportunityCostSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quantifying the <span className="text-gradient">Opportunity Cost</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's put real numbers on this. What is a missed call actually costing your business?
            </p>
          </div>

          <Card className="demo-card p-8 md:p-12 bg-gradient-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wide text-primary font-semibold">Assumption</p>
                  <p>The average value of a new customer is <span className="font-bold text-foreground text-2xl">3,000 SEK</span></p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wide text-primary font-semibold">Missed Calls</p>
                  <p>Your business misses just <span className="font-bold text-foreground text-2xl">4 calls per day</span></p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <p className="font-semibold text-foreground">
                    <span className="text-primary">4 missed calls/day</span> × 21 workdays = <strong className="text-lg">84 missed opportunities per month</strong>
                  </p>
                </div>
                
                <p className="text-center text-lg mb-6 text-muted-foreground">
                  If you could convert just <strong className="text-green-600 text-xl">5%</strong> of those missed calls (about 4 new customers a month), that would be:
                </p>
                
                <div className="text-center p-8 rounded-lg bg-gradient-alva relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 animate-pulse-slow"></div>
                  <p className="relative text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
                    144,000 SEK
                  </p>
                  <p className="relative text-white/90 text-lg mt-2">in additional annual revenue</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ROIOpportunityCostSection;
