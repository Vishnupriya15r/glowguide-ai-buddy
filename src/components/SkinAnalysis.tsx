import { CheckCircle, BookOpen, Beaker, AlertTriangle } from 'lucide-react';

interface AnalysisResult {
  skinType: string;
  confidence: number;
  issues: string[];
  advice: {
    homeRemedies: string[];
    chemicals: string[];
  };
}

interface SkinAnalysisProps {
  result: AnalysisResult | null;
}

export const SkinAnalysis = ({ result }: SkinAnalysisProps) => {
  if (!result) return null;

  return (
    <section className="py-20 bg-glow-cream/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your <span className="text-primary">Skin Analysis</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Based on AI analysis of your photo
            </p>
            <p className="text-sm text-muted-foreground italic">
              உங்கள் புகைப்படத்தின் AI பகுப்பாய்வின் அடிப்படையில்
            </p>
          </div>

          <div className="space-y-8">
            {/* Skin Type Result */}
            <div className="gradient-card rounded-3xl p-8 shadow-soft">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-glow-pink/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Skin Type: {result.skinType}</h3>
                  <p className="text-muted-foreground">
                    Confidence: {Math.round(result.confidence * 100)}%
                  </p>
                </div>
              </div>
              
              {result.issues.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-accent-foreground" />
                    Identified Concerns
                    <span className="text-sm text-muted-foreground italic ml-2">
                      (கண்டறியப்பட்ட கவலைகள்)
                    </span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.issues.map((issue, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-accent/30 text-accent-foreground rounded-full text-sm"
                      >
                        {issue}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Home Remedies */}
            <div className="gradient-card rounded-3xl p-8 shadow-soft">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-glow-green/20 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Natural Home Remedies</h3>
                  <p className="text-muted-foreground">
                    Gentle, natural approaches you can try
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    நீங்கள் முயற்சி செய்யக்கூடிய மென்மையான, இயற்கையான அணுகுமுறைகள்
                  </p>
                </div>
              </div>
              
              <ul className="space-y-4">
                {result.advice.homeRemedies.map((remedy, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-glow-green rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-muted-foreground leading-relaxed">{remedy}</p>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 bg-secondary/20 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  <strong>Reminder:</strong> Natural remedies work slowly and gently. 
                  Patch test any new ingredient on a small area first.
                </p>
              </div>
            </div>

            {/* Chemical Information */}
            <div className="gradient-card rounded-3xl p-8 shadow-soft">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-glow-lavender/20 rounded-full flex items-center justify-center">
                  <Beaker className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Skincare Chemistry</h3>
                  <p className="text-muted-foreground">
                    Understanding the science behind effective ingredients
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    பயனுள்ள பொருட்களின் பின்னணியில் உள்ள அறிவியலைப் புரிந்துகொள்வது
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {result.advice.chemicals.map((chemical, index) => (
                  <div key={index} className="p-4 bg-background/50 rounded-xl">
                    <p className="text-muted-foreground leading-relaxed">{chemical}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                <p className="text-sm text-destructive-foreground">
                  <strong>Important:</strong> This is educational information only. 
                  Always consult a dermatologist before starting new treatments, 
                  especially for persistent or severe skin concerns.
                </p>
                <p className="text-xs text-muted-foreground italic mt-1">
                  எப்போதும் புதிய சிகிச்சைகளைத் தொடங்கும் முன் தோல் மருத்துவரை அணுகவும்
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};