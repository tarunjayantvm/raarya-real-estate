require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Example route
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const Test = require('./models/Test');
const Property = require('./models/Property');

// CREATE
app.post('/test', async (req, res) => {
  try {
    const test = new Test({ name: req.body.name });
    await test.save();
    res.status(201).json(test);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
app.get('/test', async (req, res) => {
  const tests = await Test.find();
  res.json(tests);
});

// UPDATE
app.put('/test/:id', async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    res.json(test);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete('/test/:id', async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// CREATE Property
app.post('/properties', async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL Properties
app.get('/properties', async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

// READ ONE Property
app.get('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE Property
app.put('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE Property
app.delete('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});