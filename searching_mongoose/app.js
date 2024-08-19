// app.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/autocomplete');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
const autocompleteRouter = require('./routes/autocomplete');
app.use('/autocomplete', autocompleteRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
