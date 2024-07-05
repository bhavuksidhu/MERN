const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  date: Date,
  startHour: Number,  
  endHour: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Availability', availabilitySchema);