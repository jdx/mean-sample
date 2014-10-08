var express    = require('express')
var logger     = require('morgan')

var app = express()
app.use(logger('dev'))
app.use(require('./controllers'))

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('server listening on %d', server.address().port)
})
require('./websockets').connect(server)
