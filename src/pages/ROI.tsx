import { Button } from "@/components/ui/button";
import AlvaLogo from "@/components/AlvaLogo";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";

const ROI = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto bg-card p-8 md:p-12 my-10 shadow-elevated rounded-lg border">
          
          {/* Header with Logo */}
          <div className="text-center mb-10">
            <AlvaLogo size={60} className="mx-auto" />
          </div>

          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              Unlock the Full Potential of Your Business Phone
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              A guide for ambitious small and medium-sized businesses.
            </p>
          </header>

          {/* Introduction Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2 mb-6">
              Introduction: The SME Owner's Dilemma
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As a business owner, your phone is a double-edged sword. It's your direct line to new customers and critical opportunities. But it's also your biggest source of interruptions, pulling you away from the core work that drives your business forward.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You're constantly forced to choose: answer the call and lose focus, or ignore it and risk losing a customer forever.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This report quantifies the real cost of this dilemma and introduces a new way to operate. A way where you can capture every opportunity without sacrificing your focus, turning your phone from a source of stress into your most valuable asset.
            </p>
          </section>

          {/* Challenge Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2 mb-6">
              1. The Challenge: The True Cost of a Missed Call
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Industry data is clear: <strong className="font-bold text-destructive">over 60% of calls to small businesses go unanswered</strong>. Each one of those calls isn't just a missed connection; it's a tangible loss.
            </p>
            <ul className="list-disc list-inside mt-4 text-muted-foreground leading-relaxed space-y-2 mb-4">
              <li><strong className="font-semibold">Lost Revenue:</strong> A new customer who immediately calls your competitor.</li>
              <li><strong className="font-semibold">Damaged Reputation:</strong> An existing customer who feels their business isn't valued.</li>
              <li><strong className="font-semibold">Constant Interruptions:</strong> Your own valuable time and focus, shattered by the need to be your own receptionist.</li>
            </ul>
            <div className="bg-accent/50 p-4 rounded-lg border border-primary/20">
              <p className="text-muted-foreground leading-relaxed">
                Your phone service ensures the call gets through. <strong className="text-primary">Alva ensures the opportunity is captured.</strong>
              </p>
            </div>
          </section>

          {/* Opportunity Cost Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2 mb-6">
              2. Quantifying the Opportunity Cost
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Let's put real numbers on this. What is a missed call actually costing your business?
            </p>
            <div className="bg-muted/50 p-6 rounded-lg border border-border">
              <ul className="text-muted-foreground leading-relaxed space-y-2">
                <li>Assumption: The average value of a new customer is <span className="font-semibold text-foreground">3,000 SEK</span>.</li>
                <li>Your business misses just <span className="font-semibold text-foreground">4 calls per day</span> (due to being busy, on a job, or after hours).</li>
                <li className="pt-2 border-t border-border mt-2">
                  <span className="font-semibold text-foreground">4 missed calls/day</span> x 21 workdays = <strong className="font-bold">84 missed opportunities per month.</strong>
                </li>
                <li className="pt-2 text-lg">
                  If you could convert just <strong className="font-bold text-green-600">5%</strong> of those missed calls (about 4 new customers a month), that would be:
                </li>
                <li className="text-center pt-2">
                  <span className="block text-3xl font-bold text-green-600">144,000 SEK in additional annual revenue.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Solution Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2 mb-6">
              3. The Solution: Alva – Your Intelligent AI Receptionist
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Alva is an AI-driven receptionist designed specifically for SMEs. She integrates with your existing business number to provide an immediate, intelligent, and professional response to every single call, 24/7.
            </p>
            <ul className="list-disc list-inside mt-4 text-muted-foreground leading-relaxed space-y-2">
              <li><strong className="font-semibold text-primary">100% Call Capture:</strong> Never miss a call again. Alva answers instantly, every time.</li>
              <li><strong className="font-semibold text-primary">Automated Appointment Booking:</strong> Alva checks your calendar and books appointments for you, saving hours of admin time.</li>
              <li><strong className="font-semibold text-primary">Professional First Impression:</strong> Greet every customer with a clear, polite, and helpful voice that reflects the quality of your business.</li>
              <li><strong className="font-semibold text-primary">Call Summaries:</strong> Get a concise summary of every conversation sent directly to your email, so you're always in the loop.</li>
            </ul>
          </section>

          {/* ROI Comparison Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2 mb-6">
              4. The ROI of Automation: A Direct Comparison
            </h2>
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-left border-collapse border border-border rounded-lg overflow-hidden">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="p-4 font-semibold">Feature</th>
                    <th className="p-4 font-semibold">The Old Way (Voicemail & Interruptions)</th>
                    <th className="p-4 font-semibold">The Alva Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="p-4 font-semibold text-primary">Customer Experience</td>
                    <td className="p-4 text-muted-foreground">Frustrating voicemail, delays, missed calls</td>
                    <td className="p-4 font-bold text-green-600">Instant, professional, 24/7 service</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-semibold text-primary">Your Focus</td>
                    <td className="p-4 text-muted-foreground">Constantly interrupted, split attention</td>
                    <td className="p-4 font-bold text-green-600">Uninterrupted focus on core work</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="p-4 font-semibold text-primary">Lead Capture</td>
                    <td className="p-4 text-muted-foreground">High risk of losing leads to competitors</td>
                    <td className="p-4 font-bold text-green-600">100% of inbound opportunities captured</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-semibold text-primary">Data & Insights</td>
                    <td className="p-4 text-muted-foreground">No data, just a list of missed calls</td>
                    <td className="p-4 font-bold text-green-600">Automated summaries & insights</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-center font-semibold leading-relaxed mt-6 bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-muted-foreground">
                The ROI is immediate. By capturing just <strong className="text-green-700 dark:text-green-400">one additional customer</strong> that would have otherwise been a missed call, Alva has already paid for its monthly subscription several times over.
              </p>
            </div>
          </section>

          {/* Conclusion Section */}
          <section className="text-center mt-12">
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2 mb-6">
              Conclusion: Turn Your Phone Line into Your Best Employee
            </h2>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Your business phone is more than just a utility—it's your primary engine for growth. It's time to equip it with the intelligence it deserves.
            </p>
            <p className="text-primary leading-relaxed mt-4 font-semibold text-lg">
              Stop losing customers to your voicemail. Let Alva turn every call into a business opportunity.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-alva shadow-primary hover:shadow-elevated hover:scale-105 transition-all duration-300 text-lg px-8 py-3 mt-8"
              onClick={() => window.location.href = '/#demo'}
            >
              Request a 15-Minute Demo
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ROI;
