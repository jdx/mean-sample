var express = require('express')
var jwt     = require('jwt-simple')
var _       = require('lodash')

var app     = express()
app.use(require('body-parser').json())

var users = [{username: 'dickeyxxx', password: 'pass'}]
var secretKey = 'supersecretkey'

function findUserByUsername (username) {
  return _.find(users, {username: username})
}

function validateUser (user, password) {
  return user.password === password
}

app.post('/session', function (req, res) {
  var user = findUserByUsername(req.body.username)
  if (!validateUser(user, req.body.password)) {
    return res.sendStatus(401)
  }
  var token = jwt.encode({username: user.username}, secretKey)
  res.json(token)
})

app.get('/user', function (req, res) {
  var token = req.headers['x-auth']
  var user  = jwt.decode(token, secretKey)
  // TODO: pull user info from database
  res.json(user)
})

app.listen(3000)
