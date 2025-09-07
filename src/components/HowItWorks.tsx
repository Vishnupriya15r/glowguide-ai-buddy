import { Camera, Brain, MapPin } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Camera,
      title: "Analyze Photo",
      description: "Upload a selfie or take a photo with your camera. Our AI analyzes your skin type and concerns instantly.",
      color: "glow-pink"
    },
    {
      icon: Brain,
      title: "Educational Advice",
      description: "Get personalized home remedies and learn about skincare chemistry - no product promotion, just education.",
      color: "glow-green"
    },
    {
      icon: MapPin,
      title: "Local Dermatologist",
      description: "Find qualified dermatologists near you for professional consultation when needed.",
      color: "glow-lavender"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-glow-cream/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-primary">GlowGuide</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to start your personalized skincare journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-${step.color}/20 flex items-center justify-center group-hover:shadow-glow transition-all duration-300`}>
                <step.icon className={`w-10 h-10 text-${step.color === 'glow-pink' ? 'primary' : step.color === 'glow-green' ? 'secondary-foreground' : 'accent-foreground'}`} />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className={`w-6 h-6 rounded-full bg-${step.color}/30 flex items-center justify-center text-xs font-bold`}>
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};