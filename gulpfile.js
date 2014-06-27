var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')

gulp.task('js', function () {
  gulp.src(['ng/module.js', 'ng/**/*.js'])
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('assets'))
})

gulp.task('watch:js', ['js'], function () {
  gulp.watch('ng/**/*.js', ['js'])
})
