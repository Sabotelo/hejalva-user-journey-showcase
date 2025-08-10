import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, CheckCircle, Play, MousePointer2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DemoStep {
  id: number;
  title: string;
  description: string;
  action: string;
  completed: boolean;
}

const InteractiveDemo = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [demoSteps, setDemoSteps] = useState<DemoStep[]>([
    {
      id: 1,
      title: t('step1.title'),
      description: t('step1.description'),
      action: t('step1.action'),
      completed: false
    },
    {
      id: 2,
      title: t('step2.title'),
      description: t('step2.description'),
      action: t('step2.action'),
      completed: false
    },
    {
      id: 3,
      title: t('step3.title'),
      description: t('step3.description'),
      action: t('step3.action'),
      completed: false
    },
    {
      id: 4,
      title: t('step4.title'),
      description: t('step4.description'),
      action: t('step4.action'),
      completed: false
    }
  ]);

  const handleStepComplete = (stepIndex: number) => {
    const updatedSteps = [...demoSteps];
    updatedSteps[stepIndex].completed = true;
    setDemoSteps(updatedSteps);
    
    if (stepIndex < demoSteps.length - 1) {
      setTimeout(() => {
        setCurrentStep(stepIndex + 1);
      }, 500);
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setDemoSteps([
      { id: 1, title: t('step1.title'), description: t('step1.description'), action: t('step1.action'), completed: false },
      { id: 2, title: t('step2.title'), description: t('step2.description'), action: t('step2.action'), completed: false },
      { id: 3, title: t('step3.title'), description: t('step3.description'), action: t('step3.action'), completed: false },
      { id: 4, title: t('step4.title'), description: t('step4.description'), action: t('step4.action'), completed: false }
    ]);
  };

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-accent/10 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {t('demo.title')} <span className="text-gradient">{t('demo.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('demo.subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Demo Steps */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">{t('demo.interactiveJourney')}</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetDemo}
                  className="text-xs"
                >
                  {t('demo.resetDemo')}
                </Button>
              </div>
              
              {demoSteps.map((step, index) => (
                <Card 
                  key={step.id}
                  className={`demo-card p-6 cursor-pointer transition-all duration-300 ${
                    index === currentStep 
                      ? 'ring-2 ring-primary shadow-primary' 
                      : index < currentStep 
                        ? 'bg-accent/20 border-primary/20' 
                        : 'opacity-60'
                  } ${index <= currentStep ? 'interactive-step' : ''}`}
                  onClick={() => index === currentStep && handleStepComplete(index)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`step-indicator ${step.completed ? 'bg-green-500' : ''}`}>
                      {step.completed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        step.id
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1">{step.title}</h4>
                      <p className="text-muted-foreground text-sm mb-2">{step.description}</p>
                      
                      {index === currentStep && (
                        <div className="flex items-center text-primary text-sm font-medium animate-bounce-subtle">
                          <MousePointer2 className="h-4 w-4 mr-2" />
                          {step.action}
                        </div>
                      )}
                    </div>
                    
                    <ChevronRight className={`h-5 w-5 transition-transform ${
                      index === currentStep ? 'animate-bounce-subtle' : ''
                    }`} />
                  </div>
                </Card>
              ))}
            </div>

            {/* Demo Visualization */}
            <div className="relative">
              <Card className="demo-card p-8 min-h-[400px] flex items-center justify-center bg-gradient-card border-2">
                <div className="text-center space-y-6">
                  <div className="relative mx-auto w-32 h-32 rounded-full bg-gradient-alva flex items-center justify-center shadow-elevated animate-glow">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">
                      {demoSteps[currentStep]?.title || t('demo.complete')}
                    </h3>
                    <p className="text-muted-foreground">
                      {currentStep < demoSteps.length 
                        ? demoSteps[currentStep]?.description 
                        : t('demo.congratulations')}
                    </p>
                  </div>
                  
                  {currentStep >= demoSteps.length && (
                    <Button 
                      className="bg-gradient-secondary shadow-secondary hover:shadow-elevated transition-all duration-300"
                      onClick={resetDemo}
                    >
                      {t('demo.tryAgain')}
                    </Button>
                  )}
                </div>
              </Card>
              
              {/* Floating indicator */}
              {currentStep < demoSteps.length && (
                <div className="absolute -top-4 -right-4 bg-primary text-white text-xs px-3 py-1 rounded-full shadow-primary animate-bounce-subtle">
                  {t('demo.step')} {currentStep + 1} {t('demo.of')} {demoSteps.length}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;