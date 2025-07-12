import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { ChevronRight, Filter, Grid, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FeaturedProperties = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(4);
  const [properties, setProperties] = useState<any[]>([]);
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

    const element = document.getElementById('featured-properties');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/properties')
      .then(res => setProperties(res.data))
      .catch(err => console.error(err));
  }, []);

  // Filter for featured properties (isFeatured true)
  const featuredProperties = properties.filter(p => p.isFeatured);

  const filteredProperties = filter === 'all'
    ? featuredProperties
    : featuredProperties.filter(property =>
        filter === 'sale' ? property.isForSale : !property.isForSale
      );
  const visibleProperties = filteredProperties.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredProperties.length;

  return (
    <section id="featured-properties" className="py-16 bg-dark-light relative overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full animate-float"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/3 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className={`flex flex-col lg:flex-row lg:items-center justify-between mb-12 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-6 lg:mb-0">
            <h2 className="text-3xl font-bold text-gold mb-2 gold-shimmer">Featured Properties</h2>
            <p className="text-white text-lg">Discover our handpicked premium properties in Coimbatore</p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Filter Buttons */}
            <div className="flex bg-dark rounded-lg p-1 border border-gold/20">
              {[
                { key: 'all', label: 'All' },
                { key: 'sale', label: 'For Sale' },
                { key: 'rent', label: 'For Rent' }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setFilter(item.key)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    filter === item.key
                      ? 'bg-gold text-dark shadow-lg'
                      : 'text-white hover:text-gold'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-dark rounded-lg p-1 border border-gold/20">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gold text-dark'
                    : 'text-white hover:text-gold'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-gold text-dark'
                    : 'text-white hover:text-gold'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* View All Button */}
            <button
              className="hidden md:flex items-center text-gold hover:text-gold-light transition-all duration-300 font-medium group"
              onClick={() => navigate('/all-properties')}
            >
              View All Properties
              <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
        
        {/* Properties Grid */}
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'} ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-8 items-center'}`}>
          {visibleProperties.map((property, index) => (
            <div
              key={property._id || property.id}
              className={`transition-all duration-700 ${viewMode === 'list' ? 'w-full max-w-2xl mx-auto px-4' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PropertyCard
                id={property._id || property.id || ''}
                title={property.title || ''}
                location={property.location || ''}
                price={`₹${property.price?.toLocaleString?.() || property.price || ''}`}
                type={property.type || ''}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                area={`${property.area || ''} sqft`}
                image={property.images && property.images.length > 0 ? property.images[0] : property.image || ''}
                isForSale={property.type === 'buy'}
                viewMode={viewMode}
              />
            </div>
          ))}
        </div>
        
        {/* Load More Section */}
        {canLoadMore && (
          <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <button
              className="premium-button text-dark font-bold py-3 px-8 rounded-lg inline-flex items-center group"
              onClick={() => setVisibleCount(v => Math.min(v + 4, filteredProperties.length))}
            >
              Load More Properties
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;