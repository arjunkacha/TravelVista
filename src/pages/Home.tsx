import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { MapPin, Compass, Calendar, DollarSign, ArrowRight } from 'lucide-react';

// Hero section background styles
const heroStyle = {
  backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative min-h-[85vh] flex items-center">
          {/* Background image */}
          <div 
            className="absolute inset-0"
            style={{
              ...heroStyle,
              filter: 'brightness(0.75) contrast(1.2) saturate(1.1)'
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70" />
          
          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-px w-8 bg-white/60"></div>
                <span className="text-white/80 uppercase tracking-wider text-sm font-medium">Your Journey Begins Here</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl drop-shadow-xl">
                Plan Your Perfect
                <br />
                <span className="text-white/90">Adventure</span>
              </h1>
              <p className="mt-8 text-xl text-white/80 max-w-2xl drop-shadow-lg font-light leading-relaxed">
                Create personalized travel itineraries tailored to your preferences. 
                Whether you're seeking beach relaxation, mountain adventures, or cultural experiences, 
                we've got you covered.
              </p>
              <div className="mt-12 flex items-center space-x-6">
                <Button
                  onClick={() => navigate('/preferences')}
                  className="group bg-white/95 text-gray-900 hover:bg-white px-10 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center"
                >
                  Start Planning
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <span className="text-white/60 text-sm">No credit card required</span>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="h-px w-8 bg-gray-300"></div>
                <span className="text-gray-500 uppercase tracking-wider text-sm font-medium">Simple Process</span>
                <div className="h-px w-8 bg-gray-300"></div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                How It Works
              </h2>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                Create your perfect trip in just a few simple steps
              </p>
            </div>

            <div className="mt-24">
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                {/* Step 1 */}
                <div className="relative group">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-travel-50 text-travel-600 mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Compass className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose Your Style</h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Select from various travel styles like beach, mountain, cultural, and more
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative group">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-travel-50 text-travel-600 mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Pick Your Destination</h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Choose from our curated list of amazing destinations worldwide
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative group">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-travel-50 text-travel-600 mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Set Your Dates</h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Select your travel dates and duration for the perfect trip timing
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative group">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-travel-50 text-travel-600 mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                      <DollarSign className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Set Your Budget</h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Specify your budget and we'll create an itinerary that fits
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home; 