var redis = require('redis-url')
var client = redis.connect()

exports.publish = function (topic, data) {
  client.publish(topic, JSON.stringify(data))
}

exports.subscribe = function (topic, cb) {
  var client = redis.connect()
  client.subscribe(topic)
  client.on('message', function (channel, message) {
    cb(JSON.parse(message))
  })
}
