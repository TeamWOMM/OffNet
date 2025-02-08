'useclient';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction and visibility
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Update last scroll position
      setLastScrollY(currentScrollY);
      
      // Update background transparency
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 transform ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } ${
      isScrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:py-6">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white">Hey There!😁</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button
                onMouseEnter={() => setIsProductsDropdownOpen(true)}
                onMouseLeave={() => setIsProductsDropdownOpen(false)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                AI Models
              </button>
              {isProductsDropdownOpen && (
                <div
                  onMouseEnter={() => setIsProductsDropdownOpen(true)}
                  onMouseLeave={() => setIsProductsDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Model 1
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Model 2
                  </a>
                </div>
              )}
            </div>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              About Us
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              Contact Us
            </a>
            <button className="p-2 text-white hover:text-gray-300 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            {/* <button
              onClick={handleDashboardAccess}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
            >
              Go to Dashboard
            </button>
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors">
              Sign In
            </button> */}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95">
              <a
                href="#"
                className="block px-3 py-2 text-white hover:text-gray-300 transition-colors"
              >
                Products
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-white hover:text-gray-300 transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-white hover:text-gray-300 transition-colors"
              >
                Contact
              </a>
              <button className="w-full text-left px-3 py-2 text-white hover:text-gray-300 transition-colors">
                Search
              </button>
              <button
                onClick={handleDashboardAccess}
                className="w-full text-left px-3 py-2 text-white hover:text-gray-300 transition-colors"
              >
                Go to Dashboard
              </button>
              <button className="w-full text-left px-3 py-2 text-white hover:text-gray-300 transition-colors">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
      <Link
      href="/dashboard"
      className="text-gray-800 hover:text-blue-600 px-4 py-2 rounded-lg transition-colors duration-300"
      >Dashboard</Link>
    </nav>
  );
};

export default Navbar;