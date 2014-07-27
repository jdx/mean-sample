var redis = require('redis')
var client = redis.createClient()

exports.publish = function (topic, data) {
  client.publish(topic, JSON.stringify(data))
}

exports.subscribe = function (topic, cb) {
  var client = redis.createClient()
  client.subscribe(topic)
  client.on('message', function (channel, message) {
    cb(JSON.parse(message))
  })
}
