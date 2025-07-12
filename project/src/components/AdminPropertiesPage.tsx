import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  Star, 
  MapPin, 
  Home, 
  Bed, 
  Bath, 
  Ruler, 
  X,
  Save,
  AlertCircle,
  CheckCircle,
  Loader,
  Grid,
  List,
  SortAsc,
  SortDesc,
  Calendar,
  DollarSign,
  Building
} from 'lucide-react';

interface Property {
  _id?: string;
  title: string;
  description?: string;
  price: number;
  location: string;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  images?: string[];
  amenities?: string[];
  isFeatured?: boolean;
  status?: string;
  createdAt?: string;
}

const emptyProperty: Property = {
  title: '',
  description: '',
  price: 0,
  location: '',
  type: '',
  bedrooms: 1,
  bathrooms: 1,
  area: 0,
  images: [],
  amenities: [],
  isFeatured: false,
  status: 'Ready to Move',
};

const AdminPropertiesPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState<Property | null>(null);
  const [form, setForm] = useState<Property>(emptyProperty);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [formError, setFormError] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const allAmenities = ["Parking", "Lift", "Power Backup", "24x7 Security", "Gym", "Swimming Pool", "Clubhouse", "Garden", "Playground", "CCTV", "Water Supply", "Maintenance"];
  const propertyTypes = ['House/Villa', 'Flat', 'Office Space', 'Shop/Showroom', 'Warehouse/Godown', 'Farm House', 'PG/Co-living'];
  const propertyStatuses = ['Ready to Move', 'Under Construction', 'New Launch'];
  const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '+5 BHK'];
  const coimbatoreLocalities = [
    "RS Puram", "Gandhipuram", "Saibaba Colony", "Peelamedu", "Singanallur",
    "Ramanathapuram", "Saravanampatti", "Kalapatti", "Vadavalli", "Kovaipudur",
    "Thudiyalur", "Ukkadam", "Podanur", "Ganapathy", "Race Course",
    "Town Hall", "Eachanari", "Chinnavedampatti", "Neelambur", "Kuniyamuthur"
  ];
  const uniqueLocalities = ["Coimbatore", ...Array.from(new Set(coimbatoreLocalities))];

  const fetchProperties = () => {
    setLoading(true);
    setError('');
    axios.get('http://localhost:5000/properties')
      .then(res => {
        setProperties(res.data);
        setFilteredProperties(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch properties.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Filter and sort properties
  useEffect(() => {
    let filtered = properties.filter(p =>
      (p.title?.toLowerCase().includes(search.toLowerCase()) || '') ||
      (p.location?.toLowerCase().includes(search.toLowerCase()) || '')
    );

    if (filterType !== 'all') {
      if (filterType === 'featured') {
        filtered = filtered.filter(p => p.isFeatured);
      } else {
        filtered = filtered.filter(p => p.type === filterType);
      }
    }

    // Sort properties
    filtered.sort((a, b) => {
      let aValue = a[sortBy as keyof Property];
      let bValue = b[sortBy as keyof Property];
      
      if (sortBy === 'price') {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProperties(filtered);
  }, [properties, search, filterType, sortBy, sortOrder]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]: ['price', 'bedrooms', 'bathrooms', 'area'].includes(name) ? Number(value) : value 
    }));
  };

  const handleEdit = (property: Property) => {
    setEditing(property);
    setForm({ ...property });
    setSelectedAmenities(property.amenities || []);
    setShowForm(true);
    setSuccess('');
    setError('');
    setFormError('');
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    setLoading(true);
    axios.delete(`http://localhost:5000/properties/${id}`)
      .then(() => {
        setSuccess('Property deleted successfully.');
        setShowDeleteModal(null);
        fetchProperties();
      })
      .catch(() => setError('Failed to delete property.'))
      .finally(() => setLoading(false));
  };

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setFormError('');

    if (!form.title.trim() || !form.description?.trim() || !form.location.trim() || !form.type.trim() || !form.area) {
      setFormError('Please fill all required fields: Title, Description, Location, Type, and Area.');
      setLoading(false);
      return;
    }

    const data = { ...form, amenities: selectedAmenities };
    
    if (editing && editing._id) {
      axios.put(`http://localhost:5000/properties/${editing._id}`, data)
        .then(() => {
          setSuccess('Property updated successfully.');
          setShowForm(false);
          setEditing(null);
          setForm(emptyProperty);
          setSelectedAmenities([]);
          fetchProperties();
        })
        .catch(() => setError('Failed to update property.'))
        .finally(() => setLoading(false));
    } else {
      axios.post('http://localhost:5000/properties', data)
        .then(() => {
          setSuccess('Property created successfully.');
          setShowForm(false);
          setForm(emptyProperty);
          setSelectedAmenities([]);
          fetchProperties();
        })
        .catch(() => setError('Failed to create property.'))
        .finally(() => setLoading(false));
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const PropertyCard = ({ property }: { property: Property }) => (
    <div className="bg-dark-light rounded-2xl shadow-premium border border-gold/20 overflow-hidden group hover:shadow-premium-lg transition-all duration-300 hover:border-gold/40">
      <div className="relative">
        {property.images && property.images.length > 0 && (
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.isFeatured && (
            <span className="bg-gold text-dark px-2 py-1 rounded-full text-xs font-bold animate-pulse">
              <Star className="w-3 h-3 inline mr-1" />
              Featured
            </span>
          )}
          <span className="bg-dark/80 text-gold px-2 py-1 rounded-full text-xs font-semibold">
            {property.status}
          </span>
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-1">
            <button
              onClick={() => handleEdit(property)}
              className="bg-gold/90 text-dark p-2 rounded-full hover:bg-gold transition-colors"
              title="Edit Property"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDeleteModal(property._id || '')}
              className="bg-red-500/90 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              title="Delete Property"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gold mb-2 line-clamp-2">{property.title}</h3>
        <div className="flex items-center text-gold/80 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-gold">{formatPrice(property.price)}</span>
          <span className="bg-gold/20 text-gold px-2 py-1 rounded-full text-xs font-semibold">
            {property.type}
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gold/70 mb-3">
          {property.bedrooms && (
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          {property.area && (
            <div className="flex items-center">
              <Ruler className="w-4 h-4 mr-1" />
              <span>{property.area} sqft</span>
            </div>
          )}
        </div>
        
        {property.amenities && property.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {property.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="bg-dark text-gold px-2 py-1 rounded text-xs">
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-gold/60 text-xs">+{property.amenities.length - 3} more</span>
            )}
          </div>
        )}
        
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(property)}
            className="flex-1 bg-gold text-dark py-2 px-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors flex items-center justify-center gap-1"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => setShowDeleteModal(property._id || '')}
            className="bg-red-500 text-white py-2 px-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark text-white font-lexend">
      {/* Header */}
      <div className="bg-dark-light border-b border-gold/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gold gold-shimmer">Property Management</h1>
              <p className="text-gold/70 mt-1">Manage your property listings</p>
            </div>
            <button
              onClick={() => {
                setShowForm(true);
                setEditing(null);
                setForm(emptyProperty);
                setSelectedAmenities([]);
                setSuccess('');
                setError('');
                setFormError('');
              }}
              className="bg-gold text-dark px-6 py-3 rounded-xl font-bold hover:bg-gold/90 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Add New Property
            </button>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-dark-light/50 border-b border-gold/10 sticky top-[88px] z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark border border-gold/30 rounded-xl text-white placeholder-gold/60 focus:outline-none focus:border-gold transition-all"
              />
            </div>

            {/* Filters and Controls */}
            <div className="flex items-center gap-3">
              {/* Filter by Type */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-dark border border-gold/30 rounded-lg px-3 py-2 text-gold focus:outline-none focus:border-gold"
              >
                <option value="all">All Types</option>
                <option value="featured">Featured Only</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-dark border border-gold/30 rounded-lg px-3 py-2 text-gold focus:outline-none focus:border-gold"
              >
                <option value="createdAt">Date Created</option>
                <option value="title">Title</option>
                <option value="price">Price</option>
                <option value="location">Location</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="bg-dark border border-gold/30 rounded-lg p-2 text-gold hover:bg-gold/10 transition-colors"
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
              </button>

              {/* View Mode Toggle */}
              <div className="flex bg-dark border border-gold/30 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-gold text-dark' : 'text-gold hover:bg-gold/10'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-gold text-dark' : 'text-gold hover:bg-gold/10'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2 text-gold/80">
              <Building className="w-4 h-4" />
              <span>Total: {properties.length}</span>
            </div>
            <div className="flex items-center gap-2 text-gold/80">
              <Star className="w-4 h-4" />
              <span>Featured: {properties.filter(p => p.isFeatured).length}</span>
            </div>
            <div className="flex items-center gap-2 text-gold/80">
              <Filter className="w-4 h-4" />
              <span>Filtered: {filteredProperties.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {loading && (
        <div className="bg-blue-500/20 border border-blue-500/30 text-blue-300 px-4 py-3 mx-6 mt-4 rounded-lg flex items-center gap-2">
          <Loader className="w-5 h-5 animate-spin" />
          Loading...
        </div>
      )}
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 mx-6 mt-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/20 border border-green-500/30 text-green-300 px-4 py-3 mx-6 mt-4 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {success}
        </div>
      )}

      {/* Properties Grid/List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <Building className="w-16 h-16 text-gold/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gold/70 mb-2">No Properties Found</h3>
            <p className="text-gold/50">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-4"
          }>
            {filteredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>

      {/* Property Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-dark-light rounded-2xl shadow-2xl border-2 border-gold/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-dark-light border-b border-gold/20 px-8 py-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gold">
                {editing ? 'Edit Property' : 'Add New Property'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                  setForm(emptyProperty);
                  setSelectedAmenities([]);
                  setFormError('');
                }}
                className="text-gold hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-8">
              {formError && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 mb-6 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-gold font-semibold mb-2">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleInput}
                    required
                    className="w-full px-4 py-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition-all"
                    placeholder="Enter property title"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-gold font-semibold mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleInput}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition-all resize-none"
                    placeholder="Enter property description"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-gold font-semibold mb-2">
                    Location *
                  </label>
                  <select
                    name="location"
                    value={form.location}
                    onChange={handleInput}
                    required
                    className="w-full px-4 py-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition-all"
                  >
                    <option value="">Select Location</option>
                    {uniqueLocalities.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-gold font-semibold mb-2">
                    Property Type *
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleInput}
                    required
                    className="w-full px-4 py-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition-all"
                  >
                    <option value="">Select Type</option>
                    {propertyTypes.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-gold font-semibold mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleInput}
                    className="w-full px-4 py-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition-all"
                    placeholder="Enter price"
                  />
                </div>

                {/* Area */}
                <div>
                  <label className="block text-gold font-semibold mb-2">
                    Area (sqft) *
                  </label>
                  <input
                    type="number"
                    name="area"
                    value={form.area}
                    onChange={handleInput}
                    required
                    className="w-full px-4 py-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition-all"
                    placeholder="Enter area"
                  />
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-gold font-semibold mb-2">
                    Bedrooms
                  </label>
                  <select
                    name="bedrooms"
                    value={form.bedrooms}
                    onChange={handleInput}
                    className="w-full px-4 py-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition-all"
                  >
                    <option value="">Select Bedrooms</option>
                    {bhkOptions.map(bhk => (
                      <option key={bhk} value={parseInt(bhk)}>{bhk}</option>
                    ))}
                  </select>
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="block text-gold font-semibold mb-2">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={form.bathrooms}
                    onChange={handleInput}
                    className="w-full px-4 py-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition-all"
                    placeholder="Number of bathrooms"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-gold font-semibold mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={form.status || ''}
                    onChange={handleInput}
                    className="w-full px-4 py-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition-all"
                  >
                    <option value="">Select Status</option>
                    {propertyStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                {/* Image URLs */}
                <div className="md:col-span-2">
                  <label className="block text-gold font-semibold mb-2">
                    Image URLs (comma separated)
                  </label>
                  <input
                    type="text"
                    name="images"
                    value={form.images?.join(',') || ''}
                    onChange={e => setForm(prev => ({ 
                      ...prev, 
                      images: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                    }))}
                    className="w-full px-4 py-3 bg-dark border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition-all"
                    placeholder="Enter image URLs separated by commas"
                  />
                </div>

                {/* Amenities */}
                <div className="md:col-span-2">
                  <label className="block text-gold font-semibold mb-3">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {allAmenities.map(amenity => (
                      <button
                        type="button"
                        key={amenity}
                        onClick={() => handleAmenityChange(amenity)}
                        className={`px-4 py-2 text-sm rounded-lg border-2 transition-all ${
                          selectedAmenities.includes(amenity)
                            ? 'bg-gold text-dark border-gold'
                            : 'bg-transparent border-gold/30 text-gold hover:border-gold'
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Featured */}
                <div className="md:col-span-2 flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={!!form.isFeatured}
                    onChange={e => setForm(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    className="w-5 h-5 text-gold bg-dark border-gold/30 rounded focus:ring-gold focus:ring-2"
                  />
                  <label className="text-gold font-semibold">
                    Mark as Featured Property
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gold/20">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gold text-dark px-6 py-3 rounded-lg font-bold hover:bg-gold/90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  {editing ? 'Update Property' : 'Create Property'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                    setForm(emptyProperty);
                    setSelectedAmenities([]);
                    setFormError('');
                  }}
                  className="px-6 py-3 bg-dark border border-gold text-gold rounded-lg font-bold hover:bg-gold/10 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-dark-light rounded-2xl shadow-2xl border-2 border-red-500/30 p-8 max-w-md w-full">
            <div className="text-center">
              <div className="bg-red-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Delete Property</h3>
              <p className="text-gold/70 mb-6">
                Are you sure you want to delete this property? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 px-4 py-2 bg-dark border border-gold text-gold rounded-lg font-semibold hover:bg-gold/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteModal)}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPropertiesPage;