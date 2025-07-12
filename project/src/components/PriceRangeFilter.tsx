import React, { useState, useEffect } from 'react';
import { Sliders as Slider, Search, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PriceRangeFilter = () => {
  const [minPrice, setMinPrice] = useState('10');
  const [maxPrice, setMaxPrice] = useState('200');
  const [isVisible, setIsVisible] = useState(false);
  const [propertyType, setPropertyType] = useState('All Types');
  const [bhkType, setBhkType] = useState('Any BHK');
  const [transactionType, setTransactionType] = useState('Buy/Sell');
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('price-filter');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const priceOptions = [
    { value: '10', label: '₹10 Lacs' },
    { value: '20', label: '₹20 Lacs' },
    { value: '30', label: '₹30 Lacs' },
    { value: '40', label: '₹40 Lacs' },
    { value: '50', label: '₹50 Lacs' },
    { value: '60', label: '₹60 Lacs' },
    { value: '70', label: '₹70 Lacs' },
    { value: '80', label: '₹80 Lacs' },
    { value: '90', label: '₹90 Lacs' },
    { value: '100', label: '₹1 Cr' },
    { value: '120', label: '₹1.2 Cr' },
    { value: '150', label: '₹1.5 Cr' },
    { value: '200', label: '₹2 Cr' },
    { value: '300', label: '₹3 Cr' },
    { value: '400', label: '₹4 Cr' },
    { value: '500', label: '₹5 Cr+' }
  ];

  const handleApplyFilter = () => {
    const params = new URLSearchParams();
    params.set('minPrice', minPrice);
    params.set('maxPrice', maxPrice);
    if (propertyType && propertyType !== 'All Types') params.set('type', propertyType);
    if (bhkType && bhkType !== 'Any BHK') params.set('bhk', bhkType);
    if (transactionType && transactionType !== 'Buy/Sell') params.set('transaction', transactionType);
    navigate(`/all-properties?${params.toString()}`);
  };

  return (
    <div id="price-filter" className={`premium-card text-white rounded-xl p-6 shadow-premium relative overflow-hidden transition-all duration-1000 ${
      isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
    }`}>
      {/* Background Animation */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full animate-float"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/10 rounded-full animate-pulse-slow"></div>

      <div className={`flex items-center mb-6 relative z-10 transition-all duration-700 ${
        isVisible ? 'animate-fade-in-left' : 'opacity-0 translate-x-10'
      }`}>
        <div className="bg-gold/20 p-3 rounded-full mr-3 animate-glow">
          <Slider className="w-6 h-6 text-gold" />
        </div>
        <h2 className="text-xl font-bold text-gold gold-shimmer">Price Range Filter</h2>
        <TrendingUp className="w-5 h-5 text-gold ml-auto animate-bounce-slow" />
      </div>
      
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 transition-all duration-700 delay-200 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
      }`}>
        <div className="group">
          <label className="block text-sm font-medium text-white mb-2 group-hover:text-gold transition-colors duration-300">
            Minimum Price
          </label>
          <select
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full bg-dark-light text-white border border-gold/30 rounded-lg p-3 focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 hover:border-gold/50 hover:shadow-lg"
          >
            {priceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="group">
          <label className="block text-sm font-medium text-white mb-2 group-hover:text-gold transition-colors duration-300">
            Maximum Price
          </label>
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-dark-light text-white border border-gold/30 rounded-lg p-3 focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 hover:border-gold/50 hover:shadow-lg"
          >
            {priceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Additional Filters */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 transition-all duration-700 delay-400 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
      }`}>
        <div className="group">
          <label className="block text-sm font-medium text-white mb-2 group-hover:text-gold transition-colors duration-300">
            Property Type
          </label>
          <select
            value={propertyType}
            onChange={e => setPropertyType(e.target.value)}
            className="w-full bg-dark-light text-white border border-gold/30 rounded-lg p-2 focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 hover:border-gold/50"
          >
            <option>All Types</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Plot</option>
            <option>Commercial</option>
          </select>
        </div>
        
        <div className="group">
          <label className="block text-sm font-medium text-white mb-2 group-hover:text-gold transition-colors duration-300">
            BHK Type
          </label>
          <select
            value={bhkType}
            onChange={e => setBhkType(e.target.value)}
            className="w-full bg-dark-light text-white border border-gold/30 rounded-lg p-2 focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 hover:border-gold/50"
          >
            <option>Any BHK</option>
            <option>1 BHK</option>
            <option>2 BHK</option>
            <option>3 BHK</option>
            <option>4+ BHK</option>
          </select>
        </div>
        
        <div className="group">
          <label className="block text-sm font-medium text-white mb-2 group-hover:text-gold transition-colors duration-300">
            Transaction Type
          </label>
          <select
            value={transactionType}
            onChange={e => setTransactionType(e.target.value)}
            className="w-full bg-dark-light text-white border border-gold/30 rounded-lg p-2 focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 hover:border-gold/50"
          >
            <option>Buy/Sell</option>
            <option>Rent</option>
            <option>Lease</option>
          </select>
        </div>
      </div>
      
      <button
        onClick={handleApplyFilter}
        className={`w-full premium-button text-dark font-bold py-3 rounded-lg flex items-center justify-center group transition-all duration-700 delay-600 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}
      >
        <Search className="w-5 h-5 mr-2 group-hover:animate-bounce-slow" />
        Apply Filter & Search Properties
      </button>
      
      <div className={`text-center mt-4 text-sm text-gray-300 transition-all duration-700 delay-800 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
      }`}>
        Find properties from <span className="text-gold font-medium">{priceOptions.find(p => p.value === minPrice)?.label}</span> to <span className="text-gold font-medium">{priceOptions.find(p => p.value === maxPrice)?.label}</span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;