'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var gulpIf = require('gulp-if');
var del = require('del');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require ('autoprefixer');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function() {
  return gulp.src('src/sass/style.sass')
  .pipe(gulpIf(isDevelopment, sourcemaps.init()))
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
    ]))
  .pipe(minify())
  .pipe(gulpIf(isDevelopment, sourcemaps.write()))
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('public/css'));

});

gulp.task('js', function () {
    return gulp.src('src/assets/js/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('public/js'));
  });

gulp.task('images', function() {
  return gulp.src('src/assets/img/*.{png,jpg,svg}')
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
    ]))
  .pipe(gulp.dest('src/assets/img'));
})

gulp.task('assets', function() {
  return gulp.src('src/assets/**')
  .pipe(gulp.dest('public'));
})

gulp.task('clean', function() {
  return del('public');
});

gulp.task('build', gulp.series('clean', 'images', gulp.parallel('styles', 'assets')));

gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.*', gulp.series('styles'));
  gulp.watch('src/assets/**/*.*', gulp.series('assets'));
})

gulp.task('serve', function() {
  browserSync.init({
    server: ''
  });
  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
}); 

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));