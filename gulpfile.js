'use strict';
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sequence = require('run-sequence');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-minify-css');
// const htmlmin = require('gulp-htmlmin');
const htmlmin = require('gulp-minify-html');
const jshint = require('gulp-jshint');
const obfuscate = require('gulp-obfuscate');

gulp.task('imagemin', () => {
	return gulp.src('./www/images/*.*')
				.pipe(imagemin())
				.pipe(gulp.dest('./dist/images'));
});
gulp.task('cssmin', () => {
	return gulp.src('./www/css/*.css')
				.pipe(cssmin())
				.pipe(gulp.dest('./dist/css'));
});
gulp.task('htmlmin', () => {
	return gulp.src('./www/html/*.html')
				.pipe(htmlmin({
					comments: true
				}))
				.pipe(gulp.dest('./dist/html'));
});
gulp.task('concat', () => {
	return gulp.src('./www/js/*.js')
				.pipe(jshint())
				.pipe(obfuscate())
				.pipe(uglify())
				.pipe(concat('all.js'))
				.pipe(gulp.dest('./dist/js'));
});
gulp.task('autoprefixer', () => {
	return gulp.src('./www/css/base.css')
				.pipe(autoprefixer({
					browsers: ['> 1%']
				}))
				.pipe(gulp.dest('./dist/css'));
});
gulp.task('default', () => {
	sequence(
		'imagemin',
		'cssmin',
		'htmlmin',
		'concat',
		() => {
			console.log('all task is complete!');
		}
	);
});