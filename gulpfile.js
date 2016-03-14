var gulp = require( 'gulp' ),
  plumber = require( 'gulp-plumber' ),
  watch = require( 'gulp-watch' ),
  livereload = require( 'gulp-livereload' ),
  minifycss = require( 'gulp-minify-css' ),
  jshint = require( 'gulp-jshint' ),
  stylish = require( 'jshint-stylish' ),
  uglify = require( 'gulp-uglify' ),
  rename = require( 'gulp-rename' ),
  notify = require( 'gulp-notify' ),
  include = require( 'gulp-include' ),
  stylus = require('gulp-stylus'),
  rupture = require('rupture'),
  sass = require( 'gulp-sass' );


var server = require('gulp-server-livereload');

var onError = function( err ) {
  console.log( 'An error occurred:', err.message );
  this.emit( 'end' );
}

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: './app/index.html'
    }));
});


gulp.task( 'stylus', function() {
  return gulp.src('stylus/main.styl')
        .pipe(stylus({
          compress: false,
          paths: ['stylus'],
          use: [rupture()]
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./app'))
        .pipe(livereload())
        .pipe(minifycss())
        .pipe( rename( { suffix: '.min' } ) )
        .pipe(gulp.dest('./app'))
        .pipe(livereload())
  /*
    return gulp.src( './scss/style.scss' )
    .pipe( plumber( { errorHandler: onError } ) )
    .pipe( sass() )
    .pipe( gulp.dest( './app' ) )
    .pipe( minifycss() )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( gulp.dest( './app' ) )
    .pipe( livereload() );*/
} );

gulp.task( 'js', function() {
  return gulp.src('js/*.js')
        .pipe(gulp.dest('./app/js'))
        .pipe(livereload())
} );

gulp.task( 'img', function() {
  return gulp.src('img/*')
        .pipe(gulp.dest('./app/img'))
        .pipe(livereload())
} );



gulp.task( 'html', function() {
  return gulp.src('./html/*.html')
        .pipe(gulp.dest('./app'))
        .pipe(livereload())
} );

gulp.task( 'watch', function() {
  livereload.listen();
  gulp.watch( './stylus/*.styl', [ 'stylus' ] );
  gulp.watch( './img/**', [ 'img' ] );
  gulp.watch( './js/**', [ 'js' ] );
  gulp.watch( './html/**/*.html', [ 'html' ] );
  gulp.watch( './app/**/*.html' ).on( 'change', function( file ) {
    livereload.changed( file );
  } );
} );

gulp.task( 'default', [ 'js','stylus', 'img','watch','html' ], function() {

} );