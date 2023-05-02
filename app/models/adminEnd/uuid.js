const mongoose = require('mongoose');

const uuidSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true
  }
});

const UUID = mongoose.model('UUID', uuidSchema);

module.exports = UUID;
