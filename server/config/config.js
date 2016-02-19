var mongoose = require('mongoose');
var path = require('path');

mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/tp';

mongoose.connect(mongoUri);

var db = mongoose.connection;


module.exports = db;