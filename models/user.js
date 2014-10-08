var db = require('../db')
var user = db.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, select: false }
})
module.exports = db.model('User', user)
