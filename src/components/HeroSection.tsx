import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-skincare.jpg";

export const HeroSection = () => {
  const scrollToUpload = () => {
    document.getElementById('image-upload')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-glow-pink/20 to-glow-lavender/30"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-glow-green/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-32 right-20 w-24 h-24 bg-glow-cream/30 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left space-y-6 animate-fadeIn">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Your <span className="text-primary">skin</span> deserves
                <br />
                <span className="text-accent-foreground">gentle care</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Start your skincare journey with confidence. Get personalized, science-based advice 
                that's gentle, inclusive, and judgment-free.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  variant="hero"
                  onClick={scrollToUpload}
                  className="group"
                >
                  Start Your Analysis
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">✨</span>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  How It Works
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <div className="relative rounded-3xl overflow-hidden shadow-glow">
                <img 
                  src={heroImage} 
                  alt="A warm, empowering scene of self-care: a diverse person gently applying skincare in a bright, minimal bathroom with soft morning light and plants"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -bottom-4 -left-4 bg-card/80 backdrop-blur-sm rounded-2xl p-4 shadow-soft animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-glow-pink rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Privacy First</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};