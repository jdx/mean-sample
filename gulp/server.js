var gulp = require('gulp')
var nodemon = require('gulp-nodemon')

gulp.task('dev:server', function () {
  nodemon({
    script: 'boot.js',
    ext:    'js',
    ignore: ['ng*', 'gulp*', 'assets*']
  })
})
