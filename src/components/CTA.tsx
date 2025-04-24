
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const CTA: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/preferences');
  };
  
  return (
    <section className="py-16 bg-travel-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-lg mb-8 opacity-90">
            Answer a few questions about your travel preferences and we'll create the perfect itinerary for you.
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            className="bg-white text-travel-800 hover:bg-gray-100 px-8 py-6 text-lg"
          >
            Plan Your Trip Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
