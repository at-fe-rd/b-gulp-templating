var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
var ejs = require('gulp-ejs');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
const runSequence = require('run-sequence');

const plugins = gulpLoadPlugins();

gulp.task('html', function(){
  return gulp.src('views/pages/*.ejs')
   .pipe(ejs({}, {}, {ext:'.html'}))
   .pipe(gulp.dest('dist/'))
});

gulp.task('clean', () =>
  del.sync(['dist/**', '!dist'])
);

gulp.task('assets', function(){
  return gulp.src('assets/**/*.*')
    .pipe(gulp.dest('dist/assets'))
});

gulp.task('css', function(){
  return gulp.src('stylesheet/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function(){
  return gulp.src('js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('watch', function() { 
  gulp.watch('stylesheet/scss/**/*.scss', ['css']);
  gulp.watch('js/**/*.js', ['js']);
  gulp.watch('views/**/*.ejs', ['html']); 
  gulp.watch('assets/**/*.*', ['assets']); 
});

gulp.task('nodemon',['html', 'css', 'js', 'assets', 'watch'], function() {
  plugins.nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
    tasks: ['html', 'css', 'js', 'assets', 'watch']
  })
});

gulp.task('serve', ['clean'], () => runSequence('nodemon'));
