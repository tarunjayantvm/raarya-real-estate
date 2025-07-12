const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true }, // e.g., Apartment, Villa, Plot, Commercial
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  area: { type: Number }, // in sq ft or sq m
  images: [String], // array of image URLs
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema); 