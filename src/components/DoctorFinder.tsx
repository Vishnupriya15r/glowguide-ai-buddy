import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Navigation, Search, Clock, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Doctor {
  id: string;
  name: string;
  clinic: string;
  address: string;
  distance_km: number;
  phone: string;
  rating?: number;
  specialization?: string;
}

export const DoctorFinder = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [citySearch, setCitySearch] = useState('');
  const { toast } = useToast();

  const handleLocationRequest = () => {
    setIsLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(coords);
          fetchDoctors(coords.lat, coords.lng);
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            title: "Location access denied",
            description: "Please search by city name instead",
            variant: "destructive"
          });
          setIsLoading(false);
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Please search by city name instead",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const handleCitySearch = (city: string) => {
    if (!city.trim()) return;
    
    setIsLoading(true);
    // Mock coordinates for major Indian cities
    const cityCoords: Record<string, { lat: number; lng: number }> = {
      'delhi': { lat: 28.6139, lng: 77.2090 },
      'mumbai': { lat: 19.0760, lng: 72.8777 },
      'bangalore': { lat: 12.9716, lng: 77.5946 },
      'chennai': { lat: 13.0827, lng: 80.2707 },
      'kolkata': { lat: 22.5726, lng: 88.3639 },
      'hyderabad': { lat: 17.3850, lng: 78.4867 },
      'pune': { lat: 18.5204, lng: 73.8567 },
      'ahmedabad': { lat: 23.0225, lng: 72.5714 }
    };

    const coords = cityCoords[city.toLowerCase()];
    if (coords) {
      setLocation(coords);
      fetchDoctors(coords.lat, coords.lng);
    } else {
      toast({
        title: "City not found",
        description: "Please try Delhi, Mumbai, Bangalore, Chennai, etc.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const fetchDoctors = async (lat: number, lng: number) => {
    // Mock API call - in real app this would call /api/find-doctors?lat=&lng=
    setTimeout(() => {
      const mockDoctors: Doctor[] = [
        {
          id: '1',
          name: 'Dr. Priya Sharma',
          clinic: 'Metro Dermatology Center',
          address: '123 Main Road, Central District',
          distance_km: 2.3,
          phone: '+91-11-2851-2345',
          rating: 4.8,
          specialization: 'Clinical Dermatology'
        },
        {
          id: '2',
          name: 'Dr. Rajesh Kumar',
          clinic: 'Skin Care Specialists',
          address: '456 Medical Complex, City Center',
          distance_km: 3.7,
          phone: '+91-11-2852-6789',
          rating: 4.6,
          specialization: 'Cosmetic Dermatology'
        },
        {
          id: '3',
          name: 'Dr. Meera Nair',
          clinic: 'Advanced Skin Clinic',
          address: '789 Health Plaza, Downtown',
          distance_km: 5.1,
          phone: '+91-11-2853-9012',
          rating: 4.7,
          specialization: 'Pediatric Dermatology'
        }
      ];

      setDoctors(mockDoctors);
      setIsLoading(false);
      
      toast({
        title: "Dermatologists found!",
        description: `Found ${mockDoctors.length} specialists near you`,
      });
    }, 2000);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Find <span className="text-primary">Dermatologists</span> Near You
            </h2>
            <p className="text-lg text-muted-foreground">
              Connect with qualified skin specialists near you
            </p>
          </div>

          {/* Search Options */}
          <div className="gradient-card rounded-3xl p-8 shadow-soft mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Location-based search */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Use My Location
                </h3>
                <p className="text-muted-foreground text-sm">
                  Get the most accurate results based on your current location
                </p>
                <Button 
                  onClick={handleLocationRequest}
                  disabled={isLoading}
                  variant="hero"
                  size="lg"
                  className="w-full gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Finding doctors...
                    </>
                  ) : (
                    <>
                      <MapPin className="w-5 h-5" />
                      Find Nearby Doctors
                    </>
                  )}
                </Button>
              </div>

              {/* City search */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Search by City
                </h3>
                <p className="text-muted-foreground text-sm">
                  Enter your city name (Delhi, Mumbai, Bangalore, etc.)
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    placeholder="Enter city name..."
                    className="flex-1 p-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleCitySearch(citySearch);
                      }
                    }}
                  />
                  <Button 
                    onClick={() => handleCitySearch(citySearch)}
                    disabled={isLoading || !citySearch.trim()}
                    variant="outline"
                    size="lg"
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          {doctors.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">
                Dermatologists Near You ({doctors.length} found)
              </h3>
              
              {doctors.map((doctor) => (
                <div key={doctor.id} className="gradient-card rounded-2xl p-6 shadow-soft hover:shadow-glow transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-xl font-bold text-foreground">{doctor.name}</h4>
                          <p className="text-primary font-medium">{doctor.clinic}</p>
                          {doctor.specialization && (
                            <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                          )}
                        </div>
                        
                        {doctor.rating && (
                          <div className="flex items-center gap-1 bg-glow-green/20 px-2 py-1 rounded-full">
                            <Star className="w-4 h-4 text-secondary-foreground fill-current" />
                            <span className="text-sm font-medium">{doctor.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-muted-foreground">{doctor.address}</p>
                          <p className="text-sm text-primary">{doctor.distance_km} km away</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <a 
                          href={`tel:${doctor.phone}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {doctor.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Phone className="w-4 h-4" />
                        Call Now
                      </Button>
                      <Button variant="hero" size="sm" className="gap-2">
                        <Navigation className="w-4 h-4" />
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Disclaimer */}
              <div className="bg-glow-cream/50 border border-border rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="text-sm space-y-1">
                    <p className="font-medium">Important Note</p>
                    <p className="text-muted-foreground">
                      These are suggested dermatologists based on location. Please verify credentials, 
                      availability, and book appointments directly. GlowGuide provides suggestions only.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};