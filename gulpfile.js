'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var argv = require('yargs').argv;

var path = {
    project: ['./'],
    sass: {
        compile: ['./sass/*.scss', './src/app/*.scss'],
        watch: ['./sass/**/*.scss', './src/app/*.scss']
    },
    css: './src/css'
}

gulp.task('default', ['sass', 'watch']);

gulp.task('sass', function () {
    gulp.src(path.sass.compile)
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(path.css));
});

gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});
