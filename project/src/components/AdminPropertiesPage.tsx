import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
  status?: string; // Added status field
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
  status: 'Ready to Move', // Default status
};

const AdminPropertiesPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState<Property | null>(null);
  const [form, setForm] = useState<Property>(emptyProperty);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [formError, setFormError] = useState('');

  const allAmenities = ["Parking", "Lift", "Power Backup", "24x7 Security", "Gym", "Swimming Pool", "Clubhouse"];
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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'price' || name === 'bedrooms' || name === 'bathrooms' || name === 'area' || name === 'status' ? Number(value) : value }));
  };

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls = Array.from(files).map(file => URL.createObjectURL(file));
      setForm(prev => ({ ...prev, images: urls }));
    }
  };

  const handleEdit = (property: Property) => {
    setEditing(property);
    setForm({ ...property });
    setShowForm(true);
    setSuccess('');
    setError('');
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    setLoading(true);
    axios.delete(`http://localhost:5000/properties/${id}`)
      .then(() => {
        setSuccess('Property deleted successfully.');
        fetchProperties();
      })
      .catch(() => setError('Failed to delete property.'))
      .finally(() => setLoading(false));
  };

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(form.amenities || []);

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev => prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setFormError('');
    // Only require: title, description, location, type, area
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
          fetchProperties();
        })
        .catch(() => setError('Failed to create property.'))
        .finally(() => setLoading(false));
    }
  };

  const filteredProperties = properties.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.location && p.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-dark text-gold p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Property Management</h1>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <button
          className="bg-gold text-dark px-4 py-2 rounded font-bold hover:bg-gold/80"
          onClick={() => { setShowForm(true); setEditing(null); setForm(emptyProperty); setSuccess(''); setError(''); }}
        >
          + Add New Property
        </button>
        <input
          type="text"
          placeholder="Search by title or location..."
          className="px-3 py-2 rounded border border-gold/30 bg-dark-light text-gold"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {loading && <div className="mb-4 text-gold">Loading...</div>}
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {success && <div className="mb-4 text-green-500">{success}</div>}
      {formError && <div className="mb-3 text-red-500 font-bold">{formError}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-dark-light rounded shadow">
          <thead>
            <tr>
              <th className="p-3 text-center font-bold">Title</th>
              <th className="p-3 text-center font-bold">Type</th>
              <th className="p-3 text-center font-bold">Location</th>
              <th className="p-3 text-center font-bold">Price</th>
              <th className="p-3 text-center font-bold">Bedrooms</th>
              <th className="p-3 text-center font-bold">Bathrooms</th>
              <th className="p-3 text-center font-bold">Area</th>
              <th className="p-3 text-center font-bold">Amenities</th>
              <th className="p-3 text-center font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map(p => (
              <tr key={p._id} className="border-b border-gold/10">
                <td className="p-3 text-center font-semibold">{p.title}</td>
                <td className="p-3 text-center">{p.type}</td>
                <td className="p-3 text-center">{p.location}</td>
                <td className="p-3 text-center">₹{p.price?.toLocaleString()}</td>
                <td className="p-3 text-center">{p.bedrooms}</td>
                <td className="p-3 text-center">{p.bathrooms}</td>
                <td className="p-3 text-center">{p.area}</td>
                <td className="p-3 text-center">{p.amenities?.join(', ')}</td>
                <td className="p-3 text-center flex gap-2 justify-center">
                  <button className="bg-gold text-dark px-2 py-1 rounded hover:bg-gold/80" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <form
            className="bg-dark-light p-10 rounded-xl shadow-lg w-[90vw] max-w-3xl max-h-[90vh] overflow-y-auto mx-auto flex flex-col"
            style={{ position: 'relative', top: '0', marginTop: '5vh' }}
            onSubmit={handleFormSubmit}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">{editing ? 'Edit Property' : 'Add New Property'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block mb-1">Title</label>
                <input type="text" name="title" value={form.title} onChange={handleInput} required className="w-full px-3 py-2 rounded border border-gold/30 bg-dark text-gold" />
              </div>
              {/* Description */}
              <div>
                <label className="block mb-1">Description</label>
                <textarea name="description" value={form.description} onChange={handleInput} required className="w-full px-3 py-2 rounded border border-gold/30 bg-dark text-gold min-h-[40px]" />
              </div>
              {/* Location */}
              <div>
                <label className="block mb-1">Location</label>
                <select name="location" value={form.location} onChange={handleInput} required className="w-full px-3 py-2 rounded border border-gold/30 bg-dark text-gold">
                  <option value="">Select Location</option>
                  {uniqueLocalities.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
              {/* Type */}
              <div>
                <label className="block mb-1">Type of Property</label>
                <select name="type" value={form.type} onChange={handleInput} required className="w-full px-3 py-2 rounded border border-gold/30 bg-dark text-gold">
                  <option value="">Select Type</option>
                  {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              {/* Area */}
              <div>
                <label className="block mb-1">Area (sqft)</label>
                <input type="number" name="area" value={form.area} onChange={handleInput} required className="w-full px-3 py-2 rounded border border-gold/30 bg-dark text-gold" />
              </div>
              {/* Bedrooms */}
              <div>
                <label className="block mb-1">Bedrooms</label>
                <select name="bedrooms" value={form.bedrooms} onChange={handleInput} className="w-full px-3 py-2 rounded border border-gold/30 bg-dark text-gold">
                  <option value="">Select Bedrooms</option>
                  {bhkOptions.map(bhk => <option key={bhk} value={parseInt(bhk)}>{bhk}</option>)}
                </select>
              </div>
              {/* Bathrooms */}
              <div>
                <label className="block mb-1">Bathrooms</label>
                <input type="number" name="bathrooms" value={form.bathrooms} onChange={handleInput} className="w-full px-3 py-2 rounded border border-gold/30 bg-dark text-gold" />
              </div>
              {/* Status */}
              <div>
                <label className="block mb-1">Status</label>
                <select name="status" value={form.status || ''} onChange={handleInput} className="w-full px-3 py-2 rounded border border-gold/30 bg-dark text-gold">
                  <option value="">Select Status</option>
                  {propertyStatuses.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
              </div>
              {/* Price */}
              <div>
                <label className="block mb-1">Price</label>
                <input type="number" name="price" value={form.price} onChange={handleInput} className="w-full px-3 py-2 rounded border border-gold/30 bg-dark text-gold" />
              </div>
              {/* Image URLs */}
              <div className="md:col-span-2">
                <label className="block mb-1">Image URLs (comma separated)</label>
                <input type="text" name="images" value={form.images?.join(',') || ''} onChange={e => setForm(prev => ({ ...prev, images: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} className="w-full px-3 py-2 rounded border border-gold/30 bg-dark text-gold" />
              </div>
              {/* Amenities Multi-Select */}
              <div className="md:col-span-2">
                <label className="block mb-1">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {allAmenities.map(amenity => (
                    <button
                      type="button"
                      key={amenity}
                      onClick={() => handleAmenityChange(amenity)}
                      className={`px-3 py-1.5 text-sm rounded-full border-2 transition-colors ${selectedAmenities.includes(amenity) ? 'bg-gold text-dark border-gold' : 'bg-transparent border-gray-600 hover:border-gold'}`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
              {/* Featured */}
              <div className="md:col-span-2 flex items-center gap-2 mt-2">
                <input type="checkbox" name="isFeatured" checked={!!form.isFeatured} onChange={e => setForm(prev => ({ ...prev, isFeatured: e.target.checked }))} />
                <label>Featured Property</label>
              </div>
            </div>
            {/* Error Message */}
            {formError && <div className="mb-3 text-red-500 font-bold text-center">{formError}</div>}
            {/* Submit/Cancel */}
            <div className="flex gap-4 mt-8 justify-center">
              <button type="submit" className="bg-gold text-dark px-6 py-2 rounded font-bold hover:bg-gold/80" disabled={loading}>{editing ? 'Update' : 'Create'}</button>
              <button type="button" className="bg-dark text-gold border border-gold px-6 py-2 rounded font-bold hover:bg-gold/20" onClick={() => { setShowForm(false); setEditing(null); setForm(emptyProperty); setSelectedAmenities([]); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPropertiesPage; 