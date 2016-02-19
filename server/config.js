var mongoose = require('mongoose');
var path = require('path');

mongoUri = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/tripplanner';

mongoose.connect(mongoUri);

var db = mongoose.connection;


module.exports = db;