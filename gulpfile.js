var gulp = require('gulp'),
    serve = require('gulp-serve'),
    concat = require('gulp-concat'),
    del = require('del'),
    browserify  = require('browserify'),
    source = require('vinyl-source-stream'),
    open = require('gulp-open'),
    jasmineBrowser = require('gulp-jasmine-browser');

gulp.task('serve', serve('.'));

gulp.task('open', function(){
    var options = {
        uri: 'http://localhost:3000',
        app: 'google chrome'
    };
    return gulp.src('.')
        .pipe(open(options));
});

gulp.task('browserify', function() {
    return browserify({
        entries: 'js/dependencies/main.js',
        debug: true
    }).bundle()
    .pipe(source('modules.js'))
    .pipe(gulp.dest('js/bundles/'));
});

gulp.task('bundle', function () {
    return gulp.src(['js/bundles/modules.js', 'js/**/*', '!js/dependencies/main.js', '!js/app.js'])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('js/bundles/'));
});

gulp.task('clean', function() {
    return del(['js/bundles/*']);
});

gulp.task('test', function() {
    return gulp.src(['js/**/*.js', 'tests/**/*.js', '!js/dependencies/main.js', '!js/app.js'])
        .pipe(jasmineBrowser.specRunner())
        .pipe(jasmineBrowser.server({port: 8888}));
});

gulp.task('build',  gulp.series('clean', 'browserify', 'bundle'));

gulp.task('start',  gulp.series('build', 'open', 'serve'));


