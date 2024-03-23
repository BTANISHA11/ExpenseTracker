const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  createdAt : {
    type: Date,
    default: new Date()
  }
});

// Export the User model directly
module.exports = model('User', userSchema);
