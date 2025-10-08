import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const ROIComparisonSection = () => {
  const comparisons = [
    {
      feature: "Customer Experience",
      oldWay: "Frustrating voicemail, delays, missed calls",
      alvaWay: "Instant, professional, 24/7 service"
    },
    {
      feature: "Your Focus",
      oldWay: "Constantly interrupted, split attention",
      alvaWay: "Uninterrupted focus on core work"
    },
    {
      feature: "Lead Capture",
      oldWay: "High risk of losing leads to competitors",
      alvaWay: "100% of inbound opportunities captured"
    },
    {
      feature: "Data & Insights",
      oldWay: "No data, just a list of missed calls",
      alvaWay: "Automated summaries & insights"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The ROI of Automation: <span className="text-gradient">A Direct Comparison</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See the difference Alva makes for your business
            </p>
          </div>

          <div className="space-y-6">
            {comparisons.map((item, index) => (
              <Card 
                key={index}
                className="demo-card overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="grid md:grid-cols-3 gap-6 p-6">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-primary">{item.feature}</h3>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <X className="h-4 w-4 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.oldWay}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-600">{item.alvaWay}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="demo-card mt-8 p-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <p className="text-lg text-muted-foreground leading-relaxed">
                The ROI is immediate. By capturing just <strong className="text-green-700 dark:text-green-400 text-xl">one additional customer</strong> that would have otherwise been a missed call, Alva has already paid for its monthly subscription several times over.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ROIComparisonSection;
