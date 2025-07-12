import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { MapPin, Search as SearchIcon, Crosshair, X, Heart } from 'lucide-react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { Range, getTrackBackground } from 'react-range';
import Modal from 'react-modal';
import axios from 'axios';
import PropertyCard from './PropertyCard';

Modal.setAppElement('#root');

// Helper to generate random coordinates near a city
function randomNearby(lat: number, lng: number, km = 10): { lat: number; lng: number } {
  const r = km / 111; // ~1 deg lat = 111km
  const u = Math.random();
  const v = Math.random();
  const w = r * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  return {
    lat: lat + w * Math.cos(t),
    lng: lng + w * Math.sin(t) / Math.cos(lat * Math.PI / 180),
  };
}

// Only Coimbatore and surroundings
const cityCenters: { [key: string]: { lat: number; lng: number } } = {
  Coimbatore: { lat: 11.0168, lng: 76.9558 },
};

const coimbatoreLocalities = [
  "RS Puram", "Gandhipuram", "Saibaba Colony", "Peelamedu", "Singanallur",
  "Ramanathapuram", "Saravanampatti", "Kalapatti", "Vadavalli", "Kovaipudur",
  "Thudiyalur", "Ukkadam", "Podanur", "Ganapathy", "Race Course",
  "Town Hall", "Eachanari", "Chinnavedampatti", "Neelambur", "Kuniyamuthur"
];

const RentPage: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [sort, setSort] = useState('Relevance');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [budget, setBudget] = useState<[number, number]>([3000, 100000]);
  const [area, setArea] = useState([150, 4000]);
  const [search, setSearch] = useState('');
  const [selectedBHK, setSelectedBHK] = useState<string[]>([]);
  const [selectedRoomType, setSelectedRoomType] = useState('Any');
  const [geoMessage, setGeoMessage] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [showNearby, setShowNearby] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<any | null>(null);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Google Maps loader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: '', // Enter your key here
  });

  const fetchProperties = () => {
    setLoading(true);
    setError('');
    axios.get('http://localhost:5000/properties')
      .then(res => {
        setProperties(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch properties.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProperties();
    const interval = setInterval(fetchProperties, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Haversine formula for distance in km
  function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Sorting helper for dates
  const getPostedDateValue = (posted: string) => {
    if (posted === 'Today') return 0;
    if (posted === 'Yesterday') return 1;
    const days = parseInt(posted.split(' ')[0]);
    return isNaN(days) ? 99 : days;
  };

  // Main filter function
  const getFilteredProperties = () => {
    let filtered = properties;
    // Only include properties that are for rent/lease/PG/hostel
    const rentKeywords = [
      'rent', 'lease', 'pg', 'co-living', 'hostel', 'paying guest', 'co living', 'co-living', 'pg/co-living'
    ];
    filtered = filtered.filter(p => {
      const type = (p.type || '').toLowerCase();
      // If type contains any rent keyword, include it
      return rentKeywords.some(keyword => type.includes(keyword));
    });
    if (selectedLocation && selectedLocation !== 'All Locations') {
      filtered = filtered.filter(p => (p.location || '').toLowerCase() === selectedLocation.toLowerCase());
    }
    if (selectedType && selectedType !== 'All Types') {
      filtered = filtered.filter(p =>
        (p.type || '').toLowerCase() === selectedType.toLowerCase() ||
        (p.title || '').toLowerCase().includes(selectedType.toLowerCase())
      );
    }
    filtered = filtered.filter(p => p.price >= budget[0] && p.price <= budget[1]);
    filtered = filtered.filter(p => p.area >= area[0] && p.area <= area[1]);
    if (selectedType === 'PG/Co-living') {
      if (selectedRoomType !== 'Any') {
        filtered = filtered.filter(p => p.bhk === selectedRoomType);
      }
    } else {
      if (selectedBHK.length > 0) {
        filtered = filtered.filter(p => selectedBHK.includes(p.bhk || ''));
      }
    }
    if (search.trim()) {
      filtered = filtered.filter(p =>
        (p.title || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.location && p.location.toLowerCase().includes(search.toLowerCase())) ||
        (p.owner && p.owner.toLowerCase().includes(search.toLowerCase()))
      );
    }
    if (showNearby && userLocation) {
      filtered = filtered.filter(p => getDistance(userLocation.lat, userLocation.lng, p.lat, p.lng) <= 5);
    }
    // Sorting logic
    switch(sort) {
      case 'Price (Low to High)':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Price (High to Low)':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'Date (Newest First)':
        filtered.sort((a, b) => getPostedDateValue(a.posted) - getPostedDateValue(b.posted));
        break;
      default: // Relevance
        break;
    }
    return filtered;
  };

  const filteredProperties = getFilteredProperties();
  console.log('Filtered properties:', filteredProperties); // Debug log

  // Properties within 5km for map
  const nearbyProperties = showNearby && userLocation
    ? getFilteredProperties().filter(p => p.lat && p.lng && getDistance(userLocation.lat, userLocation.lng, p.lat, p.lng) <= 5)
    : [];

  // Geolocation handler
  const handleLocateMe = () => {
    setGeoMessage('');
    setIsLocating(true);
    if (!navigator.geolocation) {
      setGeoMessage('Geolocation is not supported by your browser. Showing demo properties near Coimbatore.');
      setUserLocation({ lat: 11.0168, lng: 76.9558 });
      setShowNearby(true);
      setIsLocating(false);
      return;
    }
    const geoTimeout = setTimeout(() => {
      setGeoMessage('Location request timed out. Showing demo properties near Coimbatore.');
      setUserLocation({ lat: 11.0168, lng: 76.9558 });
      setShowNearby(true);
      setIsLocating(false);
    }, 15000);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(geoTimeout);
        setGeoMessage('Showing properties near your location (5km radius)...');
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        setShowNearby(true);
        setIsLocating(false);
      },
      (error) => {
        clearTimeout(geoTimeout);
        setGeoMessage('Location access denied or unavailable. Showing demo properties near Coimbatore.');
        setUserLocation({ lat: 11.0168, lng: 76.9558 });
        setShowNearby(true);
        setIsLocating(false);
      }
    );
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedLocation('');
    setSelectedType('All Types');
    setBudget([3000, 100000]);
    setArea([150, 4000]);
    setSearch('');
    setSelectedBHK([]);
    setSelectedRoomType('Any');
    setGeoMessage('');
    setUserLocation(null);
    setShowNearby(false);
    setIsLocating(false);
    setShowMap(false);
    setSelectedMarker(null);
  };

  const handleToggleWishlist = (property: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev =>
      prev.some(item => item.id === property.id)
        ? prev.filter(item => item.id !== property.id)
        : [...prev, property]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <Header />
      <button
        className="fixed top-24 right-8 z-50 bg-gold text-dark px-4 py-2 rounded shadow font-bold hover:bg-gold/80 transition"
        onClick={fetchProperties}
        disabled={loading}
      >
        {loading ? 'Refreshing...' : 'Refresh'}
      </button>
      <div className="flex flex-1 pt-20">
        {/* Sidebar Filters */}
        <aside className="w-80 bg-dark-light border-r border-gold/10 p-6 hidden lg:block h-[calc(100vh-64px)] sticky top-20 overflow-y-auto">
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-dark-light py-2 z-10">
            <span className="text-gold font-bold text-lg">Filters</span>
            <button
              className="text-gold border border-gold px-3 py-1 rounded-lg font-semibold hover:bg-gold hover:text-dark transition-all text-sm"
              onClick={handleClearFilters}
            >
              Clear
            </button>
          </div>
          <div className="mb-6">
            <label className="block text-gold font-bold mb-2">Location</label>
            <select
              className="w-full border border-gold/30 rounded-lg px-4 py-2 bg-dark-light/80 text-white"
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
            >
              {["All Locations", ...Array.from(new Set(properties.map(p => p.location)))].map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gold font-bold mb-2">Type of Property</label>
            <div className="flex flex-col gap-2">
              {['All Types', 'House/Villa', 'Flat', 'Office Space', 'Shop/Showroom', 'Warehouse/Godown', 'Farm House', 'PG/Co-living'].map((t) => (
                <div key={t}>
                  <button
                    onClick={() => {
                      setSelectedType(t);
                      if (t !== 'PG/Co-living') {
                        setSelectedRoomType('Any');
                      }
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg font-semibold ${
                      selectedType === t ? 'bg-gold text-dark' : 'bg-gold/10 text-gold'
                    } hover:bg-gold hover:text-dark transition-all`}
                  >
                    {t}
                  </button>
                  {t === 'PG/Co-living' && selectedType === 'PG/Co-living' && (
                    <div className="pl-4 pt-2 mt-2 flex flex-wrap gap-2 border-l-2 border-gold/30">
                      {['Any', 'Private Room', 'Sharing Room'].map((r) => (
                        <button
                          key={r}
                          onClick={() => setSelectedRoomType(r)}
                          className={`px-3 py-1 text-sm rounded-full font-semibold ${
                            selectedRoomType === r
                              ? 'bg-gold text-dark'
                              : 'bg-gold/10 text-gold'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gold font-bold mb-2">Budget (₹)</label>
            <div className="px-2">
              <Range
                step={1000}
                min={3000}
                max={100000}
                values={budget}
                onChange={(values) => setBudget(values as [number, number])}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="h-2 w-full rounded-full"
                    style={{
                      ...props.style,
                      background: getTrackBackground({
                        values: budget,
                        colors: ['#374151', '#c5a868', '#374151'],
                        min: 3000,
                        max: 100000,
                      }),
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="h-5 w-5 bg-gold rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-light focus:ring-gold"
                  />
                )}
              />
            </div>
            <div className="flex justify-between text-sm text-gold/80 mt-2">
              <span>₹{budget[0].toLocaleString()}</span>
              <span>₹{budget[1].toLocaleString()}</span>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gold font-bold mb-2">Area (sqft)</label>
            <div className="px-2">
               <Range
                step={50}
                min={150}
                max={4000}
                values={area}
                onChange={(values) => setArea(values as [number, number])}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="h-2 w-full rounded-full"
                    style={{
                      ...props.style,
                      background: getTrackBackground({
                        values: area,
                        colors: ['#374151', '#c5a868', '#374151'],
                        min: 150,
                        max: 4000,
                      }),
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="h-5 w-5 bg-gold rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-light focus:ring-gold"
                  />
                )}
              />
            </div>
            <div className="flex justify-between text-sm text-gold/80 mt-2">
              <span>{area[0]} sqft</span>
              <span>{area[1]} sqft</span>
            </div>
          </div>
          {selectedType !== 'PG/Co-living' && (
            <div className="mb-6">
              <label className="block text-gold font-bold mb-2">No. of Bedrooms</label>
              <div className="flex flex-wrap gap-2">
                {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '+5 BHK'].map((b) => (
                  <button key={b} onClick={() => setSelectedBHK(selectedBHK.includes(b) ? selectedBHK.filter(x => x !== b) : [...selectedBHK, b])} className={`px-3 py-1 rounded-full font-semibold ${selectedBHK.includes(b) ? 'bg-gold text-dark' : 'bg-gold/10 text-gold'} hover:bg-gold hover:text-dark transition-all`}>{b}</button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Filters Display */}
          <div className="mt-6 p-4 rounded-lg border border-gold/20 bg-dark">
            <h3 className="text-gold font-bold mb-3">Selected Filters</h3>
            <div className="flex flex-wrap gap-2">
              {selectedLocation && selectedLocation !== "All Locations" && (
                <div className="filter-tag"><span>{selectedLocation}</span><button onClick={() => setSelectedLocation('All Locations')}>×</button></div>
              )}
              {selectedType !== 'All Types' && (
                <div className="filter-tag"><span>{selectedType}</span><button onClick={() => setSelectedType('All Types')}>×</button></div>
              )}
              {selectedType === 'PG/Co-living' && selectedRoomType !== 'Any' && (
                  <div className="filter-tag">
                      <span>{selectedRoomType}</span>
                      <button onClick={() => setSelectedRoomType('Any')}>×</button>
                  </div>
              )}
              {selectedType !== 'PG/Co-living' && selectedBHK.map(b => (
                <div key={b} className="filter-tag"><span>{b}</span><button onClick={() => setSelectedBHK(p => p.filter(x => x !== b))}>×</button></div>
              ))}
              {(budget[0] > 3000 || budget[1] < 100000) && (
                 <div className="filter-tag"><span>₹{budget[0]}-{budget[1]}</span><button onClick={() => setBudget([3000, 100000])}>×</button></div>
              )}
              {(area[0] > 150 || area[1] < 4000) && (
                 <div className="filter-tag"><span>{area[0]}-{area[1]} sqft</span><button onClick={() => setArea([150, 4000])}>×</button></div>
              )}
            </div>
          </div>
        </aside>
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Modern Search Bar */}
          <div className="w-full flex justify-center bg-gradient-to-br from-dark via-dark to-black py-8 px-2 sticky top-20 z-20">
            <div className="w-full max-w-4xl">
              <div className="flex items-center bg-white rounded-xl shadow border border-gold px-2 py-1 focus-within:ring-2 focus-within:ring-gold">
                {/* Search Input */}
                <input
                  type="text"
                  className="flex-1 bg-transparent px-3 py-3 text-gray-700 text-base focus:outline-none"
                  placeholder="Enter Locality / Project / Society / Landmark"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {/* Locate Near Me Button */}
                <button
                  className="mx-1 p-2 rounded-full bg-gold/10 hover:bg-gold/20 text-gold focus:outline-none focus:ring-2 focus:ring-gold"
                  title="Locate Near Me"
                  onClick={handleLocateMe}
                  type="button"
                  disabled={isLocating}
                >
                  <Crosshair className="w-5 h-5" />
                </button>
                {/* Show in Maps Button */}
                {showNearby && userLocation && (
                  <button
                    className="mx-1 p-2 rounded-full bg-gold/10 hover:bg-gold/20 text-gold focus:outline-none focus:ring-2 focus:ring-gold"
                    title="Show in Maps"
                    onClick={() => setShowMap(true)}
                    type="button"
                  >
                    <MapPin className="w-5 h-5" />
                  </button>
                )}
                {/* Search Button */}
                <button
                  className="mx-1 p-2 rounded-full bg-gold/10 hover:bg-gold/20 text-gold focus:outline-none focus:ring-2 focus:ring-gold"
                  title="Search"
                  type="button"
                  onClick={() => {}}
                >
                  <SearchIcon className="w-5 h-5" />
                </button>
              </div>
              {isLocating && <div className="text-gold mt-2 text-sm">Locating you...</div>}
              {geoMessage && <div className="text-gold mt-2 text-sm">{geoMessage}</div>}
            </div>
          </div>

          {/* Google Map Modal/Overlay */}
          {showMap && isLoaded && userLocation && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
              <div className="relative w-full max-w-5xl h-[80vh] bg-dark rounded-xl shadow-lg border-2 border-gold">
                <button
                  className="absolute top-4 right-4 z-10 bg-gold text-dark rounded-full p-2 shadow hover:bg-yellow-400"
                  onClick={() => setShowMap(false)}
                  title="Close Map"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-gold">
                    <p className="text-lg font-semibold">Map is unavailable</p>
                    <p className="text-sm">Please provide a valid Google Maps API key.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="w-full flex justify-center border-b border-gold/10 bg-dark-light sticky top-[104px] z-10">
            <div className="w-full max-w-7xl flex justify-between items-center px-4">
              <div className="flex gap-8">
                {['Properties', 'New Projects', 'Top Agents'].map((tab, idx) => (
                  <button
                    key={tab}
                    className={`py-4 px-6 font-bold text-base border-b-2 transition-all ${activeTab === idx ? 'text-gold border-gold' : 'text-gold/60 border-transparent hover:text-gold'}`}
                    onClick={() => setActiveTab(idx)}
                  >
                    {tab}{' '}
                    {tab === 'Properties' ? (
                      <span className="ml-1">({filteredProperties.length})</span>
                    ) : (
                      <span className="ml-1">({properties.length})</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4 text-gold">
                <span>{filteredProperties.length} Results</span>
                <div className="flex items-center gap-2">
                  <label>Sort by:</label>
                  <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-dark-light border border-gold/30 rounded px-2 py-1 text-white">
                    <option>Relevance</option>
                    <option>Price (Low to High)</option>
                    <option>Price (High to Low)</option>
                    <option>Date (Newest First)</option>
                  </select>
                </div>
                 <button onClick={() => setIsWishlistOpen(true)} className="relative text-gold hover:text-white transition">
                  <Heart className="w-6 h-6" />
                  {wishlist.length > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{wishlist.length}</span>}
                </button>
              </div>
            </div>
          </div>
          {/* Property List */}
          <main className="flex-1 bg-dark px-4 py-6 flex flex-col items-center">
            {loading && (
              <div className="flex justify-center items-center h-64">
                <div className="loader" />
                <span className="ml-4 text-gold font-bold">Loading properties...</span>
              </div>
            )}
            {error && (
              <div className="flex justify-center items-center h-64">
                <span className="text-red-500 font-bold">{error}</span>
              </div>
            )}
            {!loading && !error && filteredProperties.length === 0 && (
              <div className="flex justify-center items-center h-64">
                <span className="text-gold font-bold">No properties found matching your criteria.</span>
              </div>
            )}
            <div className="w-full flex flex-col gap-8 px-8">
              {filteredProperties.length === 0 ? (
                <div className="text-center text-gold text-lg font-semibold py-12">{showNearby ? 'No properties found within 5km of your location.' : 'No properties found matching your criteria.'}</div>
              ) : (
                filteredProperties.map(prop => (
                  <PropertyCard
                    key={prop._id || prop.id || ''}
                    id={prop._id || prop.id || ''}
                    title={prop.title || ''}
                    location={prop.location || ''}
                    price={`₹${prop.price?.toLocaleString?.() || prop.price || ''}`}
                    type={prop.type || ''}
                    bedrooms={prop.bedrooms}
                    bathrooms={prop.bathrooms}
                    area={`${prop.area || ''} sqft`}
                    image={prop.images && prop.images.length > 0 ? prop.images[0] : prop.image || ''}
                    isForSale={(prop.type || '').toLowerCase() === 'buy'}
                    viewMode="list"
                    description={prop.description || ''}
                  />
                ))
              )}
            </div>
          </main>
        </div>
      </div>
      <Modal
        isOpen={isWishlistOpen}
        onRequestClose={() => setIsWishlistOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 50,
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#1f2024',
            border: '1px solid #c5a868',
            borderRadius: '10px',
            padding: '20px',
            color: '#fff',
            maxWidth: '90vw',
            maxHeight: '80vh',
            width: '800px',
          },
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gold">My Wishlist</h2>
          <button onClick={() => setIsWishlistOpen(false)} className="text-gold text-2xl">&times;</button>
        </div>
        <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
          {wishlist.length > 0 ? (
            wishlist.map(property => (
              <div key={property.id} className="flex items-center gap-4 p-4 mb-4 bg-dark-light rounded-lg">
                <img src={property.image} alt={property.title} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-bold text-gold">{property.title}</h3>
                  <p className="text-sm text-gold/80">{property.price.toLocaleString()} | {property.area} sqft</p>
                </div>
                <button onClick={(e) => handleToggleWishlist(property, e)} className="text-red-500 hover:text-red-700 font-semibold">Remove</button>
              </div>
            ))
          ) : (
            <p className="text-center text-gold/80">Your wishlist is empty.</p>
          )}
        </div>
      </Modal>
      <Footer />
    </div>
  );
};

export default RentPage; 