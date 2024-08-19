// routes/autocomplete.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Autocomplete endpoint
router.get('/', async (req, res) => {
  try {
    const query = req.query.q || '';
    const users = await User.find({ name: { $regex: `^${query}`, $options: 'i' } }).limit(10);
    res.json(users);
  } catch (err) {
    res.status(500).send('Error fetching autocomplete results');
  }
});

module.exports = router;
