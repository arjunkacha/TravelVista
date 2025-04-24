import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-travel-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-6 w-6 text-travel-300" />
              <span className="font-bold text-xl text-white">TravelVista</span>
            </div>
            <p className="text-travel-100 mb-4">
              Personalized travel itineraries tailored to your preferences and interests.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-travel-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-travel-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-travel-300 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-travel-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/destinations" className="text-travel-300 hover:text-white">Popular Destinations</Link>
              </li>
              <li>
                <Link to="/itineraries" className="text-travel-300 hover:text-white">My Itineraries</Link>
              </li>
              <li>
                <Link to="/about" className="text-travel-300 hover:text-white">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Travel Types */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Travel Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/beach" className="text-travel-300 hover:text-white">Beach Getaways</Link>
              </li>
              <li>
                <Link to="/mountain" className="text-travel-300 hover:text-white">Mountain Adventures</Link>
              </li>
              <li>
                <Link to="/food" className="text-travel-300 hover:text-white">Culinary Journeys</Link>
              </li>
              <li>
                <Link to="/city" className="text-travel-300 hover:text-white">City Explorations</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-travel-300" />
                <span className="text-travel-100">123 Travel Lane, Adventure City</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-travel-300" />
                <a href="mailto:info@travelvista.com" className="text-travel-100 hover:text-white">
                  info@travelvista.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-travel-300" />
                <a href="tel:+11234567890" className="text-travel-100 hover:text-white">
                  +1 (123) 456-7890
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-travel-700 mt-8 pt-6 text-center text-travel-300 text-sm">
          <p>&copy; {new Date().getFullYear()} TravelVista. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
