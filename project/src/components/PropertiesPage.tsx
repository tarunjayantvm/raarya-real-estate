import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Heart, Plus, ExternalLink, BedDouble, Bath, Ruler, ListChecks, Info } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropertyCard from './PropertyCard'; // Added import for PropertyCard

const filters = [
  { label: 'ALL', value: 'all', color: 'bg-gold text-dark' },
  { label: 'FOR BUY', value: 'buy', color: 'bg-gold text-dark' },
  { label: 'FOR RENT', value: 'rent', color: 'bg-gold text-dark' },
];

const sortOptions = [
  { label: 'Default Order', value: 'default' },
  { label: 'Price: Low to High', value: 'priceLow' },
  { label: 'Price: High to Low', value: 'priceHigh' },
];

const PAGE_SIZE = 9;

function filterProperties(properties: any[], filter: any) {
  if (filter === 'buy') return properties.filter((p: any) => p.type === 'buy');
  if (filter === 'rent') return properties.filter((p: any) => p.type === 'rent');
  return properties;
}

function sortProperties(properties: any[], sort: any) {
  if (sort === 'priceLow') return [...properties].sort((a: any, b: any) => a.price - b.price);
  if (sort === 'priceHigh') return [...properties].sort((a: any, b: any) => b.price - a.price);
  return properties;
}

// Helper for type-safe property access
function getFieldValue(obj: any, key: string) {
  switch (key) {
    case 'image': return obj.image;
    case 'title': return obj.title;
    case 'price': return obj.price;
    case 'area': return obj.area;
    case 'bedrooms': return obj.bedrooms;
    case 'bathrooms': return obj.bathrooms;
    case 'status': return obj.status;
    case 'amenities': return obj.amenities;
    case 'type': return obj.type;
    case 'location': return obj.location;
    case 'description': return obj.description;
    default: return '';
  }
}

// Animation classes for modal
const modalAnim = 'animate-[popIn_0.35s_ease]';
// Gold shimmer animation for modal border (add to global CSS if not present)
const shimmerAnim = 'animate-[shimmer_2s_linear_infinite]';

export default function PropertiesPage() {
  const [filter, setFilter] = React.useState('all');
  const [sort, setSort] = React.useState('default');
  const [page, setPage] = React.useState(1);
  const [wishlist, setWishlist] = React.useState<number[]>([]);
  const [compare, setCompare] = React.useState<number[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [properties, setProperties] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

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
  }, [location.search]);

  // Parse query params
  const params = React.useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      tab: searchParams.get('tab') || 'Buy',
      location: searchParams.get('location') || '',
      type: searchParams.get('type') || '',
      budget: searchParams.get('budget') || '',
      q: searchParams.get('q') || '',
    };
  }, [location.search]);

  // Filter properties based on params
  const filterByParams = (properties: any[]) => {
    let filtered = [...properties];
    // Only filter by type/location for debugging
    if (params.tab === 'Buy') filtered = filtered.filter(p => (p.type || '').toLowerCase() === 'buy');
    if (params.tab === 'Rent') filtered = filtered.filter(p => (p.type || '').toLowerCase() === 'rent');
    if (params.location) filtered = filtered.filter(p => (p.location || '').toLowerCase().includes(params.location.toLowerCase()));
    // // Uncomment filters below one by one after confirming cards display
    // if (params.type) filtered = filtered.filter(p => (p.title || '').toLowerCase().includes(params.type.toLowerCase()) || (p.type || '').toLowerCase().includes(params.type.toLowerCase()));
    // if (params.budget) {
    //   if (params.budget === '10-20') filtered = filtered.filter(p => p.price >= 1000000 && p.price <= 2000000);
    //   if (params.budget === '20-50') filtered = filtered.filter(p => p.price > 2000000 && p.price <= 5000000);
    //   if (params.budget === '50-100') filtered = filtered.filter(p => p.price > 5000000 && p.price <= 10000000);
    //   if (params.budget === '100-200') filtered = filtered.filter(p => p.price > 10000000 && p.price <= 20000000);
    //   if (params.budget === '200+') filtered = filtered.filter(p => p.price > 20000000);
    // }
    // if (params.q) {
    //   filtered = filtered.filter(p =>
    //     (p.title && p.title.toLowerCase().includes(params.q.toLowerCase())) ||
    //     (p.location && p.location.toLowerCase().includes(params.q.toLowerCase())) ||
    //     (p.description && p.description.toLowerCase().includes(params.q.toLowerCase()))
    //   );
    // }
    return filtered;
  };

  const filteredByParams = filterByParams(properties);
  const filtered = filterProperties(filteredByParams, filter);
  const sorted = sortProperties(filtered, sort);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Add debug log for paginated properties
  console.log('Paginated properties:', paginated);

  // Get compared properties
  const comparedProperties = properties.filter(p => compare.includes(p.id));

  // Helper to get all keys to compare
  const compareFields = [
    { key: 'image', label: '', icon: null },
    { key: 'title', label: 'Title', icon: <Info className="inline w-5 h-5 mr-1 text-gold" /> },
    { key: 'price', label: 'Price', icon: <Info className="inline w-5 h-5 mr-1 text-gold" /> },
    { key: 'area', label: 'Area', icon: <Ruler className="inline w-5 h-5 mr-1 text-gold" /> },
    { key: 'bedrooms', label: 'Bedrooms', icon: <BedDouble className="inline w-5 h-5 mr-1 text-gold" /> },
    { key: 'bathrooms', label: 'Bathrooms', icon: <Bath className="inline w-5 h-5 mr-1 text-gold" /> },
    { key: 'status', label: 'Status', icon: <Info className="inline w-5 h-5 mr-1 text-gold" /> },
    { key: 'amenities', label: 'Amenities', icon: <ListChecks className="inline w-5 h-5 mr-1 text-gold" /> },
    { key: 'type', label: 'Type', icon: <Info className="inline w-5 h-5 mr-1 text-gold" /> },
    { key: 'location', label: 'Location', icon: <Info className="inline w-5 h-5 mr-1 text-gold" /> },
    { key: 'description', label: 'Description', icon: <Info className="inline w-5 h-5 mr-1 text-gold" /> },
  ];

  // Helper to check if all values in a field are the same
  const isSame = (field: string) => {
    if (comparedProperties.length < 2) return true;
    const first = getFieldValue(comparedProperties[0], field);
    return comparedProperties.every(p => {
      const val = getFieldValue(p, field);
      if (Array.isArray(first) && Array.isArray(val)) {
        return JSON.stringify(first) === JSON.stringify(val);
      }
      return val === first;
    });
  };

  const handleExternalLink = (property: any) => {
    navigate(`/property/${property.id}`);
  };
  const handleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]);
  };
  const handleCompare = (id: number) => {
    setCompare(prev => prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]);
  };

  return (
    <>
      <Header />
      <button
        className="fixed top-24 right-8 z-50 bg-gold text-dark px-4 py-2 rounded shadow font-bold hover:bg-gold/80 transition"
        onClick={fetchProperties}
        disabled={loading}
      >
        {loading ? 'Refreshing...' : 'Refresh'}
      </button>
      <div className="bg-dark min-h-screen pt-32 pb-16">
        {/* Filter & Sort Bar */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 mb-8">
          <div className="flex gap-4">
            {filters.map(f => (
              <button
                key={f.value}
                className={`px-6 py-2 font-bold text-base rounded-full shadow ${filter === f.value ? 'bg-gold text-dark' : 'bg-dark-light text-gold border border-gold'} transition`}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gold">Sort By:</span>
            <select
              className="bg-dark-light text-gold border border-gold px-4 py-2 rounded shadow focus:outline-none"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Property Cards Grid */}
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
          {!loading && !error && paginated.length === 0 && (
            <div className="flex justify-center items-center h-64">
              <span className="text-gold font-bold">No properties found matching your criteria.</span>
            </div>
          )}
          {paginated.map((property: any) => (
            <PropertyCard
              key={property._id || property.id || ''}
              id={property._id || property.id || ''}
              title={property.title || ''}
              location={property.location || ''}
              price={`₹${property.price?.toLocaleString?.() || property.price || ''}`}
              type={property.type || ''}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              area={`${property.area || ''} sqft`}
              image={property.images && property.images.length > 0 ? property.images[0] : property.image || ''}
              isForSale={(property.type || '').toLowerCase() === 'buy'}
              viewMode="list"
            />
          ))}
        </div>
        {/* Pagination Bar */}
        <div className="flex justify-center mt-12 gap-2">
          <button
            className={`w-12 h-12 flex items-center justify-center text-2xl font-bold rounded-lg border border-gold bg-dark text-gold hover:bg-gold/20 transition disabled:opacity-40`}
            onClick={() => setPage(1)}
            disabled={page === 1}
            aria-label="First page"
          >
            &laquo;
          </button>
          <button
            className={`w-12 h-12 flex items-center justify-center text-2xl font-bold rounded-lg border border-gold bg-dark text-gold hover:bg-gold/20 transition disabled:opacity-40`}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
          >
            &lsaquo;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`w-12 h-12 flex items-center justify-center text-xl font-bold rounded-lg border border-gold transition
                ${page === i + 1 ? 'bg-gold text-dark' : 'bg-dark text-gold hover:bg-gold/20'}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={`w-12 h-12 flex items-center justify-center text-2xl font-bold rounded-lg border border-gold bg-dark text-gold hover:bg-gold/20 transition disabled:opacity-40`}
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            &rsaquo;
          </button>
          <button
            className={`w-12 h-12 flex items-center justify-center text-2xl font-bold rounded-lg border border-gold bg-dark text-gold hover:bg-gold/20 transition disabled:opacity-40`}
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            aria-label="Last page"
          >
            &raquo;
          </button>
        </div>
        {/* Sticky Compare Bar */}
        {compare.length >= 2 && (
          <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center items-center bg-dark/95 border-t border-gold/30 py-4 shadow-2xl animate-fade-in-up">
            <div className="flex gap-2">
              {comparedProperties.map(p => (
                <div key={p.id} className="flex items-center gap-2 bg-dark-light border border-gold/30 rounded-full px-4 py-2 text-gold font-bold shadow">
                  <img src={p.image} alt={p.title} className="w-8 h-8 rounded-full object-cover border border-gold" />
                  <span className="truncate max-w-[120px]">{p.title}</span>
                  <button onClick={() => setCompare(compare.filter(id => id !== p.id))} className="ml-1 text-gold hover:text-red-500 font-bold">×</button>
                </div>
              ))}
            </div>
            <button
              className="ml-6 px-8 py-3 bg-gold text-dark font-bold rounded-full shadow-lg hover:bg-gold/90 transition text-lg border-2 border-gold focus:outline-none"
              onClick={() => setShowCompareModal(true)}
            >
              Compare
            </button>
          </div>
        )}
        {/* Compare Modal */}
        {showCompareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className={`relative bg-gradient-to-br from-[#18140f] via-[#23201a] to-[#18140f] rounded-3xl shadow-2xl max-w-7xl w-full mx-2 my-8 overflow-x-auto overflow-y-auto max-h-[95vh] border-4 border-gold/80 animate-[popIn_0.35s_ease] animate-[shimmer_2s_linear_infinite]`}
              style={{ boxShadow: '0 8px 48px 0 rgba(212,180,84,0.18)' }}>
              {/* Sticky header */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-10 py-6 bg-dark/95 rounded-t-3xl border-b-2 border-gold/40 shadow-lg">
                <h2 className="text-3xl font-extrabold text-gold tracking-wide text-center w-full">Compare Properties</h2>
                <button
                  className="absolute top-4 right-6 flex items-center justify-center w-14 h-14 bg-gold text-dark rounded-full border-4 border-gold shadow-xl hover:shadow-gold/60 hover:scale-110 hover:rotate-12 transition-all duration-200 text-3xl font-extrabold focus:outline-none"
                  onClick={() => setShowCompareModal(false)}
                  title="Close"
                  style={{ lineHeight: 1 }}
                >
                  <span className="block" style={{ fontFamily: 'inherit', fontWeight: 900, fontSize: '2.2rem', marginTop: '-2px' }}>×</span>
                </button>
              </div>
              <div className="p-10 pt-4 bg-dark-light/80 rounded-b-3xl">
                <div className="overflow-x-auto">
                  <table className="min-w-full align-middle">
                    <thead>
                      <tr>
                        <th className="w-56"></th>
                        {comparedProperties.map((p, idx) => (
                          <th key={p.id} className="text-center align-top px-8 pb-6">
                            <div className="flex flex-col items-center gap-3">
                              <img src={p.image} alt={p.title} className="w-28 h-24 object-cover rounded-xl border-2 border-gold shadow-md" />
                              <div className="text-lg font-extrabold text-gold text-center leading-tight truncate w-48" title={p.title}>{p.title}</div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {compareFields.filter(f => f.key !== 'image').map(field => (
                        <tr key={field.key}>
                          <td className="py-5 pr-8 text-gold font-bold align-middle whitespace-nowrap text-lg flex items-center gap-2">
                            <span className="inline-block">{field.icon}</span>
                            <span>{field.label}</span>
                          </td>
                          {comparedProperties.map((p, idx) => {
                            let value = getFieldValue(p, field.key);
                            if (field.key === 'amenities' && Array.isArray(value)) {
                              value = value.length ? value.map((a: string, i: number) => (
                                <span key={i} className="inline-block bg-gold/90 text-dark font-semibold rounded-full px-4 py-2 mx-1 my-0.5 text-base shadow">{a}</span>
                              )) : <span className="text-gold/40">—</span>;
                            }
                            if (field.key === 'status') {
                              value = value ? <span className="inline-block bg-gold text-dark font-bold rounded-full px-6 py-2 text-base shadow border border-gold/80">{value}</span> : <span className="text-gold/40">—</span>;
                            }
                            if (field.key === 'price' || field.key === 'area') {
                              value = value ? <span className="inline-block bg-gold/80 text-dark font-bold rounded-lg px-6 py-2 text-lg shadow border border-gold/80">{value}</span> : <span className="text-gold/40">—</span>;
                            }
                            if (field.key === 'description') {
                              value = value ? <span className="text-base text-gray-300 font-medium">{value}</span> : <span className="text-gold/40">—</span>;
                            }
                            // Highlight differences
                            const highlight = !isSame(field.key);
                            return (
                              <td
                                key={field.key}
                                className={`px-4 py-4 align-middle transition-all duration-300 ${highlight ? 'border-2 border-gold shadow-lg' : 'border-2 border-gold/30'} bg-dark rounded-xl text-gold font-semibold text-lg min-w-[180px] max-w-[340px] whitespace-pre-line`}
                                tabIndex={0}
                                title={highlight ? 'This value is different' : 'This value is the same'}
                              >
                                <span className="flex flex-wrap items-center justify-center gap-2">{value || <span className="text-gold/40">—</span>}</span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
} 