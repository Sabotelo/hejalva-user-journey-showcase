import Navigation from "@/components/Navigation";
import LiveDemoSection from "@/components/LiveDemoSection";
import Footer from "@/components/Footer";

const Demo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary-dark to-primary">
      <Navigation />
      <div className="pt-16">
        <LiveDemoSection />
      </div>
      <Footer />
    </div>
  );
};

export default Demo;
