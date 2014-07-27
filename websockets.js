'use strict';
var _ = require('lodash')
var ws = require('ws')

var clients = []

exports.connect = function (app) {
  var wss = new ws.Server({server: app})

  wss.on('connection', function (ws) {
    console.log('Client connected')
    clients.push(ws)
    ws.on('message', function (data) {
      console.log('msg:', data)
    })

    ws.on('close', function () {
      console.log('Client disconnected')
      _.remove(clients, ws)
    })
  })
}

exports.broadcast = function (topic, data) {
  var json = JSON.stringify({topic: topic, data: data})
  clients.forEach(function (client) {
    client.send(json)
  })
}
