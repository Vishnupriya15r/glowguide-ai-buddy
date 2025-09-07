import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorks } from '@/components/HowItWorks';
import { ImageUpload } from '@/components/ImageUpload';
import { SkinAnalysis } from '@/components/SkinAnalysis';
import { DoctorFinder } from '@/components/DoctorFinder';
import { Chatbot } from '@/components/Chatbot';

interface AnalysisResult {
  skinType: string;
  confidence: number;
  issues: string[];
  advice: {
    homeRemedies: string[];
    chemicals: string[];
  };
}

const GlowGuide = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleImageAnalyzed = (result: AnalysisResult) => {
    setAnalysisResult(result);
    // Scroll to results
    setTimeout(() => {
      document.getElementById('skin-analysis')?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <ImageUpload onImageAnalyzed={handleImageAnalyzed} />
      {analysisResult && (
        <div id="skin-analysis">
          <SkinAnalysis result={analysisResult} />
        </div>
      )}
      <DoctorFinder />
      <Chatbot />
      
      {/* Developer Notes - Hidden */}
      <div style={{ display: 'none' }}>
        {/* Hero Image Prompt for future regeneration:
        "A warm, empowering, photorealistic scene of self-care: a diverse adult person gently applying skincare in a bright, minimal home bathroom. Soft morning sunlight through a window, small green plants on the counter, a round mirror, pastel color palette, shallow depth of field and soft bokeh. The subject is relaxed and confident — inclusive representation (women and men friendly) — skin-first, non-judgmental mood. High resolution, natural skin tones, cinematic soft lighting, subtle film grain, inviting and hopeful atmosphere. 16:9 aspect ratio. Ultra high resolution."
        */}
        
        {/* API Schemas for Backend Implementation:
        
        POST /api/analyze-image (multipart/form-data)
        Response: {
          skinType: "Dry|Oily|Combination|Normal|Sensitive|Acne-prone",
          confidence: 0-1,
          issues: ["acne","dark spots","wrinkles"],
          advice: {
            homeRemedies: ["Natural remedy 1", "Natural remedy 2"],
            chemicals: ["Chemical explanation 1", "Chemical explanation 2"]
          }
        }
        
        GET /api/find-doctors?lat={lat}&lng={lng}
        Response: [
          {
            name: "Dr. Name",
            clinic: "Clinic Name",
            address: "Full address",
            distance_km: 2.5,
            phone: "+91-xxx-xxx-xxxx",
            rating?: 4.5,
            specialization?: "Clinical Dermatology"
          }
        ]
        
        POST /api/chat
        Body: { message: "User message" }
        Response: { reply: "Bot response" }
        */}
      </div>
    </div>
  );
};

export default GlowGuide;