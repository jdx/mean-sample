var db = require('../db')
var Post = require('../models/post')

Post.deleteMany({})
.then(() => db.disconnect())

