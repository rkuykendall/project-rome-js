/*eslint-disable no-var, no-console, vars-on-top*/

var gulp = require('gulp');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var fs = require('fs');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var ghPages = require('gulp-gh-pages');

var webpackConfig = require('./webpack.config.js')

gulp.task('test', function(callback) {
  return true;
});

gulp.task('serve', function(callback) {
    gulp
      .src('index.html')
      .pipe(watch('index.html'))
      .pipe(gulp.dest('build'));

    gulp
      .src('index.css')
      .pipe(watch('index.css'))
      .pipe(gulp.dest('build'));

    gulp
      .src(['data/**/*'])
      .pipe(watch(['data/**/*']))
      .pipe(gulp.dest('build/data'));

    // Start a webpack-dev-server
    var compiler = webpack(webpackConfig);

    new WebpackDevServer(compiler, {
        contentBase: './build/',
        hot: true,
        watchOptions: {
            aggregateTimeout: 100,
            poll: 300
        },
        noInfo: false
    }).listen(8000, 'localhost', function(err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);

        // Server listening
        gutil.log('[webpack-dev-server]', 'http://localhost:8000/');

        // keep the server alive or continue?
        // callback();
    });
});

gulp.task('pack', function() {
  gulp
    .src('index.css')
    .pipe(gulp.dest('build'))

  gulp
    .src('CNAME')
    .pipe(gulp.dest('build'))

  gulp
    .src('index.html')
    .pipe(gulp.dest('build'))

  gulp
    .src(['data/**/*'])
    .pipe(gulp.dest('build/data'));

  // run webpack
  webpack(webpackConfig, function(err, stats) {
      if (err) throw new gutil.PluginError('webpack', err);
      gutil.log('[webpack]', stats.toString());
  });
});

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});
