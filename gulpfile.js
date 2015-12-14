var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var minifyCss = require('gulp-minify-css');

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title : 'Compile Error',
    message : '<%= error.message %>'
  }).apply(this, args);
  //console.log('Compile error: ', args);
  this.emit('end'); //keeps gulp from hanging on this task
}

function buildScript(file, watch) {
  var props = {
    entries : ['./js/' + file],
    debug : true,
    transform : babelify.configure({
                presets: ["react", "es2015"]
                })
  };

  //watchify if watch set to true. otherwise browserify once
  var bundler =
    watch ? watchify(browserify(props)) : browserify(props);

  function rebundle(){
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('./build/'));
  }

  bundler.on('update', function() {
    var updateStart = Date.now();
    rebundle();
    console.log('Updated!', (Date.now() - updateStart) + 'ms');
  })

  // run it once the first time buildScript is called
  return rebundle();
}

// run once
gulp.task('scripts', function() {
  return buildScript('./../src/test.jsx', false);
});

//bundle css
gulp.task('css', function() {
  return gulp.src('./css/style.css')
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(minifyCss())
    .pipe(gulp.dest('dist'));
});

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['scripts','css'], function() {
  gulp.watch(['./css/*.css'],['css']);
  return buildScript('./../src/test.jsx', true);
});
