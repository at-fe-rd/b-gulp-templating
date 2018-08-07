const gulp = require('gulp');
const minifyCSS = require('gulp-csso');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
const ejs = require('gulp-ejs');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const runSequence = require('run-sequence');

const plugins = gulpLoadPlugins();

gulp.task('html', () => gulp.src('views/pages/*.ejs')
  .pipe(ejs({}, {}, { ext: '.html' }))
  .pipe(gulp.dest('dist/')));

gulp.task('clean', () => del.sync(['dist/**', '!dist']));

gulp.task('assets', () => gulp.src('assets/**/*.*')
  .pipe(gulp.dest('dist/assets')));

gulp.task('css', () => gulp.src('stylesheet/scss/styles.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCSS())
  .pipe(gulp.dest('dist/css')));

gulp.task('js', () => gulp.src('js/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(concat('app.min.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/js')));

gulp.task('watch', () => {
  gulp.watch('stylesheet/scss/**/*.scss', ['css']);
  gulp.watch('js/**/*.js', ['js']);
  gulp.watch('views/**/*.ejs', ['html']);
  gulp.watch('assets/**/*.*', ['assets']);
});

gulp.task('nodemon', ['html', 'css', 'js', 'assets', 'watch'], () => {
  plugins.nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
    tasks: ['html', 'css', 'js', 'assets', 'watch'],
  });
});

gulp.task('serve', ['clean'], () => runSequence('nodemon'));
