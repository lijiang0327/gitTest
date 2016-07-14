const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var del = require('del');


gulp.task('default', function() {
	console.log(123);
});

gulp.task('build', function(callback) {
  runSequence('build-clean',
              ['build-scripts', 'build-styles'],
              'build-html',
              callback);
});

gulp.task('imagemin', () => {
	gulp.src('./www/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/images'));
});
 
gulp.task('scripts', function() {
  return gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

 
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});




/**
 * 
 * var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'); //需求库引入

	//压缩css
	gulp.task('minifycss', function () {
		return gulp.src('static/css/*.css')    //需要操作的文件
			.pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
			.pipe(minifycss())   //执行压缩
			.pipe(gulp.dest('dist/css'));   //输出文件夹
	});

	//压缩,合并 js
	gulp.task('minifyjs', function () {
		return gulp.src('static/js/*.js')      //需要操作的文件
			.pipe(uglify())    //压缩
			.pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
			.pipe(gulp.dest('dist/js'));       //输出到文件夹
	});

	//默认命令，在cmd中输入gulp后，执行的就是这个任务(压缩js需要在检查js之后操作)
	gulp.task('default', [], function () {
		gulp.start('minifycss', 'minifyjs');
	});
 */