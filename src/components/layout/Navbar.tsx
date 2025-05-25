import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, UserCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled || isOpen ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-green-600 font-bold text-xl md:text-2xl">স্বাস্থ্যসেবা ক্লিনিক</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-800 hover:text-green-600 px-3 py-2 text-sm font-medium">
              হোম
            </Link>
            <Link to="/patient-portal" className="text-gray-800 hover:text-green-600 px-3 py-2 text-sm font-medium">
              রোগী পোর্টাল
            </Link>
            <Link to="/doctor-panel" className="text-gray-800 hover:text-green-600 px-3 py-2 text-sm font-medium">
              ডাক্তার প্যানেল
            </Link>
            <Link to="/pharmacy-lab" className="text-gray-800 hover:text-green-600 px-3 py-2 text-sm font-medium">
              ফার্মেসি ও ল্যাব
            </Link>
            <Link to="/appointment" className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              অ্যাপয়েন্টমেন্ট বুক করুন
            </Link>
          </div>
          
          <div className="hidden md:flex items-center">
            <Link to="/login" className="text-gray-800 hover:text-green-600 px-3 py-2 text-sm font-medium flex items-center">
              <UserCircle className="mr-1 h-5 w-5" />
              লগইন
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-green-600">
            হোম
          </Link>
          <Link to="/patient-portal" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-green-600">
            রোগী পোর্টাল
          </Link>
          <Link to="/doctor-panel" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-green-600">
            ডাক্তার প্যানেল
          </Link>
          <Link to="/pharmacy-lab" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-green-600">
            ফার্মেসি ও ল্যাব
          </Link>
          <Link to="/appointment" className="block px-3 py-2 rounded-md text-base font-medium bg-green-600 text-white hover:bg-green-700">
            অ্যাপয়েন্টমেন্ট বুক করুন
          </Link>
          <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-green-600 flex items-center">
            <UserCircle className="mr-1 h-5 w-5" />
            লগইন
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;