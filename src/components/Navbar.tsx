import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MapPin, Menu, X, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null;

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <MapPin className="h-6 w-6 text-travel-600" />
          <span className="font-bold text-xl text-travel-800">TravelVista</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-travel-800 hover:text-travel-600 font-medium">
            Home
          </Link>
          <Link to="/destinations" className="text-travel-800 hover:text-travel-600 font-medium">
            Destinations
          </Link>
          <Link to="/itineraries" className="text-travel-800 hover:text-travel-600 font-medium">
            My Itineraries
          </Link>
          {isAuthenticated ? (
            <>
              <span className="text-gray-600">
                {user?.email}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate('/signin')}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                className="bg-travel-600 hover:bg-travel-700 text-white"
              >
                Sign Up
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-travel-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <nav className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-travel-800 hover:text-travel-600 py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/destinations" 
              className="text-travel-800 hover:text-travel-600 py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Destinations
            </Link>
            <Link 
              to="/itineraries" 
              className="text-travel-800 hover:text-travel-600 py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              My Itineraries
            </Link>
            {isAuthenticated ? (
              <>
                <span className="text-gray-600">
                  {user?.email}
                </span>
                <Button variant="default" className="bg-travel-600 hover:bg-travel-700 w-full" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="default" className="bg-travel-600 hover:bg-travel-700 w-full" onClick={() => navigate('/signin')}>
                  Sign In
                </Button>
                <Button variant="default" className="bg-travel-600 hover:bg-travel-700 w-full" onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
