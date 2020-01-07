var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/z2fc4u', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose;