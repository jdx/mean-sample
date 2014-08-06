var config = require('./config')
var mongoose = require('mongoose')
var db = mongoose.createConnection(config.mongoUrl)
module.exports = db
