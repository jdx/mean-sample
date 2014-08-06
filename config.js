module.exports = {
  secret:   process.env.SECRET_KEY  || 'supersecretkey',
  mongoUrl: process.env.MONGODB_URL || 'mongodb://localhost/mean-sample'
}
