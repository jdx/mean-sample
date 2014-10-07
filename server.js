var express    = require('express')
var bodyParser = require('body-parser')
var logger     = require('morgan')

var app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(require('./controllers'))

var server = app.listen(3000, function () {
  console.log('server listening on %d', server.address().port)
})
