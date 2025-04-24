import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, DollarSign, ArrowLeft, Share2, Download, Printer } from 'lucide-react';
import { format, addDays, differenceInDays } from "date-fns";

interface Activity {
  time: string;
  name: string;
  description: string;
  cost: number;
  location: string;
}

interface DayItinerary {
  date: Date;
  activities: Activity[];
  totalCost: number;
}

// Mock data generator for itineraries based on preferences
const generateItinerary = (destination: string, startDate: Date, endDate: Date, budget: number, preference: string): DayItinerary[] => {
  const days = differenceInDays(new Date(endDate), new Date(startDate)) + 1;
  const dailyActivities: DayItinerary[] = [];

  // Expanded activities for each preference type
  const activities: Record<string, Activity[]> = {
    beach: [
      { time: "09:00 AM", name: "Beach Yoga Session", description: "Start your day with a relaxing yoga session by the ocean", cost: 25, location: "Sunrise Beach" },
      { time: "11:30 AM", name: "Snorkeling Adventure", description: "Explore vibrant coral reefs and marine life", cost: 45, location: "Coral Bay" },
      { time: "02:00 PM", name: "Surfing Lessons", description: "Learn to catch waves with professional instructors", cost: 60, location: "Surfer's Point" },
      { time: "09:00 AM", name: "Island Hopping Tour", description: "Full-day exploration of nearby islands", cost: 85, location: "Marina" },
      { time: "11:30 AM", name: "Jet Ski Adventure", description: "Exciting water sports experience", cost: 70, location: "Water Sports Center" },
      { time: "02:00 PM", name: "Beach Volleyball Tournament", description: "Join a fun beach volleyball session", cost: 15, location: "Main Beach" },
      { time: "09:00 AM", name: "Coastal Photography", description: "Capture stunning beach landscapes", cost: 40, location: "Scenic Coast" },
      { time: "11:30 AM", name: "Marine Life Tour", description: "Learn about local marine ecosystems", cost: 55, location: "Marine Center" },
      { time: "02:00 PM", name: "Sunset Sailing", description: "Relaxing afternoon sail with refreshments", cost: 75, location: "Yacht Club" }
    ],
    mountain: [
      { time: "09:00 AM", name: "Guided Nature Hike", description: "Explore scenic mountain trails with an expert guide", cost: 40, location: "Mountain Trail" },
      { time: "11:30 AM", name: "Rock Climbing", description: "Guided climbing session for all levels", cost: 65, location: "Climbing Center" },
      { time: "02:00 PM", name: "Mountain Biking", description: "Explore scenic trails on two wheels", cost: 55, location: "Bike Trail" },
      { time: "09:00 AM", name: "Alpine Photography Tour", description: "Capture stunning mountain landscapes", cost: 50, location: "Scenic Point" },
      { time: "11:30 AM", name: "Wildlife Watching", description: "Spot local wildlife with expert guides", cost: 45, location: "Nature Reserve" },
      { time: "02:00 PM", name: "Zip Line Adventure", description: "Soar through mountain valleys", cost: 75, location: "Adventure Park" },
      { time: "09:00 AM", name: "Mountain Yoga", description: "Morning yoga with mountain views", cost: 35, location: "Mountain Lodge" },
      { time: "11:30 AM", name: "Cave Exploration", description: "Discover underground mountain caves", cost: 60, location: "Cave System" },
      { time: "02:00 PM", name: "Hot Springs Visit", description: "Relax in natural thermal springs", cost: 40, location: "Thermal Springs" }
    ],
    food: [
      { time: "09:00 AM", name: "Local Market Tour", description: "Explore fresh ingredients and local specialties", cost: 35, location: "Central Market" },
      { time: "11:30 AM", name: "Cooking Class", description: "Learn to make traditional dishes", cost: 75, location: "Culinary School" },
      { time: "02:00 PM", name: "Wine Tasting", description: "Sample regional wines with expert sommelier", cost: 60, location: "Local Vineyard" },
      { time: "09:00 AM", name: "Bakery Workshop", description: "Learn traditional baking techniques", cost: 65, location: "Artisan Bakery" },
      { time: "11:30 AM", name: "Street Food Tour", description: "Taste authentic street cuisine", cost: 45, location: "Old Town" },
      { time: "02:00 PM", name: "Cheese Making", description: "Traditional cheese making workshop", cost: 55, location: "Dairy Farm" },
      { time: "09:00 AM", name: "Coffee Roasting", description: "Learn about coffee production", cost: 40, location: "Coffee Roastery" },
      { time: "11:30 AM", name: "Chocolate Making", description: "Create artisanal chocolates", cost: 70, location: "Chocolate Studio" },
      { time: "02:00 PM", name: "Craft Beer Tour", description: "Visit local breweries", cost: 50, location: "Brewery District" }
    ],
    cultural: [
      { time: "09:00 AM", name: "Historical Walking Tour", description: "Explore ancient streets and monuments", cost: 30, location: "Old City" },
      { time: "11:30 AM", name: "Museum Visit", description: "Discover local art and history", cost: 25, location: "National Museum" },
      { time: "02:00 PM", name: "Traditional Craft Workshop", description: "Learn local artisan skills", cost: 50, location: "Craft Center" },
      { time: "09:00 AM", name: "Temple Tour", description: "Visit sacred religious sites", cost: 35, location: "Temple Complex" },
      { time: "11:30 AM", name: "Language Workshop", description: "Basic local language lesson", cost: 40, location: "Language School" },
      { time: "02:00 PM", name: "Traditional Dance Class", description: "Learn local dance moves", cost: 45, location: "Dance Studio" },
      { time: "09:00 AM", name: "Architecture Tour", description: "Explore historical buildings", cost: 35, location: "Heritage District" },
      { time: "11:30 AM", name: "Traditional Tea Ceremony", description: "Experience local tea culture", cost: 30, location: "Tea House" },
      { time: "02:00 PM", name: "Artisan Workshop", description: "Create traditional crafts", cost: 55, location: "Cultural Center" }
    ]
  };

  const preferredActivities = activities[preference] || activities.beach;
  const totalActivities = preferredActivities.length;
  
  for (let i = 0; i < days; i++) {
    const currentDate = addDays(new Date(startDate), i);
    const dayBudget = budget;
    let remainingBudget = dayBudget;
    const dayActivities: Activity[] = [];

    // Select 3 different activities for each day with fixed time slots
    const dayOffset = i * 3 % totalActivities;
    const timeSlots = ["09:00 AM", "11:30 AM", "02:00 PM"];
    
    for (let j = 0; j < 3; j++) {
      const activityIndex = (dayOffset + j) % totalActivities;
      const activity = preferredActivities[activityIndex];
      
      if (remainingBudget >= activity.cost) {
        dayActivities.push({
          time: timeSlots[j],
          name: activity.name,
          description: activity.description,
          cost: activity.cost,
          location: activity.location
        });
        remainingBudget -= activity.cost;
      }
    }

    // Sort activities by time
    dayActivities.sort((a, b) => {
      const timeA = new Date(`1970/01/01 ${a.time}`);
      const timeB = new Date(`1970/01/01 ${b.time}`);
      return timeA.getTime() - timeB.getTime();
    });

    dailyActivities.push({
      date: currentDate,
      activities: dayActivities,
      totalCost: dayBudget - remainingBudget
    });
  }

  return dailyActivities;
};

const ItineraryDay: React.FC<{ day: DayItinerary; dayNumber: number }> = ({ day, dayNumber }) => {
  return (
    <Card className="mb-6 shadow-md border-0 bg-white/70 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">Day {dayNumber}</h3>
            <p className="text-gray-600">{format(day.date, "EEEE, MMMM d, yyyy")}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Daily Budget</p>
            <p className="text-xl font-semibold text-travel-600">${day.totalCost}</p>
          </div>
        </div>
        
        <div className="space-y-6">
          {day.activities.map((activity, index) => (
            <div key={index} className="border-l-2 border-travel-200 pl-4 py-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{activity.time}</p>
                  <h4 className="text-lg font-medium text-gray-900 mt-1">{activity.name}</h4>
                  <p className="text-gray-600 mt-1">{activity.description}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {activity.location}
                  </div>
                </div>
                <div className="text-travel-600 font-medium">
                  ${activity.cost}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Itinerary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState<DayItinerary[]>([]);
  
  useEffect(() => {
    if (!location.state) {
      navigate('/preferences');
      return;
    }
    
    const { destination, startDate, endDate, budget, preference } = location.state;
    const generatedItinerary = generateItinerary(
      destination,
      new Date(startDate),
      new Date(endDate),
      budget,
      preference
    );
    setItinerary(generatedItinerary);
  }, [location.state, navigate]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `TravelVista Itinerary - ${location.state.destination}`,
          text: `Check out my travel itinerary for ${location.state.destination}!`,
          url: window.location.href
        });
      } else {
        // Fallback to copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDownload = () => {
    const content = JSON.stringify({
      destination: location.state.destination,
      dates: `${format(new Date(location.state.startDate), "MMM d")} - ${format(new Date(location.state.endDate), "MMM d, yyyy")}`,
      budget: location.state.budget,
      itinerary
    }, null, 2);

    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `travelvista-itinerary-${location.state.destination.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };
  
  if (!location.state) {
    return null;
  }
  
  const { destination, startDate, endDate, budget } = location.state;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-8 no-print">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Preferences
            </Button>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="text-gray-600" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" className="text-gray-600" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" className="text-gray-600" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <MapPin className="h-8 w-8 text-travel-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="text-lg font-semibold text-gray-900">{destination}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Calendar className="h-8 w-8 text-travel-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Travel Dates</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {format(new Date(startDate), "MMM d")} - {format(new Date(endDate), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <DollarSign className="h-8 w-8 text-travel-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Daily Budget</p>
                  <p className="text-lg font-semibold text-gray-900">${budget} USD</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs for screen display */}
          <div className="screen-only no-print">
            <Tabs defaultValue="day1" className="w-full">
              <TabsList className="mb-6 bg-white/70 backdrop-blur-sm p-1 rounded-lg">
                {itinerary.map((_, index) => (
                  <TabsTrigger
                    key={index}
                    value={`day${index + 1}`}
                    className="px-6 py-2 data-[state=active]:bg-travel-600 data-[state=active]:text-white"
                  >
                    Day {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {itinerary.map((day, index) => (
                <TabsContent key={index} value={`day${index + 1}`}>
                  <ItineraryDay day={day} dayNumber={index + 1} />
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Print-only view showing all days */}
          <div className="print-only hidden">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Your Travel Itinerary</h1>
              <p className="text-xl mt-2">For {destination}</p>
            </div>
            {itinerary.map((day, index) => (
              <div key={index} className={index > 0 ? 'page-break' : ''}>
                <ItineraryDay day={day} dayNumber={index + 1} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Itinerary;
