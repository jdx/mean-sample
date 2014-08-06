var gulp = require('gulp')

var fs = require('fs')
fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
  require('./gulp/' + task)
})

gulp.task('build', ['js', 'css'])
gulp.task('default', ['watch:css', 'watch:js', 'dev:server'])
