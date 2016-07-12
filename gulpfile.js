var gulp = require('gulp');
var packageJson = require('./package.json');

var tslint = require('gulp-tslint');
var tsc = require('gulp-typescript');
var del = require('del');
var sequence = require('gulp-sequence');

var projectConfig = tsc.createProject('./tsconfig.json');

const src = './src/**/*.ts';
const dest = './dist/';

gulp.task('clean', function () {
	return del(dest);
});

gulp.task('ts-lint', function () {
	return gulp.src(src)
		.pipe(tslint({
			configuration: { "indent": 'tabs' }
			// configuration:{"indent": [ true, "tabs" ]}
		}))
		.pipe(tslint.report('json'));
});

gulp.task('compile-ts', function (cb) {
	return gulp.src(["./src/node_modules.d.ts", "./typings/index.d.ts", './src/**/*.ts'])
		.pipe(tsc(projectConfig))
		.pipe(gulp.dest(dest));
});

var gulpCopy = require('gulp-copy');

gulp.task('copy-files', function () {
	return gulp.src('./package.json')
		.pipe(gulpCopy(dest));
});

gulp.task('default', function (cb) {
	sequence('clean', 'copy-files', 'ts-lint', 'compile-ts', cb);
});
