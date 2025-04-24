import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/preferences');
  };
  
  const handleExploreDestinations = () => {
    navigate('/destinations');
  };

  return (
    <section className="hero-section relative h-[85vh] flex items-center bg-black/50">
      <div className="container mx-auto px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Discover Your Perfect Travel Experience
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Personalized travel itineraries based on your preferences. 
            Just tell us what you love and we'll plan the perfect trip for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg font-semibold transition-colors"
              onClick={handleGetStarted}
            >
              Plan Your Journey
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-blue-500 hover:bg-blue-500 hover:border-blue-500 hover:text-white px-8 py-6 text-lg font-semibold flex items-center gap-2 transition-colors"
              onClick={handleExploreDestinations}
            >
              <Compass className="h-5 w-5" />
              <span>Explore Destinations</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
