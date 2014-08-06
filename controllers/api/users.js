var router = require('express').Router()
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var User = require('../../models/user')
var config = require('../../config')
var auth = require('../../auth')

router.post('/', function (req, res, next) {
  var user = new User({username: req.body.username})
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) { return next(err) }
    user.password = hash
    user.save(function (err) {
      if (err) { return next(err) }
      res.status(201).end()
    })
  })
})

router.use(auth.required)

router.get('/', function (req, res, next) {
  jwt.verify(req.headers['x-auth'], config.secret, function (err, auth) {
    if (err) { return next(err) }
    User.findOne({username: auth.username}, function (err, user) {
      if (err) { return next(err) }
      res.json(user)
    })
  })
})

module.exports = router
