import Navigation from "@/components/Navigation";
import ROIHeroSection from "@/components/roi/ROIHeroSection";
import ROIIntroSection from "@/components/roi/ROIIntroSection";
import ROIChallengeSection from "@/components/roi/ROIChallengeSection";
import ROIOpportunityCostSection from "@/components/roi/ROIOpportunityCostSection";
import ROISolutionSection from "@/components/roi/ROISolutionSection";
import ROIComparisonSection from "@/components/roi/ROIComparisonSection";
import ROIConclusionSection from "@/components/roi/ROIConclusionSection";
import Footer from "@/components/Footer";

const ROI = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <ROIHeroSection />
      <ROIIntroSection />
      <ROIChallengeSection />
      <ROIOpportunityCostSection />
      <ROISolutionSection />
      <ROIComparisonSection />
      <ROIConclusionSection />
      <Footer />
    </div>
  );
};

export default ROI;
