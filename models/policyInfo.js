const mongoose = require('mongoose');
const { Schema, Types } = mongoose; // Import Schema and Types for flexibility

const policyInfoSchema = new Schema({
  policyNumber: {
    type: String,
    required: true,
    unique: true, // Ensure unique policy numbers
  },
  policyStartDate: {
    type: Date,
    required: true,
  },
  policyEndDate: {
    type: Date,
    required: true,
  },
  policyCategory: {
    type: Types.ObjectId,
    ref: 'PolicyCategory', // Reference the PolicyCategory model
    required: true,
  },
  collectionId: {
    type: Number,
    required: true,
  },
  companyCollectionId: {
    type: String,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true,
  },
});

module.exports = mongoose.model('PolicyInfo', policyInfoSchema);
