import React from 'react';
import { MapPin, Calendar, Star, Share2 } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <MapPin size={32} className="text-travel-600" />,
      title: 'Personalized Recommendations',
      description: 'Get travel suggestions tailored to your personal preferences and interests.'
    },
    {
      icon: <Calendar size={32} className="text-travel-600" />,
      title: 'Day-by-Day Itineraries',
      description: 'Receive detailed daily plans including activities, dining, and transportation.'
    },
    {
      icon: <Star size={32} className="text-travel-600" />,
      title: 'Hidden Gems',
      description: 'Discover off-the-beaten-path locations and authentic local experiences.'
    },
    {
      icon: <Share2 size={32} className="text-travel-600" />,
      title: 'Share Your Plans',
      description: 'Easily share your itineraries with friends and travel companions.'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Plan with TravelVista</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our travel planning service makes creating the perfect trip easy and enjoyable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-travel-50 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
