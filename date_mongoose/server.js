const express = require('express');
const mongoose = require('mongoose');
const Example = require('./models/example'); // Assuming your schema is in a separate file
const serveStatic = require('serve-static');

const app = express();

// Middleware to parse URL-encoded data from the form
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.post('/submit-form', async (req, res) => {
  try {
    const { customDate } = req.body;
    
    // Create a new document with the date from the form
    const newExample = new Example({
      customDate: new Date(customDate) // Convert string to Date object
    });

    await newExample.save();

    res.send('Date saved successfully!');
  } catch (error) {
    res.status(500).send('Error saving date: ' + error.message);
  }
});

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000, () => console.log('Server running on port 3000')))
  .catch(error => console.error(error));
