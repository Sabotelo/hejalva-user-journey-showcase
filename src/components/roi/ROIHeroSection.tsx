import AlvaLogo from "@/components/AlvaLogo";

const ROIHeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-alva opacity-20 blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-secondary opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 h-60 w-60 rounded-full bg-gradient-primary opacity-10 blur-2xl animate-pulse-slow"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex justify-center">
            <AlvaLogo size={80} className="animate-fade-in" />
          </div>
          
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl animate-fade-in">
            Unlock the Full Potential of <span className="text-gradient">Your Business Phone</span>
          </h1>
          
          <p className="text-xl text-muted-foreground md:text-2xl max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            A guide for ambitious small and medium-sized businesses.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ROIHeroSection;
