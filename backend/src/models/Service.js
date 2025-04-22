const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ['Operational', 'Degraded Performance', 'Partial Outage', 'Major Outage'],
    default: 'Operational'
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
