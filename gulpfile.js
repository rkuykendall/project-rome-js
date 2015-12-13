/*eslint-disable no-var, no-console, vars-on-top*/

var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var fs = require('fs');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var ghPages = require('gulp-gh-pages');

var webpackConfig = require('./webpack.config.js')

gulp.task('serve', function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack(webpackConfig);

    new WebpackDevServer(compiler, {
        contentBase: './',
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
