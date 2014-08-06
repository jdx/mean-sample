var db = require('../db')

module.exports = db.model('User', {
  username: { type: String, required: true },
  password: { type: String, required: true, select: false}
})
