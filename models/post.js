var db = require('../db')

module.exports = db.model('Post', {
  username: { type: String, required: true },
  body:     { type: String, required: true },
  date:     { type: Date, required: true, default: Date.now}
})
