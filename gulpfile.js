var gulp = require('gulp'),
    concat = require('gulp-concat'),
    ugl = require('gulp-uglifycss'),
    scss = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin');

gulp.task('jsOptimize', function () {
    return gulp.src([
        'js/jquery-3.4.1.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'js/slick.min.js',
        'js/circle-progress.min.js',
        'js/isotope.pkgd.js',
        'js/main.js'
    ])
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));

});

gulp.task('imgOptimize', function () {
    return gulp.src('./images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('scss', function () {
    return gulp.src([
        './node_modules/bootstrap/scss/bootstrap.scss',
        './styles/**/*.scss'
    ])
        .pipe(scss().on('error', scss.logError))
        .pipe(gulp.dest('./styles'))
});
gulp.task('concatMinifyCss', function() {
    return gulp.src([
        './styles/bootstrap.css',
        './styles/slick.css',
        './styles/main.css'
    ])
        .pipe(concat('all-styles.css'))
        .pipe(autoprefixer({
            cascade: false,
            overrideBrowserslist: ['ie 11', 'Firefox > 20']
        }))
        .pipe(ugl({
            'maxLineLen': 80,
            'uglyComments': true
        }))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('default', gulp.parallel('jsOptimize','imgOptimize', gulp.series('scss','concatMinifyCss')));