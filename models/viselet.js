const mongoose = require('mongoose');
const db = require('../config/db');

const Viselet = db.model('Viselet', {
  name: String,
  region: String,
  color: String,
  _ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tancos'
  },
  user: mongoose.Types.ObjectId
});

module.exports = Viselet;