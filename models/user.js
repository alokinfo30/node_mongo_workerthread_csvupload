const mongoose = require('mongoose');
const { Schema, Types } = mongoose; // Import Schema and Types for flexibility

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: { // Add last name field
    type: String,
  },
  DOB: { // Use Date type for DOB
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure unique emails
  },
  gender: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  // Optional: Add a reference to UserAccount model (if needed for relationships)
  // userAccountId: {
  //   type: Types.ObjectId,
  //   ref: 'UserAccount',
  // },
});

module.exports = mongoose.model('User', userSchema);
