import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { MapPin, Search as SearchIcon, Heart, X } from 'lucide-react';
import { Range, getTrackBackground } from 'react-range';
import Modal from 'react-modal';
import PropertyCard from './PropertyCard'; // Assuming a generic PropertyCard component exists
import axios from 'axios';

Modal.setAppElement('#root');

const coimbatoreLocalities = [
  "RS Puram", "Gandhipuram", "Saibaba Colony", "Peelamedu", "Singanallur",
  "Ramanathapuram", "Saravanampatti", "Kalapatti", "Vadavalli", "Kovaipudur",
];

const allAmenities = ["Parking", "Lift", "Power Backup", "24x7 Security", "Gym", "Swimming Pool", "Clubhouse"];

const uniqueLocalities = ["Coimbatore", ...Array.from(new Set(coimbatoreLocalities))];
const propertyTypes = ['All Types', 'House/Villa', 'Flat', 'Office Space', 'Shop/Showroom', 'Warehouse/Godown', 'Farm House'];
const budgetMin = 20; // in Lacs
const budgetMax = 1000; // 10 Cr in Lacs
const areaMin = 500;
const areaMax = 5000;
const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '+5 BHK'];

const BuyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sort, setSort] = useState('Relevance');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [budget, setBudget] = useState<[number, number]>([budgetMin, budgetMax]);
  const [area, setArea] = useState<[number, number]>([areaMin, areaMax]);
  const [search, setSearch] = useState('');
  const [selectedBHK, setSelectedBHK] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [postedSince, setPostedSince] = useState('All');
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const parsePrice = (priceStr: string) => {
    if (priceStr.includes('Cr')) {
      return parseFloat(priceStr.replace(/[^\d.]/g, '')) * 100;
    }
    return parseFloat(priceStr.replace(/[^\d.]/g, ''));
  };

  const getFilteredProperties = () => {
    let filtered = properties;
    // Exclude properties that are for rent/lease/PG/hostel
    const rentKeywords = [
      'rent', 'lease', 'pg', 'co-living', 'hostel', 'paying guest', 'co living', 'co-living', 'pg/co-living'
    ];
    filtered = filtered.filter(p => {
      const type = (p.type || '').toLowerCase();
      // If type contains any rent keyword, exclude it
      return !rentKeywords.some(keyword => type.includes(keyword));
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
    filtered = filtered.filter(p => { const price = parseFloat(p.price); return price >= budget[0] && price <= budget[1]; });
    filtered = filtered.filter(p => { const areaVal = parseInt(p.area); return areaVal >= area[0] && areaVal <= area[1]; });
    if (selectedBHK.length > 0) {
      const numBedrooms = selectedBHK.map(b => parseInt(b));
      filtered = filtered.filter(p => numBedrooms.includes(p.bedrooms));
    }
    if (selectedStatus.length > 0) {
      filtered = filtered.filter(p => selectedStatus.includes(p.status));
    }
    if (postedSince !== 'All') {
      const days = parseInt(postedSince.replace('Last ', '').replace(' days', ''));
      filtered = filtered.filter(p => {
        const postedDays = parseInt(p.posted?.replace(' days ago', '') || '99');
        return postedDays <= days;
      });
    }
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(p => Array.isArray(p.amenities) && selectedAmenities.every(a => p.amenities.includes(a)));
    }
    if (search.trim()) {
      filtered = filtered.filter(p => (p.title || '').toLowerCase().includes(search.toLowerCase()));
    }
    // Sorting logic
    const getPostedDateValue = (posted: any) => {
      const days = parseInt((posted || '').split(' ')[0]);
      return isNaN(days) ? 99 : days;
    };
    switch(sort) {
      case 'Price: Low to High': filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); break;
      case 'Price: High to Low': filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)); break;
      case 'Newest': filtered.sort((a, b) => getPostedDateValue(a.posted) - getPostedDateValue(b.posted)); break;
      default: filtered.sort((a, b) => (b.premium ? 1 : 0) - (a.premium ? 1 : 0)); break;
    }
    return filtered;
  };

  const filteredProperties = getFilteredProperties();
  console.log('Filtered properties:', filteredProperties); // Debug log

  const handleClearFilters = () => {
    setSelectedLocation('');
    setSelectedType('All Types');
    setBudget([budgetMin, budgetMax]);
    setArea([areaMin, areaMax]);
    setSelectedBHK([]);
    setSearch('');
    setSelectedStatus([]);
    setPostedSince('All');
    setSelectedAmenities([]);
  };

  const handleBHKChange = (bhk: string) => {
    setSelectedBHK(prev => prev.includes(bhk) ? prev.filter(item => item !== bhk) : [...prev, bhk]);
  };

  const handleToggleWishlist = (propertyId: string) => {
    setWishlist(prev => prev.includes(propertyId) ? prev.filter(id => id !== propertyId) : [...prev, propertyId]);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(prev => prev.includes(status) ? prev.filter(item => item !== status) : [...prev, status]);
  };
  
  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev => prev.includes(amenity) ? prev.filter(item => item !== amenity) : [...prev, amenity]);
  };

  const PriceDisplay = ({val}: {val: number}) => val >= 100 ? `₹${(val / 100).toFixed(1)} Cr` : `₹${val} L`;

  const FilterTag = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
    <div className="flex items-center bg-dark text-gold text-sm font-semibold pl-3 pr-2 py-1 rounded-full border border-gold/50">
      <span>{label}</span>
      <button onClick={onRemove} className="ml-2 text-gold hover:bg-gold/20 rounded-full p-0.5">
        <X size={14} />
      </button>
    </div>
  );

  const wishlistProperties = properties.filter(p => wishlist.includes(p.id));

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
      <main className="flex flex-1 pt-20">
        <aside className="w-[380px] bg-dark-light border-r border-gold/10 p-6 hidden lg:block h-[calc(100vh-80px)] sticky top-20 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl text-white font-semibold">Filters</h2>
            <button onClick={handleClearFilters} className="text-gold hover:underline">Clear</button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gold font-bold mb-2">Location</label>
              <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} className="w-full border border-gold/30 rounded-lg px-4 py-2 bg-dark-light/80 text-white focus:outline-none focus:border-gold">
                <option value="">All Locations</option>
                {uniqueLocalities.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-gold font-bold mb-2">Type of Property</label>
              <div className="flex flex-col gap-2">
                {propertyTypes.map(t => (
                  <button key={t} onClick={() => setSelectedType(t)} className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition-all ${selectedType === t ? 'bg-gold text-dark' : 'bg-gold/10 text-gold hover:bg-gold hover:text-dark'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gold font-bold mb-2">Budget</label>
              <div className="px-2">
                <Range
                  values={budget}
                  step={5}
                  min={budgetMin}
                  max={budgetMax}
                  onChange={(values) => setBudget(values as [number, number])}
                  renderTrack={({ props, children }) => (
                    <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      style={{
                        ...props.style,
                        height: '36px',
                        display: 'flex',
                        width: '100%',
                      }}
                    >
                      <div
                        ref={props.ref}
                        style={{
                          height: '5px',
                          width: '100%',
                          borderRadius: '4px',
                          background: getTrackBackground({
                            values: budget,
                            colors: ['#545454', '#c5a868', '#545454'],
                            min: budgetMin,
                            max: budgetMax,
                          }),
                          alignSelf: 'center',
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  )}
                  renderThumb={({ props, isDragged }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '24px',
                        width: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#1f1f1f',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 2px 6px #00000033',
                        border: '3px solid #c5a868'
                      }}
                    >
                      <div
                        style={{
                          height: '10px',
                          width: '10px',
                          borderRadius: '50%',
                          backgroundColor: isDragged ? '#c5a868' : '#c5a868',
                        }}
                      />
                    </div>
                  )}
                />
                <div className="flex justify-between text-sm text-gold mt-2">
                  <span><PriceDisplay val={budget[0]} /></span>
                  <span><PriceDisplay val={budget[1]} /></span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gold font-bold mb-2">Area (sqft)</label>
              <div className="px-2">
                 <Range
                  values={area}
                  step={50}
                  min={areaMin}
                  max={areaMax}
                  onChange={(values) => setArea(values as [number, number])}
                  renderTrack={({ props, children }) => (
                     <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      style={{
                        ...props.style,
                        height: '36px',
                        display: 'flex',
                        width: '100%',
                      }}
                    >
                      <div
                        ref={props.ref}
                        style={{
                          height: '5px',
                          width: '100%',
                          borderRadius: '4px',
                          background: getTrackBackground({
                            values: area,
                            colors: ['#545454', '#c5a868', '#545454'],
                            min: areaMin,
                            max: areaMax,
                          }),
                          alignSelf: 'center',
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  )}
                  renderThumb={({ props, isDragged }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '24px',
                        width: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#1f1f1f',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 2px 6px #00000033',
                        border: '3px solid #c5a868'
                      }}
                    >
                      <div
                        style={{
                          height: '10px',
                          width: '10px',
                          borderRadius: '50%',
                          backgroundColor: isDragged ? '#c5a868' : '#c5a868',
                        }}
                      />
                    </div>
                  )}
                />
                <div className="flex justify-between text-sm text-gold mt-2">
                  <span>{area[0]} sqft</span>
                  <span>{area[1]} sqft</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gold font-bold mb-2">No. of Bedrooms</label>
              <div className="flex flex-wrap gap-2">
                {bhkOptions.map(bhk => (
                  <button key={bhk} onClick={() => handleBHKChange(bhk)} className={`px-3 py-1.5 text-sm rounded-full border-2 transition-colors ${selectedBHK.includes(bhk) ? 'bg-gold text-dark border-gold' : 'bg-transparent border-gray-600 hover:border-gold'}`}>
                    {bhk}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gold font-bold mb-2">Property Status</label>
              <div className="flex flex-wrap gap-2">
                {['Ready to Move', 'Under Construction', 'New Launch'].map(status => (
                  <button key={status} onClick={() => handleStatusChange(status)} className={`px-3 py-1.5 text-sm rounded-full border-2 transition-colors ${selectedStatus.includes(status) ? 'bg-gold text-dark border-gold' : 'bg-transparent border-gray-600 hover:border-gold'}`}>
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gold font-bold mb-2">Posted Since</label>
              <select value={postedSince} onChange={e => setPostedSince(e.target.value)} className="w-full border border-gold/30 rounded-lg px-4 py-2 bg-dark-light/80 text-white focus:outline-none focus:border-gold">
                <option>All</option>
                <option>Last 7 days</option>
                <option>Last 15 days</option>
                <option>Last 30 days</option>
              </select>
            </div>

            <div>
              <label className="block text-gold font-bold mb-2">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {allAmenities.map(amenity => (
                  <button key={amenity} onClick={() => handleAmenityChange(amenity)} className={`px-3 py-1.5 text-sm rounded-full border-2 transition-colors ${selectedAmenities.includes(amenity) ? 'bg-gold text-dark border-gold' : 'bg-transparent border-gray-600 hover:border-gold'}`}>
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-dark p-4 rounded-xl border border-gold/10">
            <h3 className="text-gold font-bold mb-4 text-lg">Selected Filters</h3>
            <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
              {budget[0] > budgetMin || budget[1] < budgetMax ? <FilterTag label={`Budget: ${PriceDisplay({val: budget[0]})} - ${PriceDisplay({val: budget[1]})}`} onRemove={() => setBudget([budgetMin, budgetMax])} /> : null}
              {area[0] > areaMin || area[1] < areaMax ? <FilterTag label={`Area: ${area[0]} - ${area[1]} sqft`} onRemove={() => setArea([areaMin, areaMax])} /> : null}
              {selectedBHK.map(bhk => <FilterTag key={bhk} label={bhk} onRemove={() => handleBHKChange(bhk)} />)}
              {selectedStatus.map(status => <FilterTag key={status} label={status} onRemove={() => handleStatusChange(status)} />)}
              {selectedAmenities.map(amenity => <FilterTag key={amenity} label={amenity} onRemove={() => handleAmenityChange(amenity)} />)}
              {postedSince !== 'All' ? <FilterTag label={`Posted: ${postedSince}`} onRemove={() => setPostedSince('All')} /> : null}
              {selectedLocation !== '' && selectedLocation !== 'All Locations' ? <FilterTag label={`Location: ${selectedLocation}`} onRemove={() => setSelectedLocation('')} /> : null}
              {selectedType !== 'All Types' ? <FilterTag label={`Type: ${selectedType}`} onRemove={() => setSelectedType('All Types')} /> : null}
            </div>
          </div>
        </aside>

        <div className="flex-1 p-6 overflow-y-auto h-[calc(100vh-80px)]">
          <div className="relative mb-6">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Enter Locality / Project / Society / Landmark" className="w-full bg-white text-dark border-2 border-gray-300 rounded-lg py-3 pl-4 pr-12 focus:outline-none focus:border-gold" />
            <SearchIcon className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6 border-b border-gold/10">
              <button onClick={() => setActiveTab(0)} className={`pb-2 text-lg font-medium transition-colors ${activeTab === 0 ? 'text-gold border-b-2 border-gold' : 'text-gray-400 hover:text-white'}`}>
                Properties ({filteredProperties.length})
              </button>
              <button onClick={() => setActiveTab(1)} className={`pb-2 text-lg font-medium transition-colors ${activeTab === 1 ? 'text-gold border-b-2 border-gold' : 'text-gray-400 hover:text-white'}`}>
                New Projects
              </button>
              <button onClick={() => setActiveTab(2)} className={`pb-2 text-lg font-medium transition-colors ${activeTab === 2 ? 'text-gold border-b-2 border-gold' : 'text-gray-400 hover:text-white'}`}>
                Top Agents
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400">{filteredProperties.length} Results</span>
              <div className="relative">
                <select value={sort} onChange={e => setSort(e.target.value)} className="bg-dark-light border border-gold/20 rounded-lg py-2 pl-3 pr-8 text-white focus:ring-2 focus:ring-gold focus:outline-none appearance-none">
                  <option>Relevance</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gold pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <button onClick={() => setIsWishlistModalOpen(true)} className="relative p-2 rounded-full border-2 border-gray-600 hover:border-gold transition-colors">
                <Heart className="w-5 h-5 text-gray-400" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          <div className="w-full flex flex-col gap-8 px-8">
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
            {filteredProperties.map(prop => (
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
            ))}
          </div>
        </div>
      </main>

      <Modal
        isOpen={isWishlistModalOpen}
        onRequestClose={() => setIsWishlistModalOpen(false)}
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
            background: '#1f1f1f',
            border: '2px solid #c5a868',
            borderRadius: '10px',
            padding: '2rem',
            maxWidth: '600px',
            width: '90%',
            color: '#fff',
          },
        }}
        contentLabel="Wishlist Modal"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gold">My Wishlist</h2>
          <button onClick={() => setIsWishlistModalOpen(false)} className="text-gold">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {wishlistProperties.length > 0 ? (
            wishlistProperties.map(prop => (
              <div key={prop.id} className="flex items-center gap-4 bg-dark-light p-3 rounded-lg">
                <img src={prop.image} alt={prop.title} className="w-24 h-20 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{prop.title}</h3>
                  <p className="text-sm text-gray-400">{prop.price} | {prop.area}</p>
                </div>
                <button onClick={() => handleToggleWishlist(prop.id)} className="text-red-500 hover:underline font-semibold">
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-8">Your wishlist is empty.</p>
          )}
        </div>
      </Modal>
      <Footer />
    </div>
  );
};

export default BuyPage;