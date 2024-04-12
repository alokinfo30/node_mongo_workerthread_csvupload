const mongoose = require('mongoose');

const policyCarrierSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique: true, // Ensure unique company names
  },
});

module.exports = mongoose.model('PolicyCarrier', policyCarrierSchema);
