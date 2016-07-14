var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jshint = require('gulp-jshint');
var del = require('del');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var useref = require('gulp-useref');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var gulpif = require('gulp-if');

var paths = {
	clean: ['build', '.tmp'],
	sass: ['./scss/**/*.scss'],
	templatecache: ['./www/{templates,scripts}/**/*.html'],
	ng_annotate: ['./www/{js,scripts}/**/*.js'],
	useref: ['./www/*.html'],
	rev: ['./build/**/*.css', './build/**/*.js'],
	copy: ['./www/**/*.{eot,ico,ttf,woff,woff2,webp,svg}']
};
//main task
gulp.task('default', ['clean'], function () {
	gulp.start('imagemin', 'revreplace', 'copy');
});

//Clean target
gulp.task('clean', function () {
    del(paths.clean).then(function () {
		console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});
//compress PNG/SVG/JPEG/GIF
gulp.task('imagemin', function () {
	return gulp.src('www/**/*.{png,jpg,gif,jpeg}')
		.pipe(imagemin({
			optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
			progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
			interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
			multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
		}))
		.pipe(gulp.dest('build'));
});
//将html压缩成js文件
gulp.task('templatecache', function () {
	return gulp.src(paths.templatecache)
		.pipe(templateCache({ standalone: true }))
		.pipe(gulp.dest('.tmp/'));
});
//使用ng-annotate进行angular模块依赖自动注入, 引入模块自动加[],防止被混淆
gulp.task('ng_annotate', ['templatecache'], function () {
	return gulp.src(paths.ng_annotate)
		.pipe(ngAnnotate({ single_quotes: true }))
		.pipe(gulp.dest('.tmp/'));
});
//replace index block, searchPath指定搜索压缩后的引用文件地址
gulp.task('useref', ['ng_annotate'], function () {
	return gulp.src(paths.useref)
		.pipe(useref({
			searchPath: ['./www', './tmp']
		}))
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(gulp.dest('./build'));
});
//Static asset revisioning by appending content hash to filenames: unicorn.css => unicorn-d41d8cd98f.css
gulp.task('revision', ['useref'], function () {
	return gulp.src(paths.rev)
		.pipe(rev())
		.pipe(gulp.dest('./build'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./build'));
});
//replace index
gulp.task('revreplace', ['revision'], function () {
	var manifest = gulp.src('build/rev-manifest.json');
	return gulp.src('build/index.html')
		.pipe(revReplace({ manifest: manifest }))
		.pipe(gulp.dest('build/'));
});
//copy others
gulp.task('copy', function () {
	return gulp.src(paths.copy)
		.pipe(gulp.dest('./build'));
});

gulp.task('sass', function (done) {
	gulp.src('./scss/ionic.app.scss')
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(gulp.dest('./www/css/'))
		.pipe(minifyCss({
			keepSpecialComments: 0
		}))
		.pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest('./www/css/'))
		.on('end', done);
});

gulp.task('watch', function () {
	gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function () {
	return bower.commands.install()
		.on('log', function (data) {
			gutil.log('bower', gutil.colors.cyan(data.id), data.message);
		});
});

gulp.task('git-check', function (done) {
	if (!sh.which('git')) {
		console.log(
			'  ' + gutil.colors.red('Git is not installed.'),
			'\n  Git, the version control system, is required to download Ionic.',
			'\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
			'\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
		);
		process.exit(1);
	}
	done();
});

//Grammer check
gulp.task('jshint', function () {
	return gulp.src(['www/js/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('fail'));
});