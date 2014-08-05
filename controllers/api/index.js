var router = require('express').Router()

router.use('/posts',    require(__dirname + '/posts'))
router.use('/sessions', require(__dirname + '/sessions'))
router.use('/users',    require(__dirname + '/users'))

router.get('*', function (req, res) {
  res.status(404).end()
})

module.exports = router
