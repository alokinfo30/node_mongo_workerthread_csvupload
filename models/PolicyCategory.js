const mongoose = require('mongoose');

const PolicyCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true, // Ensure unique category names
  },
});

module.exports = mongoose.model('PolicyCategory', PolicyCategorySchema);