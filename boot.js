'use strict';
var numCpus = require('os').cpus().length
var cluster = require('cluster')

cluster.setupMaster({exec: __dirname + '/server.js'})

// workerIds returns the node cluster index for each worker
function workerIds() { return Object.keys(cluster.workers) }

// Gets the count of active workers
function numWorkers() { return workerIds().length }

var stopping = false

// Forks off the workers unless the server is stopping
function forkNewWorkers() {
  if (!stopping) {
    for (var i = numWorkers(); i < numCpus; i++) { cluster.fork() }
  }
}

// A list of workers queued for a restart
var workersToStop = []

// Stops a single worker
// Gives 60 seconds after disconnect before SIGTERM
function stopWorker(worker) {
  console.log('stopping', worker.process.pid)
  worker.disconnect()
  var killTimer = setTimeout(function() {
    worker.kill()
  }, 60000)

  // Ensure we don't stay up just for this setTimeout
  killTimer.unref()
}

// Tell the next worker queued to restart to disconnect
// This will allow the process to finish it's work
// for 60 seconds before sending SIGTERM
function stopNextWorker() {
  var i = workersToStop.pop()
  var worker = cluster.workers[i]
  if (worker) stopWorker(worker)
}

// Stops all the works at once
function stopAllWorkers() {
  stopping = true
  console.log('stopping all workers')
  workerIds().forEach(function (id) {
    stopWorker(cluster.workers[id])
  })
}

// Worker is now listening on a port
// Once it is ready, we can signal the next worker to restart
cluster.on('listening', stopNextWorker)

// A worker has disconnected either because the process was killed
// or we are processing the workersToStop array restarting each process
// In either case, we will fork any workers needed
cluster.on('disconnect', forkNewWorkers)

// HUP signal sent to the master process to start restarting all the workers sequentially
process.on('SIGHUP', function() {
  console.log('restarting all workers')
  workersToStop = workerIds()
  stopNextWorker()
})

// Kill all the workers at once
process.on('SIGTERM', stopAllWorkers)

// Fork off the initial workers
forkNewWorkers()
console.log('app master', process.pid, 'booted')
