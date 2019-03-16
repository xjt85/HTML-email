'use strict';

var gulp = require("gulp"),
    watch = require("gulp-watch"),
    prefixer = require("gulp-autoprefixer"),
    imagemin = require("gulp-imagemin"),
    sass = require("gulp-sass"),
    uglify = require("gulp-uglify"),
    pug = require("gulp-pug"),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    src: {
        html: 'src/*.pug', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/main.js', //В стилях и скриптах нам понадобятся только main файлы
        style: 'src/scss/style.scss',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
    },
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        style: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "xjt"
};

gulp.task('html', function () {
    return gulp.src(path.src.html)
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({ stream: true }));
});

gulp.task('styles', function () {
    return gulp.src(path.src.style)
    .pipe(sass())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({ stream: true }));
});

gulp.task('watch', function () {
    gulp.watch(path.src.html, gulp.parallel('html'));
    gulp.watch(path.src.style, gulp.parallel('styles'));
});

gulp.task('default', gulp.parallel('watch','html','styles'));