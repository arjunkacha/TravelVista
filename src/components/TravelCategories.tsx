import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Palmtree, Mountain, Utensils, Landmark, Compass, MapPin, Camera, Briefcase, Tent } from 'lucide-react';

interface CategoryProps {
  title: string;
  description: string;
  image: string;
  color: string;
  icon: React.ReactNode;
}

const Category: React.FC<CategoryProps> = ({ title, description, image, color, icon }) => {
  const navigate = useNavigate();
  
  const handleExplore = () => {
    navigate('/preferences', { state: { preference: title.toLowerCase() } });
  };
  
  return (
    <Card className="category-card overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
      <div className="relative h-48">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80';
          }}
        />
        <div className={`absolute inset-0 bg-opacity-20`} style={{backgroundColor: `var(--${color}-500)`}}></div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-full text-white" style={{backgroundColor: `var(--${color}-500)`}}>
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button 
          onClick={handleExplore}
          className={`w-full text-white hover:bg-opacity-90`}
          style={{backgroundColor: `var(--${color}-500)`}}
        >
          Explore {title}
        </Button>
      </div>
    </Card>
  );
};

const TravelCategories: React.FC = () => {
  const categories = [
    {
      title: 'Beach',
      description: 'Relax on sandy shores, swim in crystal clear waters, and enjoy coastal activities.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop',
      color: 'travel',
      icon: <Palmtree size={24} />,
    },
    {
      title: 'Mountain',
      description: 'Hike scenic trails, breathe fresh mountain air, and discover stunning vistas.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
      color: 'mountain',
      icon: <Mountain size={24} />,
    },
    {
      title: 'Food',
      description: 'Taste local cuisines, visit food markets, and enjoy culinary experiences.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop',
      color: 'food',
      icon: <Utensils size={24} />,
    },
    {
      title: 'Cultural',
      description: 'Explore historical sites, museums, and immerse yourself in local traditions.',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=2070&auto=format&fit=crop',
      color: 'travel',
      icon: <Landmark size={24} />,
    },
    {
      title: 'Adventure',
      description: 'Seek thrilling activities, outdoor adventures, and adrenaline-pumping experiences.',
      image: 'https://images.unsplash.com/photo-1527631120902-378417754324?q=80&w=2070&auto=format&fit=crop',
      color: 'mountain',
      icon: <Compass size={24} />,
    },
    {
      title: 'City',
      description: 'Explore vibrant cities, iconic landmarks, and enjoy urban adventures.',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop',
      color: 'food',
      icon: <MapPin size={24} />,
    },
    {
      title: 'Photography',
      description: 'Capture stunning landscapes, wildlife, and cultural moments on your journey.',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2138&auto=format&fit=crop',
      color: 'travel',
      icon: <Camera size={24} />,
    },
    {
      title: 'Wellness',
      description: 'Focus on relaxation, spa treatments, yoga, and mindful experiences.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2140&auto=format&fit=crop',
      color: 'mountain',
      icon: <Briefcase size={24} />,
    },
    {
      title: 'Camping',
      description: 'Connect with nature, sleep under the stars, and enjoy outdoor activities.',
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop',
      color: 'food',
      icon: <Tent size={24} />,
    },
    {
      title: 'Wildlife',
      description: 'Observe exotic animals in their natural habitats and explore nature reserves.',
      image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=2070&auto=format&fit=crop',
      color: 'travel',
      icon: <Compass size={24} />,
    },
    {
      title: 'Island',
      description: 'Discover paradise islands, hidden coves, and tropical getaways.',
      image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2070&auto=format&fit=crop',
      color: 'mountain',
      icon: <Palmtree size={24} />,
    },
    {
      title: 'Winter',
      description: 'Experience snow sports, cozy cabins, and winter wonderlands.',
      image: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?q=80&w=2070&auto=format&fit=crop',
      color: 'food',
      icon: <Mountain size={24} />,
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore by Experience</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our curated travel experiences based on your preferences and interests.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Category key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelCategories;
