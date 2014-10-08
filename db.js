var mongoose = require('mongoose')
var url = process.env.MONGODB_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/social'
mongoose.connect(url, function () {
  console.log('mongodb connected')
})
module.exports = mongoose
