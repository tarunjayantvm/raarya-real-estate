import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Buy');
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const locations = [
    'Peelamedu', 'RS Puram', 'Saravanampatti', 'Ganapathy', 'Singanallur',
    'Avinashi Road', 'Sai Baba Colony', 'Thudiyalur', 'Vadavalli', 'Kuniyamuthur'
  ];

  const stats = [
    { number: '500+', label: 'Properties Listed', icon: TrendingUp },
    { number: '200+', label: 'Happy Clients', icon: TrendingUp },
    { number: '10+', label: 'Years Experience', icon: TrendingUp },
    { number: '15+', label: 'Top Locations', icon: TrendingUp }
  ];

  return (
    <section className="relative bg-transparent min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/5 rounded-full animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold/3 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gold/10 rounded-full animate-pulse-slow"></div>
      </div>

      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(24, 22, 17, 0.7), rgba(24, 22, 17, 0.8)), url("https://raarya.com/wp-content/uploads/2024/06/premium-house-property-coimbatore-1.jpg")'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className={`text-4xl md:text-6xl font-black text-gold mb-6 leading-tight transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}>
            Find Your Dream Property in <span className="text-white gold-shimmer">Coimbatore</span>
          </h1>
          <p className={`text-lg md:text-xl text-white mb-12 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}>
            Explore premium properties with Raarya - The trusted name in real estate since 2015
          </p>
          
          {/* Buy/Rent/Projects Tabs */}
          <div className="flex justify-center space-x-2 mb-4">
            {['Buy', 'Rent', 'Projects'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-t-lg font-bold text-lg focus:outline-none transition-all duration-300 border-b-4 ${
                  activeTab === tab
                    ? 'bg-gold/20 text-gold border-gold'
                    : 'bg-dark/30 text-white border-transparent hover:bg-gold/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Enhanced Search Form */}
          <div className={`backdrop-blur-premium rounded-2xl p-6 md:p-8 shadow-premium-lg max-w-4xl mx-auto border border-gold/20 transition-all duration-1000 delay-500 ${
            isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
          }`}>
            <div className={`grid gap-4 mb-6 ${activeTab === 'Projects' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
              {/* Location Selector */}
              <div className="relative group">
                <label className="block text-sm font-medium text-white mb-2 flex items-center">
                  <MapPin className="inline w-4 h-4 mr-2 text-gold" />
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent bg-dark/60 text-white backdrop-blur-sm transition-all duration-300 hover:border-gold/50"
                >
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              {/* Property Type */}
              <div className="relative group">
                <label className="block text-sm font-medium text-white mb-2 flex items-center">
                  <Filter className="inline w-4 h-4 mr-2 text-gold" />
                  Property Type
                </label>
                <select
                  value={selectedType}
                  onChange={e => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent bg-dark/60 text-white backdrop-blur-sm transition-all duration-300 hover:border-gold/50"
                >
                  <option value="">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="plot">Plot</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              {/* Budget Range (only show if not Projects) */}
              {activeTab !== 'Projects' && (
                <div className="relative group">
                  <label className="block text-sm font-medium text-white mb-2">
                    Budget Range
                  </label>
                  <select
                    value={selectedBudget}
                    onChange={e => setSelectedBudget(e.target.value)}
                    className="w-full px-4 py-3 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent bg-dark/60 text-white backdrop-blur-sm transition-all duration-300 hover:border-gold/50"
                  >
                    <option value="">Select Budget</option>
                    <option value="10-20">₹10L - ₹20L</option>
                    <option value="20-50">₹20L - ₹50L</option>
                    <option value="50-100">₹50L - ₹1Cr</option>
                    <option value="100-200">₹1Cr - ₹2Cr</option>
                    <option value="200+">₹2Cr+</option>
                  </select>
                </div>
              )}
            </div>
            {/* Enhanced Search Bar */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gold transition-all duration-300 group-focus-within:scale-110" />
              </div>
              <input
                type="text"
                placeholder="Search for properties in Coimbatore..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-32 py-4 text-lg border border-gold/30 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent bg-dark/60 text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-300"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <button
                  className="premium-button text-dark px-8 py-3 rounded-lg font-bold text-lg"
                  onClick={() => {
                    const params = new URLSearchParams();
                    if (activeTab === 'Buy' || activeTab === 'Rent') {
                      params.set('tab', activeTab);
                    } else if (activeTab === 'Projects') {
                      params.set('tab', 'Projects');
                    }
                    if (selectedLocation) params.set('location', selectedLocation);
                    if (selectedType) params.set('type', selectedType);
                    if (selectedBudget) params.set('budget', selectedBudget);
                    if (searchQuery) params.set('q', searchQuery);
                    navigate(`/all-properties?${params.toString()}`);
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;