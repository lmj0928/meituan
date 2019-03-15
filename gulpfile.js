var gulp=require('gulp');
var concat=require('gulp-concat');
var sass=require('gulp-sass');
var mincss=require('gulp-clean-css');
var uglify=require('gulp-uglify');
var webserver=require('gulp-webserver');
var autoprefixer=require('gulp-autoprefixer');
var htmlmin=require('gulp-htmlmin');

gulp.task('devHtml',function(){
    return gulp.src('./src/*.html')
    .pipe(htmlmin({
        removeComments:true,
        removeEmptyAttributes:true,
        removeScriptTypeAttributes:true,
        removeStyleLinkTypeAttributes:true,
        collapseBooleanAttributes:true,
        collapseWhitespace:true
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('devCss',function(){
    return gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(mincss())
    .pipe(autoprefixer({
        browsers:['last 2 versions']
    }))
    .pipe(gulp.dest('./src/sass'))
})

gulp.task('devJs',function(){
    return gulp.src('./src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('webserver',function(){
    return gulp.src('./src')
    .pipe(webserver({
        port:9999,
        open:true,
        livereload:true
    //    host:'192.168.137.81'
    }))
})

gulp.task('watch',function(){
     gulp.watch('./src/sass/*.scss',gulp.series('devCss'))
})  //监听

gulp.task('dev',gulp.series('devCss','webserver','watch'))   //注册开发任务

gulp.task('build',gulp.parallel('devHtml','devJs'))  //注册线上任务