var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var websockets = require('./websockets')

var app = express()
app.use(bodyParser.json())
app.use(logger('dev'))

app.use(require('./auth'))
app.use('/api', require('./controllers/api'))
app.use(require('./controllers/static'))

var server = app.listen(3000, function () {
  console.log('Server', process.pid, 'listening on', server.address().port)
})
websockets.connect(server)
