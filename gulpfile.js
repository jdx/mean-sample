var gulp = require('gulp')
var fs   = require('fs')
fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
  require('./gulp/' + task)
})

gulp.task('build', ['js', 'css'])
gulp.task('watch', ['watch:js', 'watch:css'])
gulp.task('dev', ['watch', 'dev:server'])
