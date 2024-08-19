const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/FORM')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a schema and model
const dataSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Data = mongoose.model('Data', dataSchema);
app.use(express.static('public')); 
// Middleware to parse JSON
app.use(express.json());

// API endpoint to fetch data
app.get('/api/data', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API endpoint to update data
app.put('/api/data/:id', async (req, res) => {
    try {
        const { name, age } = req.body;
        const updatedData = await Data.findByIdAndUpdate(req.params.id, { name, age }, { new: true });
        res.json(updatedData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
