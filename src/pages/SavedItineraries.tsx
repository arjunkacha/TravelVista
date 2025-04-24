
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Edit, Trash2, ChevronRight } from 'lucide-react';

// Mock data for saved itineraries
const mockItineraries = [
  {
    id: 1,
    destination: "Bali, Indonesia",
    startDate: new Date(2023, 6, 15),
    endDate: new Date(2023, 6, 22),
    type: "beach",
    days: 7,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938&auto=format&fit=crop"
  },
  {
    id: 2,
    destination: "Swiss Alps",
    startDate: new Date(2023, 11, 5),
    endDate: new Date(2023, 11, 12),
    type: "mountain",
    days: 7,
    image: "https://images.unsplash.com/photo-1531400158697-4f300bbac466?q=80&w=2960&auto=format&fit=crop"
  },
  {
    id: 3,
    destination: "Tokyo, Japan",
    startDate: new Date(2024, 3, 10),
    endDate: new Date(2024, 3, 18),
    type: "food",
    days: 8,
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2940&auto=format&fit=crop"
  }
];

const SavedItineraries = () => {
  const navigate = useNavigate();
  
  const handleViewItinerary = (id: number) => {
    const itinerary = mockItineraries.find(i => i.id === id);
    navigate('/itinerary', { 
      state: { 
        destination: itinerary?.destination,
        startDate: itinerary?.startDate,
        endDate: itinerary?.endDate,
        preference: itinerary?.type,
        budget: 500, // Default value
      } 
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">My Saved Itineraries</h1>
                <p className="text-gray-600">
                  View and manage your saved travel plans.
                </p>
              </div>
              <Button 
                onClick={() => navigate('/preferences')}
                className="bg-travel-600 hover:bg-travel-700"
              >
                Create New Itinerary
              </Button>
            </div>
            
            {mockItineraries.length === 0 ? (
              <Card className="text-center py-16">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-2">No saved itineraries yet</h3>
                  <p className="text-gray-600 mb-6">
                    Start creating your personalized travel plans today.
                  </p>
                  <Button 
                    onClick={() => navigate('/preferences')}
                    className="bg-travel-600 hover:bg-travel-700"
                  >
                    Create Your First Itinerary
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {mockItineraries.map(itinerary => (
                  <Card key={itinerary.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/4 h-48 md:h-auto relative">
                        <img 
                          src={itinerary.image} 
                          alt={itinerary.destination}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{itinerary.destination}</h3>
                          <div className="flex flex-wrap gap-4 mb-4">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>
                                {new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>{itinerary.days} days</span>
                            </div>
                          </div>
                          <div className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-4">
                            {itinerary.type.charAt(0).toUpperCase() + itinerary.type.slice(1)} vacation
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button 
                            onClick={() => handleViewItinerary(itinerary.id)}
                            className="bg-travel-600 hover:bg-travel-700"
                          >
                            View Itinerary
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SavedItineraries;
