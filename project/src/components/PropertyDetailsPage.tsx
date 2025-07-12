import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { 
  BedDouble, 
  Bath, 
  Ruler, 
  MapPin, 
  Calendar, 
  Car, 
  Wifi, 
  Shield, 
  TreePine, 
  Dumbbell, 
  ParkingCircle,
  Heart,
  Share2,
  Phone,
  Mail,
  ArrowLeft,
  Star,
  CheckCircle,
  Clock,
  Users,
  Building,
  Home,
  Car as CarIcon,
  Wifi as WifiIcon,
  Shield as ShieldIcon,
  TreePine as TreePineIcon,
  Dumbbell as DumbbellIcon,
  ParkingCircle as ParkingCircleIcon,
  Utensils,
  Coffee,
  ShoppingBag,
  Bus,
  Train,
  Plane
} from 'lucide-react';
import axios from 'axios';

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      navigate('/all-properties');
      return;
    }
    setLoading(true);
    axios.get(`http://localhost:5000/properties/${id}`)
      .then(res => {
        setProperty(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Property not found');
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) {
    return <div className="min-h-screen bg-dark text-gold flex items-center justify-center">Loading...</div>;
  }

  if (error || !property) {
    return <div className="min-h-screen bg-dark text-red-500 flex items-center justify-center">{error || 'Property not found'}</div>;
  }

  // Fallbacks for missing extended details
  const images = property.images && property.images.length > 0 ? property.images : [property.image];
  const hasDetails = property.propertyDetails !== undefined;
  const hasAmenities = property.amenities !== undefined;
  const hasNearby = property.nearbyPlaces !== undefined;
  const hasPricing = property.pricing !== undefined;
  const hasContact = property.contactInfo !== undefined;
  const hasDescription = property.detailedDescription !== undefined;

  const formatPrice = (price: number) => {
    if (property.type === 'rent') {
      return `₹${price.toLocaleString()}/month`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const formatPricePerSqft = (price: number, area: number) => {
    return `₹${Math.round(price / area).toLocaleString()}/sqft`;
  };

  return (
    <>
      <div className="min-h-screen bg-dark font-lexend">
        <Header />
        
        {/* Add margin-top for realistic spacing below header */}
        <div className="mt-12">
          {/* Hero Section with Back Button */}
          <div className="relative bg-gradient-to-br from-dark via-dark-light to-dark">
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
              <button
                onClick={() => navigate('/all-properties')}
                className="flex items-center gap-2 text-gold hover:text-gold-dark transition mb-6 group mt-6"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-semibold">Back to Properties</span>
              </button>
              
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Property Images */}
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-gold/30">
                    <img
                      src={images[selectedImage]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    {property.hotOffer && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        HOT OFFER
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className={`p-2 rounded-full border-2 transition ${
                          isWishlisted 
                            ? 'bg-gold text-dark border-gold' 
                            : 'bg-dark/80 text-gold border-gold hover:bg-gold hover:text-dark'
                        }`}
                      >
                        <Heart size={20} fill={isWishlisted ? '#1a1a1a' : 'none'} />
                      </button>
                      <button className="p-2 rounded-full bg-dark/80 text-gold border-2 border-gold hover:bg-gold hover:text-dark transition">
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Thumbnail Images */}
                  <div className="grid grid-cols-5 gap-2">
                    {images.slice(0, 5).map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                          selectedImage === index ? 'border-gold' : 'border-gold/30 hover:border-gold/60'
                        }`}
                      >
                        <img src={image} alt={`${property.title} ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                    {images.length > 5 && (
                      <button
                        onClick={() => setShowAllImages(true)}
                        className="aspect-square rounded-lg border-2 border-gold/30 hover:border-gold/60 bg-dark-light flex items-center justify-center text-gold font-bold"
                      >
                        +{images.length - 5}
                      </button>
                    )}
                  </div>
                </div>

                {/* Property Info */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 text-sm font-bold rounded-full border border-gold bg-dark-light text-gold`}>
                        {property.type.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 text-sm font-bold rounded-full border border-gold bg-dark-light text-gold`}>
                        {property.status}
                      </span>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-2 leading-tight">
                      {property.title}
                    </h1>
                    <div className="flex items-center gap-2 text-gold mb-4">
                      <MapPin size={18} />
                      <span className="text-lg">{property.location}</span>
                    </div>
                    <div className="text-4xl font-extrabold text-gold mb-2">
                      {formatPrice(property.price)}
                    </div>
                    {property.type === 'buy' && (
                      <div className="text-lg text-gold/80">
                        {formatPricePerSqft(property.price, property.area)}
                      </div>
                    )}
                  </div>

                  {/* Key Features */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-dark-light rounded-lg border border-gold/20">
                      <BedDouble size={20} className="text-gold" />
                      <div>
                        <div className="text-white font-semibold">{property.bedrooms}</div>
                        <div className="text-gold/70 text-sm">Bedrooms</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-dark-light rounded-lg border border-gold/20">
                      <Bath size={20} className="text-gold" />
                      <div>
                        <div className="text-white font-semibold">{property.bathrooms}</div>
                        <div className="text-gold/70 text-sm">Bathrooms</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-dark-light rounded-lg border border-gold/20">
                      <Ruler size={20} className="text-gold" />
                      <div>
                        <div className="text-white font-semibold">{property.area} sqft</div>
                        <div className="text-gold/70 text-sm">Area</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-dark-light rounded-lg border border-gold/20">
                      <Building size={20} className="text-gold" />
                      <div>
                        <div className="text-white font-semibold">{property.propertyDetails.propertyType}</div>
                        <div className="text-gold/70 text-sm">Type</div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex gap-4">
                    <button className="flex-1 bg-gold text-dark font-bold py-4 rounded-lg hover:bg-gold-dark transition flex items-center justify-center gap-2">
                      <Phone size={20} />
                      Call Now
                    </button>
                    <button className="flex-1 bg-dark-light text-gold font-bold py-4 rounded-lg border border-gold hover:bg-gold hover:text-dark transition flex items-center justify-center gap-2">
                      <Mail size={20} />
                      Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {hasDescription && (
                <div className="bg-dark-light rounded-2xl p-6 border border-gold/20">
                  <h2 className="text-2xl font-bold text-gold mb-4">Description</h2>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {property.detailedDescription}
                  </div>
                </div>
              )}

              {/* Property Details */}
              {hasDetails && (
                <div className="bg-dark-light rounded-2xl p-6 border border-gold/20">
                  <h2 className="text-2xl font-bold text-gold mb-4">Property Details</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(property.propertyDetails).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gold/10">
                        <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-white font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities */}
              {hasAmenities && (
                <div className="bg-dark-light rounded-2xl p-6 border border-gold/20">
                  <h2 className="text-2xl font-bold text-gold mb-4">Amenities</h2>
                  {Array.isArray(property.amenities) && property.amenities.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-3">
                      {property.amenities.map((amenity: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-dark rounded-lg border border-gold/20">
                          <CheckCircle size={18} className="text-gold" />
                          <span className="text-white">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">No amenities listed.</span>
                  )}
                </div>
              )}

              {/* Nearby Places */}
              {hasNearby && (
                <div className="bg-dark-light rounded-2xl p-6 border border-gold/20">
                  <h2 className="text-2xl font-bold text-gold mb-4">Nearby Places</h2>
                  <div className="space-y-4">
                    {Object.entries(property.nearbyPlaces).map(([category, places]) => (
                      <div key={category}>
                        <h3 className="text-lg font-semibold text-gold mb-2 capitalize">
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        {Array.isArray(places) && places.length > 0 ? (
                          <div className="grid md:grid-cols-2 gap-2">
                            {places.map((place: string, index: number) => (
                              <div key={index} className="flex items-center gap-2 text-gray-300">
                                <div className="w-2 h-2 bg-gold rounded-full"></div>
                                <span>{place}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">No nearby places listed.</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing Details */}
              {hasPricing && (
                <div className="bg-dark-light rounded-2xl p-6 border border-gold/20">
                  <h2 className="text-2xl font-bold text-gold mb-4">Pricing Details</h2>
                  <div className="space-y-3">
                    {Object.entries(property.pricing).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gold/10">
                        <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-white font-semibold">{value}</span>
                      </div>
                    ))}
                    {Array.isArray(property.pricing?.categories) && property.pricing.categories.length > 0 ? (
                      property.pricing.categories.map((category: string, idx: number) => (
                        <div key={idx}>{category}</div>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">No pricing categories listed.</span>
                    )}
                  </div>
                </div>
              )}

              {/* Contact Agent */}
              {hasContact && (
                <div className="bg-dark-light rounded-2xl p-6 border border-gold/20">
                  <h2 className="text-2xl font-bold text-gold mb-4">Contact Agent</h2>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gold rounded-full mx-auto mb-3 flex items-center justify-center">
                        <Users size={24} className="text-dark" />
                      </div>
                      <div className="text-white font-semibold text-lg">{property.contactInfo.agent}</div>
                      <div className="text-gold/70">Property Agent</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-dark rounded-lg">
                        <Phone size={18} className="text-gold" />
                        <span className="text-white">{property.contactInfo.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-dark rounded-lg">
                        <Mail size={18} className="text-gold" />
                        <span className="text-white">{property.contactInfo.email}</span>
                      </div>
                    </div>

                    <div className="text-center text-sm text-gray-400">
                      {property.contactInfo.office}
                    </div>
                  </div>
                </div>
              )}

              {/* Similar Properties */}
              <div className="bg-dark-light rounded-2xl p-6 border border-gold/20">
                <h2 className="text-2xl font-bold text-gold mb-4">Similar Properties</h2>
                <div className="space-y-4">
                  {/* This section will need to be refactored to fetch similar properties from the backend */}
                  {/* For now, it will show a placeholder or no content */}
                  <p className="text-gray-400 text-sm">Similar properties data not available from backend.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery Modal */}
        {showAllImages && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative max-w-4xl w-full mx-4">
              <button
                onClick={() => setShowAllImages(false)}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-gold text-dark rounded-full flex items-center justify-center hover:bg-gold-dark transition"
              >
                ×
              </button>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[80vh] overflow-y-auto">
                {images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${property.title} ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg cursor-pointer hover:scale-105 transition"
                    onClick={() => {
                      setSelectedImage(index);
                      setShowAllImages(false);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
} 