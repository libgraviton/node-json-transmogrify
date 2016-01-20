var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
 
gulp.task('default', function () {
  return gulp.src('spec/test.js')
    // gulp-jasmine works on filepaths so you can't have any plugins before it 
    .pipe(jasmine());
});
