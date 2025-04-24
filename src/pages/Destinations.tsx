import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, Compass, Calendar } from 'lucide-react';

// Expanded mock data for destinations
const mockDestinations = [
  // Beach destinations
  {
    id: 1,
    name: "Bali, Indonesia",
    description: "Tropical paradise with beautiful beaches, vibrant culture, and lush landscapes.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938&auto=format&fit=crop",
    type: "beach",
    rating: 4.8,
    popular: true
  },
  {
    id: 2,
    name: "Santorini, Greece",
    description: "Stunning island with white-washed buildings, blue domes, and spectacular sunset views.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d3a6c4e9?q=80&w=2874&auto=format&fit=crop",
    type: "beach",
    rating: 4.9,
    popular: true
  },
  {
    id: 3,
    name: "Maldives",
    description: "Pristine white sand beaches and crystal-clear waters perfect for snorkeling and diving.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2665&auto=format&fit=crop",
    type: "beach",
    rating: 4.9,
    popular: true
  },
  {
    id: 4,
    name: "Cancun, Mexico",
    description: "Beautiful beaches, vibrant nightlife, and access to Mayan ruins and cenotes.",
    image: "https://images.unsplash.com/photo-1535312800630-1c173409799a?q=80&w=2787&auto=format&fit=crop",
    type: "beach",
    rating: 4.6,
    popular: false
  },
  // Mountain destinations
  {
    id: 5,
    name: "Swiss Alps",
    description: "Majestic mountain range offering world-class skiing, hiking, and breathtaking views.",
    image: "https://images.unsplash.com/photo-1531400158697-4f300bbac466?q=80&w=2960&auto=format&fit=crop",
    type: "mountain",
    rating: 4.8,
    popular: true
  },
  {
    id: 6,
    name: "Rocky Mountains, USA",
    description: "Spectacular mountain range with diverse wildlife, forests, and outdoor activities.",
    image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?q=80&w=2894&auto=format&fit=crop",
    type: "mountain",
    rating: 4.7,
    popular: false
  },
  {
    id: 7,
    name: "Himalayas, Nepal",
    description: "Home to the world's highest peaks, including Mount Everest, with stunning trekking routes.",
    image: "https://images.unsplash.com/photo-1605649461578-36153195d3fb?q=80&w=2940&auto=format&fit=crop",
    type: "mountain",
    rating: 4.9,
    popular: true
  },
  {
    id: 8,
    name: "Patagonia, Argentina/Chile",
    description: "Dramatic landscapes with glaciers, lakes, and rugged mountain peaks for adventure seekers.",
    image: "https://images.unsplash.com/photo-1531087131490-07836ca4341d?q=80&w=2940&auto=format&fit=crop",
    type: "mountain",
    rating: 4.8,
    popular: true
  },
  // Food destinations
  {
    id: 9,
    name: "Tokyo, Japan",
    description: "A culinary paradise blending traditional Japanese cuisine with innovative modern dishes.",
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2940&auto=format&fit=crop",
    type: "food",
    rating: 4.8,
    popular: true
  },
  {
    id: 10,
    name: "Lyon, France",
    description: "Known as France's gastronomic capital with exceptional restaurants and food markets.",
    image: "https://images.unsplash.com/photo-1550340499-a6c60d0517d0?q=80&w=2940&auto=format&fit=crop",
    type: "food",
    rating: 4.7,
    popular: false
  },
  {
    id: 11,
    name: "Bangkok, Thailand",
    description: "Street food heaven with bold flavors, spices, and vibrant food markets throughout the city.",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=2950&auto=format&fit=crop",
    type: "food",
    rating: 4.6,
    popular: true
  },
  {
    id: 12,
    name: "Barcelona, Spain",
    description: "Famous for tapas, seafood paella, and Catalan cuisine in a vibrant Mediterranean setting.",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2940&auto=format&fit=crop",
    type: "food",
    rating: 4.7,
    popular: true
  },
  // Cultural destinations
  {
    id: 13,
    name: "Kyoto, Japan",
    description: "Ancient temples, traditional tea houses, and beautiful gardens showcase Japanese heritage.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop",
    type: "cultural",
    rating: 4.9,
    popular: true
  },
  {
    id: 14,
    name: "Rome, Italy",
    description: "Explore ancient ruins, Renaissance art, and Vatican treasures in the Eternal City.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=2942&auto=format&fit=crop",
    type: "cultural",
    rating: 4.8,
    popular: true
  },
  {
    id: 15,
    name: "Marrakech, Morocco",
    description: "Vibrant souks, historic palaces, and rich traditions in this colorful North African city.",
    image: "https://images.unsplash.com/photo-1597212720229-vba82120523b?q=80&w=2940&auto=format&fit=crop",
    type: "cultural",
    rating: 4.6,
    popular: false
  },
  {
    id: 16,
    name: "Petra, Jordan",
    description: "Ancient city carved into rose-colored rock faces, featuring remarkable architecture and history.",
    image: "https://images.unsplash.com/photo-1563177682-6684b826331e?q=80&w=2933&auto=format&fit=crop",
    type: "cultural",
    rating: 4.9,
    popular: true
  },
  // Adventure destinations
  {
    id: 17,
    name: "Queenstown, New Zealand",
    description: "Adventure capital with bungee jumping, skydiving, and hiking amidst stunning landscapes.",
    image: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?q=80&w=2937&auto=format&fit=crop",
    type: "adventure",
    rating: 4.8,
    popular: true
  },
  {
    id: 18,
    name: "Costa Rica",
    description: "Zip-lining through rainforests, surfing, and wildlife encounters in this eco-friendly paradise.",
    image: "https://images.unsplash.com/photo-1518183214770-9cffbec72538?q=80&w=2787&auto=format&fit=crop",
    type: "adventure",
    rating: 4.7,
    popular: true
  },
  {
    id: 19,
    name: "Moab, Utah, USA",
    description: "Red rock landscapes perfect for mountain biking, rock climbing, and off-road adventures.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2921&auto=format&fit=crop",
    type: "adventure",
    rating: 4.6,
    popular: false
  },
  {
    id: 20,
    name: "Cape Town, South Africa",
    description: "Hiking, diving with sharks, and paragliding with incredible mountain and ocean views.",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2942&auto=format&fit=crop",
    type: "adventure",
    rating: 4.7,
    popular: true
  },
  // Wildlife destinations
  {
    id: 21,
    name: "Serengeti, Tanzania",
    description: "Witness the great migration and spot the Big Five in this iconic African safari destination.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2940&auto=format&fit=crop",
    type: "wildlife",
    rating: 4.9,
    popular: true
  },
  {
    id: 22,
    name: "Galapagos Islands, Ecuador",
    description: "Unique wildlife encounters with species found nowhere else on Earth.",
    image: "https://images.unsplash.com/photo-1548385838-b65b3900b65a?q=80&w=2940&auto=format&fit=crop",
    type: "wildlife",
    rating: 4.8,
    popular: true
  },
  // Island destinations
  {
    id: 23,
    name: "Seychelles",
    description: "Pristine beaches, crystal-clear waters, and unique granite rock formations.",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2940&auto=format&fit=crop",
    type: "island",
    rating: 4.9,
    popular: true
  },
  {
    id: 24,
    name: "Fiji",
    description: "Paradise islands with white-sand beaches, coral reefs, and friendly locals.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2940&auto=format&fit=crop",
    type: "island",
    rating: 4.8,
    popular: true
  },
  // Winter destinations
  {
    id: 25,
    name: "Hokkaido, Japan",
    description: "World-class powder snow, hot springs, and winter festivals.",
    image: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?q=80&w=2940&auto=format&fit=crop",
    type: "winter",
    rating: 4.8,
    popular: true
  },
  {
    id: 26,
    name: "Banff, Canada",
    description: "Stunning winter wonderland with skiing, ice skating, and northern lights viewing.",
    image: "https://images.unsplash.com/photo-1609924211018-5526c55bad5b?q=80&w=2940&auto=format&fit=crop",
    type: "winter",
    rating: 4.7,
    popular: true
  },
  // Wellness destinations
  {
    id: 27,
    name: "Ubud, Bali",
    description: "Spiritual healing, yoga retreats, and traditional spa treatments in lush surroundings.",
    image: "https://images.unsplash.com/photo-1592364395653-83e648b20cc2?q=80&w=2940&auto=format&fit=crop",
    type: "wellness",
    rating: 4.8,
    popular: true
  },
  {
    id: 28,
    name: "Sedona, Arizona",
    description: "Energy vortexes, meditation retreats, and red rock hiking trails for spiritual wellness.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2940&auto=format&fit=crop",
    type: "wellness",
    rating: 4.7,
    popular: false
  }
];

const DestinationCard = ({ destination }: { destination: any }) => {
  const navigate = useNavigate();
  
  const handleExplore = () => {
    navigate('/preferences', { 
      state: { 
        preference: destination.type,
        destination: destination.id
      } 
    });
  };
  
  return (
    <Card className="overflow-hidden h-full flex flex-col group shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80';
          }}
        />
        {destination.popular && (
          <div className="absolute top-2 right-2 bg-travel-600 text-white text-xs font-bold px-2 py-1 rounded">
            Popular
          </div>
        )}
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg">{destination.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-sm font-medium">{destination.rating}</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="capitalize">{destination.type}</span>
        </div>
        <p className="text-gray-600 mb-4 text-sm flex-grow">
          {destination.description}
        </p>
        <Button 
          onClick={handleExplore}
          className="mt-auto w-full bg-travel-600 hover:bg-travel-700"
        >
          Plan Trip
        </Button>
      </div>
    </Card>
  );
};

const Destinations = () => {
  const [filter, setFilter] = useState<string>("all");
  
  const filteredDestinations = filter === "all" 
    ? mockDestinations 
    : mockDestinations.filter(dest => dest.type === filter);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold mb-3">Explore Destinations</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover amazing places around the world and create personalized travel itineraries.
              </p>
            </div>
            
            <div className="mb-8 flex justify-center">
              <Tabs defaultValue="all" onValueChange={setFilter}>
                <TabsList className="bg-white shadow-sm">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="beach">Beach</TabsTrigger>
                  <TabsTrigger value="mountain">Mountain</TabsTrigger>
                  <TabsTrigger value="food">Food</TabsTrigger>
                  <TabsTrigger value="cultural">Cultural</TabsTrigger>
                  <TabsTrigger value="adventure">Adventure</TabsTrigger>
                  <TabsTrigger value="wildlife">Wildlife</TabsTrigger>
                  <TabsTrigger value="island">Island</TabsTrigger>
                  <TabsTrigger value="winter">Winter</TabsTrigger>
                  <TabsTrigger value="wellness">Wellness</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map(destination => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Destinations;
