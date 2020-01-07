const mongoose = require('mongoose');
const db = require('../config/db');

const Tancos = db.model('Tancos', {
  name: String,
  sex: String,
  year: Number,
  month: Number,
  day: Number,
  user: mongoose.Types.ObjectId
});

module.exports = Tancos;