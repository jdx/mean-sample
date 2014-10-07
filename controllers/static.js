var express = require('express')
var router  = express.Router()

router.use(express.static(__dirname + '/../assets'))

router.get('/', function (req, res) {
  // render/ejs is now easier to use since
  // sendFile has security restrictions on relative pathing
  res.render('app.html.ejs')
})

module.exports = router
