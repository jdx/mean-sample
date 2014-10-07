var router = require('express').Router()

router.use('/api', require('./api'))
router.use('/', require('./static'))

module.exports = router
