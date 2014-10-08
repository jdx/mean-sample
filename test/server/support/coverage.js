var path = require('path')
var blanket = require('blanket')

blanket({
  pattern: [
    path.resolve(__dirname, '../../../controllers')
  ]
})
