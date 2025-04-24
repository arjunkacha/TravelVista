import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Calendar as CalendarIcon, MapPin, ArrowRight } from 'lucide-react';
import { format } from "date-fns";

// Mock data
const destinations = [
  // Beach destinations
  { id: 1, name: "Bali, Indonesia", type: "beach" },
  { id: 2, name: "Santorini, Greece", type: "beach" },
  { id: 3, name: "Maldives", type: "beach" },
  { id: 4, name: "Cancun, Mexico", type: "beach" },
  // Mountain destinations
  { id: 5, name: "Swiss Alps", type: "mountain" },
  { id: 6, name: "Rocky Mountains, USA", type: "mountain" },
  { id: 7, name: "Himalayas, Nepal", type: "mountain" },
  { id: 8, name: "Patagonia, Chile", type: "mountain" },
  // Food destinations
  { id: 9, name: "Tokyo, Japan", type: "food" },
  { id: 10, name: "Lyon, France", type: "food" },
  { id: 11, name: "Bangkok, Thailand", type: "food" },
  { id: 12, name: "Barcelona, Spain", type: "food" },
  // Cultural destinations
  { id: 13, name: "Kyoto, Japan", type: "cultural" },
  { id: 14, name: "Rome, Italy", type: "cultural" },
  { id: 15, name: "Petra, Jordan", type: "cultural" },
  { id: 16, name: "Marrakech, Morocco", type: "cultural" },
  // Adventure destinations
  { id: 17, name: "Queenstown, NZ", type: "adventure" },
  { id: 18, name: "Costa Rica", type: "adventure" },
  { id: 19, name: "Moab, Utah", type: "adventure" },
  { id: 20, name: "Cape Town, SA", type: "adventure" },
  // Wildlife destinations
  { id: 21, name: "Serengeti, Tanzania", type: "wildlife" },
  { id: 22, name: "Galapagos Islands", type: "wildlife" },
  { id: 23, name: "Borneo, Malaysia", type: "wildlife" },
  { id: 24, name: "Kruger Park, SA", type: "wildlife" },
  // Island destinations
  { id: 25, name: "Seychelles", type: "island" },
  { id: 26, name: "Fiji", type: "island" },
  { id: 27, name: "Mauritius", type: "island" },
  { id: 28, name: "Hawaii, USA", type: "island" },
  // Winter destinations
  { id: 29, name: "Hokkaido, Japan", type: "winter" },
  { id: 30, name: "Banff, Canada", type: "winter" },
  { id: 31, name: "Aspen, USA", type: "winter" },
  { id: 32, name: "Zermatt, Switzerland", type: "winter" }
];

const Preferences = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialPreference = location.state?.preference || "beach";
  
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 7))
  );
  const [preference, setPreference] = useState(initialPreference);
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);
  const [budget, setBudget] = useState([500]);
  
  const filteredDestinations = destinations.filter(dest => dest.type === preference);
  
  const handleGenerateItinerary = () => {
    if (!selectedDestination) {
      alert("Please select a destination");
      return;
    }
    
    const destination = destinations.find(d => d.id === selectedDestination);
    
    navigate('/itinerary', { 
      state: { 
        destination: destination?.name,
        startDate,
        endDate,
        budget: budget[0],
        preference
      } 
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow py-12 px-4 flex flex-col items-center justify-center">
        <div className="container w-full max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="h-px w-8 bg-gray-300"></div>
              <span className="text-gray-500 uppercase tracking-wider text-sm font-medium">Customize Your Trip</span>
              <div className="h-px w-8 bg-gray-300"></div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Plan Your Perfect Trip</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tell us your preferences and we'll create a personalized itinerary just for you.
            </p>
          </div>
            
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl font-semibold mb-6 text-gray-900">When are you traveling?</h2>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-1/2">
                      <label className="block text-sm font-medium mb-2 text-gray-700">Start Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal h-12 border-gray-200"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                            {startDate ? format(startDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label className="block text-sm font-medium mb-2 text-gray-700">End Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal h-12 border-gray-200"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                            {endDate ? format(endDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                  
                <div>
                  <h2 className="text-2xl font-semibold mb-6 text-gray-900">What type of vacation do you prefer?</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {["beach", "mountain", "food", "cultural", "adventure", "wildlife", "island", "winter"].map((type) => (
                      <Button 
                        key={type}
                        variant={preference === type ? 'default' : 'outline'}
                        className={`h-12 capitalize ${
                          preference === type 
                            ? 'bg-travel-600 hover:bg-travel-700 text-white' 
                            : 'hover:border-travel-600 hover:text-travel-600'
                        }`}
                        onClick={() => setPreference(type)}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
                  
                <div>
                  <h2 className="text-2xl font-semibold mb-6 text-gray-900">Choose a destination</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredDestinations.map((destination) => (
                      <Button
                        key={destination.id}
                        variant={selectedDestination === destination.id ? 'default' : 'outline'}
                        className={`h-auto py-4 ${
                          selectedDestination === destination.id 
                            ? 'bg-travel-600 hover:bg-travel-700 text-white' 
                            : 'hover:border-travel-600 hover:text-travel-600'
                        }`}
                        onClick={() => setSelectedDestination(destination.id)}
                      >
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{destination.name}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
                  
                <div>
                  <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                    What's your daily budget? (USD)
                  </h2>
                  <div className="px-4 py-2">
                    <Slider
                      defaultValue={[500]}
                      max={1000}
                      min={100}
                      step={50}
                      value={budget}
                      onValueChange={setBudget}
                      className="my-6"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-gray-500">$100</span>
                      <span className="font-medium text-travel-600">${budget[0]} per day</span>
                      <span className="text-sm text-gray-500">$1000</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
            
          <div className="flex justify-center mt-12 w-full">
            <Button 
              onClick={handleGenerateItinerary} 
              size="lg"
              className="group bg-travel-600 hover:bg-travel-700 text-white px-10 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center mx-auto"
            >
              Generate My Itinerary
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Preferences;
