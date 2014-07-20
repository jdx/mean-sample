var express = require('express')
var router = express.Router()

router.use(express.static(__dirname + '/../assets'))
router.use(express.static(__dirname + '/../templates'))

router.get('*', function (req, res) {
  res.sendfile('layouts/app.html')
})

module.exports = router
