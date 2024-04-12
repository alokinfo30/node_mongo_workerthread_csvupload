const mongoose = require('mongoose');

const UserAccountSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },
  // Optional: Add a reference to User model (if needed for relationships)
  // userId: {
  //   type: Types.ObjectId,
  //   ref: 'User',
  // },
});

module.exports = mongoose.model('UserAccount', UserAccountSchema);
