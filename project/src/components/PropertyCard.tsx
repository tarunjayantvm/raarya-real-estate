import React, { useState } from 'react';
import { MapPin, Bed, Bath, Square, Heart, Share2, Phone, Eye } from 'lucide-react';

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  area: string;
  image: string;
  isForSale: boolean;
  viewMode?: 'grid' | 'list';
  description?: string; // Added description prop
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  location,
  price,
  type,
  bedrooms,
  bathrooms,
  area,
  image,
  isForSale,
  viewMode = 'grid',
  description, // Destructure description prop
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleViewProperty = () => {
    window.location.href = `/property/${id}`;
  };

  const handleContact = () => {
    window.location.href = `/contact?property=${id}`;
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this property: ${title}`,
        url: window.location.href
      });
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-dark-light rounded-2xl shadow-premium flex flex-row w-full overflow-hidden border border-gold/10">
        {/* Image section */}
        <div className="relative min-w-[220px] max-w-[320px] w-1/3 aspect-[4/3] flex-shrink-0 overflow-hidden">
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          {/* Overlay and badges */}
          <div className="absolute top-3 left-3 bg-gold/90 text-dark text-xs font-bold px-3 py-1 rounded shadow">{isForSale ? 'For Sale' : 'For Rent'}</div>
          <div className="absolute bottom-3 left-3 bg-black/70 text-gold text-xs px-2 py-1 rounded">{Math.floor(Math.random() * 10) + 6}+ Photos</div>
        </div>
        {/* Details section */}
        <div className="flex-1 flex flex-col justify-between p-6 gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-gold text-xl font-bold line-clamp-1 mr-2">{title}</h3>
              {isForSale && <span className="ml-2 bg-gold text-dark text-xs px-2 py-1 rounded-full font-semibold">Premium Member</span>}
            </div>
            <div className="text-gold/80 text-sm mb-1 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
            <div className="flex flex-wrap gap-6 text-gold/80 text-xs mb-2">
              {bedrooms !== undefined && <span><b>{bedrooms} BHK</b></span>}
              {bathrooms !== undefined && <span><b>BATHROOM</b> {bathrooms}</span>}
              <span><b>SUPER AREA</b> {area}</span>
            </div>
            <div className="text-white/80 text-xs mb-2 line-clamp-2">{description || ''}</div>
          </div>
        </div>
        {/* Price and actions section */}
        <div className="flex flex-col justify-between items-end bg-dark/80 p-6 min-w-[180px] max-w-[220px] w-1/4">
          <div className="text-gold text-2xl font-bold mb-2">{price}</div>
          <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg mb-2 hover:bg-red-700 transition">Contact Owner</button>
          <button className="bg-white text-red-600 font-bold py-2 px-4 rounded-lg border border-red-600 hover:bg-red-50 transition">Check Availability</button>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-card rounded-xl overflow-hidden shadow-premium hover:shadow-premium-lg group cursor-pointer bg-dark-light flex flex-col w-full max-w-xs aspect-square mx-auto">
      {/* Property Image */}
      <div className="relative w-full aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {/* Overlay with animations */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        {/* Status Badge */}
        <div className="absolute top-4 left-4 animate-fade-in-left">
          <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm transition-all duration-300 ${
            isForSale 
              ? 'bg-gold/90 text-dark shadow-lg' 
              : 'bg-green-500/90 text-white shadow-lg'
          }`}>
            {isForSale ? 'For Sale' : 'For Rent'}
          </span>
        </div>
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-fade-in-right">
          <button 
            onClick={handleLike}
            className={`backdrop-blur-sm p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
              isLiked 
                ? 'bg-red-500/90 text-white' 
                : 'bg-black/50 text-white hover:bg-gold hover:text-dark'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={handleShare}
            className="backdrop-blur-sm bg-black/50 text-white p-2 rounded-full hover:bg-gold hover:text-dark transition-all duration-300 transform hover:scale-110"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        {/* View Count */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Eye className="w-3 h-3" />
          <span>{Math.floor(Math.random() * 100) + 50}</span>
        </div>
      </div>
      {/* Property Details */}
      <div className="flex-1 flex flex-col justify-between p-4">
        <div>
          <h3 className="text-gold text-lg font-bold mb-1 line-clamp-2 group-hover:text-gold-light transition-colors duration-300">
            {title}
          </h3>
          <div className="flex items-center text-white text-xs mb-2 group-hover:text-gold-light transition-colors duration-300">
            <MapPin className="w-4 h-4 mr-1 animate-pulse-slow" />
            <span>{location}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-gold-light text-lg font-bold animate-pulse-slow">{price}</div>
            <div className="text-white text-xs bg-dark-light px-2 py-1 rounded-full border border-gold/20">
              {type}
            </div>
          </div>
          <div className="flex items-center justify-between text-white text-xs mb-2">
            {bedrooms && (
              <div className="flex items-center group/feature">
                <Bed className="w-4 h-4 mr-1 group-hover/feature:text-gold transition-colors duration-300" />
                <span>{bedrooms} Bed</span>
              </div>
            )}
            {bathrooms && (
              <div className="flex items-center group/feature">
                <Bath className="w-4 h-4 mr-1 group-hover/feature:text-gold transition-colors duration-300" />
                <span>{bathrooms} Bath</span>
              </div>
            )}
            <div className="flex items-center group/feature">
              <Square className="w-4 h-4 mr-1 group-hover/feature:text-gold transition-colors duration-300" />
              <span>{area}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={handleViewProperty}
            className="flex-1 premium-button text-dark font-bold py-2 px-2 rounded-lg text-xs"
          >
            View Details
          </button>
          <button
            onClick={handleContact}
            className="bg-dark-light text-gold border border-gold font-bold py-2 px-2 rounded-lg hover:bg-gold hover:text-dark transition-all duration-300 flex items-center transform hover:scale-105 text-xs"
          >
            <Phone className="w-4 h-4 mr-1" />
            Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;