var express = require('express')
var jwt     = require('jwt-simple')
var bcrypt  = require('bcrypt')
var User    = require('./user')

var app     = express()
app.use(require('body-parser').json())

var secretKey = 'supersecretkey'

app.post('/session', function (req, res, next) {
  var username = req.body.username
  User.findOne({username: username})
  .select('password')
  .exec(function (err, user) {
    if (err) { return next(err) }
    if (!user) { return res.sendStatus(401) }
    bcrypt.compare(req.body.password, user.password, function (err, valid) {
      if (err) { return next(err) }
      if (!valid) { return res.sendStatus(401) }
      var token = jwt.encode({username: username}, secretKey)
      res.json(token)
    })
  })
})

app.get('/user', function (req, res, next) {
  var token = req.headers['x-auth']
  var auth  = jwt.decode(token, secretKey)
  User.findOne({username: auth.username}, function (err, user) {
    if (err) { return next(err) }
    if (!user) { return res.sendStatus(401) }
    res.json(user)
  })
})

app.post('/user', function (req, res, next) {
  var user = new User({username: req.body.username})
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    user.password = hash
    user.save(function (err) {
      if (err) { next(err) }
      res.sendStatus(201)
    })
  })
})

app.listen(3000)
