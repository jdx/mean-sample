var jwt = require('jsonwebtoken')
var config = require('./config')

module.exports = function (req, res, next) {
  if (req.headers['x-auth']) {
    req.auth = jwt.verify(req.headers['x-auth'], config.secret, function (err, auth) {
      if (err) { return next(err) }
      req.auth = auth
      next()
    })
  } else {
    next()
  }
}

module.exports.required = function (req, res, next) {
  if (!req.auth) {
    return res.status(401).end()
  } else {
    next()
  }
}
