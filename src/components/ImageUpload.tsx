import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, X, Shield, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageAnalyzed: (result: any) => void;
}

export const ImageUpload = ({ onImageAnalyzed }: ImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      // Create a simple camera interface
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // For demo purposes, we'll just capture after 2 seconds
        setTimeout(() => {
          if (ctx) {
            ctx.drawImage(video, 0, 0);
            canvas.toBlob((blob) => {
              if (blob) {
                const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
                handleFileSelect(file);
              }
              stream.getTracks().forEach(track => track.stop());
            });
          }
        }, 2000);
      };
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access or upload a file instead",
        variant: "destructive"
      });
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Mock API call - in real app this would POST to /api/analyze-image
    setTimeout(() => {
      const mockResult = {
        skinType: "Combination",
        confidence: 0.85,
        issues: ["mild acne", "dry patches"],
        advice: {
          homeRemedies: [
            "Gentle honey mask twice weekly for natural antibacterial benefits",
            "Aloe vera gel for soothing dry patches - apply thin layer at night",
            "Green tea toner to balance oily and dry areas"
          ],
          chemicals: [
            "Salicylic acid (BHA) - Gentle exfoliant for acne-prone areas. Start with 0.5% concentration 2-3 times per week.",
            "Hyaluronic acid - Lightweight moisturizer that won't clog pores. Perfect for combination skin hydration.",
            "Niacinamide - Reduces oil production and minimizes pores. Use 5% concentration in morning routine."
          ]
        }
      };
      
      onImageAnalyzed(mockResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete!",
        description: "Your skin analysis is ready",
      });
    }, 3000);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section id="image-upload" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your <span className="text-primary">Skin Analysis</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-2">
              Upload a clear photo of your face for personalized skincare insights
            </p>
            <p className="text-sm text-muted-foreground italic">
              தனிப்பயனாக்கப்பட்ட சருமப் பராமரிப்பு நுண்ணறிவுகளுக்காக உங்கள் முகத்தின் தெளிவான புகைப்படத்தைப் பதிவேற்றவும்
            </p>
          </div>

          <div className="gradient-card rounded-3xl p-8 shadow-soft">
            {!imagePreview ? (
              <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center space-y-6">
                <div className="w-24 h-24 mx-auto bg-glow-pink/10 rounded-full flex items-center justify-center">
                  <Camera className="w-12 h-12 text-primary" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Upload Your Photo</h3>
                  <p className="text-muted-foreground">
                    Take a selfie or upload from your device
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleCameraCapture}
                    variant="hero"
                    size="lg"
                    className="gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    Take Photo
                  </Button>
                  
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    size="lg"
                    className="gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Upload File
                  </Button>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                  className="hidden"
                  aria-label="Upload image file"
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Selected image for skin analysis"
                    className="w-full max-w-md mx-auto rounded-2xl shadow-glow"
                  />
                  <Button
                    onClick={clearImage}
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    aria-label="Remove selected image"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-center space-y-4">
                  <Button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    variant="hero"
                    size="lg"
                    className="gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5" />
                        Analyze My Skin
                      </>
                    )}
                  </Button>
                  
                  <p className="text-sm text-muted-foreground">
                    Analysis takes about 30 seconds
                  </p>
                </div>
              </div>
            )}
            
            {/* Privacy Notice */}
            <div className="mt-8 p-4 bg-glow-cream/50 rounded-xl border border-border">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm space-y-1">
                  <p className="font-medium">Privacy Promise</p>
                  <p className="text-muted-foreground">
                    Your images are analyzed locally and not stored permanently unless you consent. 
                    We don't sell your data or use it for advertising.
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    உங்கள் படங்கள் உள்ளூரில் பகுப்பாய்வு செய்யப்படுகின்றன, நீங்கள் சம்மதிக்காத வரை நிரந்தரமாக சேமிக்கப்படாது
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};