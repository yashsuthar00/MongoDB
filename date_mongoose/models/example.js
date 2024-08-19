const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  // Other fields...
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the field to the current date and time
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  customDate: {
    type: Date,
    required: true, // Makes the date required
  }
});

const Example = mongoose.model('Example', exampleSchema);

module.exports = Example;
