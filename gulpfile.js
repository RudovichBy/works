const 	gulp = require('gulp'),
		autoprefixer = require('gulp-autoprefixer'),
		del = require('del'), // Для удоление папок и файлов
		browserSync = require('browser-sync').create(),
		less = require('gulp-less'),
		concat = require('gulp-concat'), //Для конкатенации файлов
		cleanCSS = require('gulp-clean-css'), //Для очистки и сжатия css
		sourcemaps = require('gulp-sourcemaps'),
		gcmq = require('gulp-group-css-media-queries'),  // Для группировки медиа запросов 
		smartgrid = require('smart-grid'),
		webpack = require("webpack-stream"),
		changed = require('gulp-changed'), //Что бы не тратить время на обработку неизмененных файлов
		uglify = require('gulp-uglify-es').default, // Для очистки и сжатия js
		rename = require("gulp-rename"), // Для изменения названия файла
		nunjucksRender = require('gulp-nunjucks-render'),
		webp = require('gulp-webp'); // Для генерации webp картинок 

let preproc = {
	less: 'less',
	sass: 'sass',
	scss: 'scss',
};
let fileswatch = 'html,htm,txt,json,md,woff2';
let imageswatch = 'jpg,jpeg,png,webp,svg';

//  *.* - выбрать все файлы в указанной папке;
//  *.scss - выбрать все файлы с указанным разрешение в указанной папке;
//  *.{scss,css} - выбрать все файлы с указанными разрешениями в указанной папке;
//  */*.scss — выбрать все файлы с указанным расширением в этой папке и всех дочерних папках;
//  [^_]*.scss — выбрать все файлы кроме файлов с указанным расширение в этой м;
//  {main,additional}.scss — выбрать только перечисленные файлы в этой папке;

// const folderProd = './Paradigma/';
const folderProd = './wood-tim/';
let path = {
	dist: {
		folder: folderProd + 'dist/',
		css: folderProd + 'dist/assets/css/',
		assets: folderProd + 'dist/assets/',
	},
	src: {
		folder: folderProd + 'src/',
		js: folderProd + 'src/js/main.js',
		less: folderProd + 'src/less/',
		images: folderProd + 'src/assets/images/**/*.{jpg,jpeg,png,webp,svg}',
		assets: folderProd + 'src/assets/',
		njk: folderProd + 'src/njk/',
	},
	watch: {
		js: folderProd + 'src/js/**/*.js',
		less: folderProd + 'src/less/**/*.less',
		assets: folderProd + 'src/assets/**/*.*',
		njk: folderProd + 'src/njk/**/*.*',
	},
	clean: folderProd + 'dist'
};

function styles() {
	// return gulp.src(path.src.less + 'styles.*')
	return gulp.src(path.src.less + '+(styles|basic).*') //для генерации двух и более файлов стилей
		.pipe(sourcemaps.init())
		.pipe(eval(preproc.less)())
		.pipe(gcmq())
		.pipe(autoprefixer({
			grid: true,
			overrideBrowserslist: ['> 0.1%'],
			cascade: false
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.dist.css))
		.pipe(browserSync.stream());
}

function stylesBild() {
	// return gulp.src(path.src.less + 'styles.*')
	return gulp.src(path.src.less + '+(styles|basic).*')
		.pipe(eval(preproc.less)())
		.pipe(gcmq())
		.pipe(autoprefixer({
			grid: true,
			overrideBrowserslist: ['> 0.1%'],
			cascade: false
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(gulp.dest(path.dist.css))
		.pipe(browserSync.stream());
}

function scriptLight() {
	return gulp.src(path.src.js)
		.pipe(sourcemaps.init())
		.pipe(rename("script.js"))
		.pipe(uglify()) // Minify JS (opt.)
		.pipe(sourcemaps.write())
		.pipe(changed(path.dist.folder, {
			hasChanged: changed.compareContents
		}))
		.pipe(gulp.dest(path.dist.assets + "/js"))
		.pipe(browserSync.stream())
}

function scripts() {
	return gulp.src(path.src.js)
		.pipe(webpack({
			mode: 'development',
			output: {
				filename: 'script.js'
			},
			watch: false,
			devtool: "source-map",
			module: {
				rules: [{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env', {
									debug: true,
									corejs: 3,
									useBuiltIns: "usage"
								}]
							]
						}
					}
				}]
			}
		}))
		.pipe(changed(path.dist.folder, {
			hasChanged: changed.compareContents
		}))
		.pipe(gulp.dest(path.dist.assets + "/js"))
		.pipe(browserSync.stream());
}

function scriptsBild() {
	return gulp.src(path.src.js)
		.pipe(webpack({
			mode: 'production',
			output: {
				filename: 'script.js'
			},
			module: {
				rules: [{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env', {
									corejs: 3,
									useBuiltIns: "usage"
								}]
							]
						}
					}
				}]
			}
		}))
		.pipe(gulp.dest(path.dist.assets + "/js"));
}


function nunjucks() {
	return gulp.src(path.src.njk + '**/*.html')
		.pipe(nunjucksRender({
			path: path.src.njk
		}))
		.pipe(changed(path.dist.folder, {
			hasChanged: changed.compareContents
		}))
		.pipe(gulp.dest(path.dist.folder))
		.pipe(browserSync.stream());
}

function copyAssets() {
	return gulp.src(path.src.assets + '**/**/*.*')
		.pipe(changed(path.dist.assets, {
			hasChanged: changed.compareContents
		}))
		.pipe(gulp.dest(path.dist.assets))
		.pipe(browserSync.stream());
}

function imagesWebp() {
	return gulp.src(path.src.images)
		.pipe(webp())
		.pipe(gulp.dest(path.src.assets + 'images'));
}

function watch() {
	browserSync.init({
		server: {
			baseDir: path.dist.folder,
		},
		notify: false,
	});

	gulp.watch(path.watch.less, styles);
	gulp.watch(path.watch.njk, nunjucks);
	gulp.watch(path.watch.assets, copyAssets);
	gulp.watch(path.watch.js, scriptLight); // Для простой сборки без Babel
	gulp.watch(path.watch.js, scripts);
	gulp.watch([path.dist.folder + '**/*.{' + fileswatch + '}']).on('change', browserSync.reload);
	gulp.watch('./smartgrid.js', grid);
}

function grid(done) {
	delete require.cache[require.resolve('./smartgrid.js')];
	let settings = require('./smartgrid.js');
	smartgrid(path.src.less + 'smartgrid', settings);
	//settings.offset = '3.1%'; //меняем настройки  offset на % для кросбраузерной верстки, наслучай если боаузер не понимает фукцию calc в css(ie6-8)
	//settings.filename = 'smart-grid-per';
	//smartgrid(path.src.less + 'smartgrid', settings);
	done();
}

function clear() {
	return del(path.clean);
}

function clearimg() {
	return del(path.dist.img);
}

const { parallel, series } = require('gulp');

exports.clearimg = clearimg;
exports.webp = imagesWebp;
exports.grid = grid;
exports.cleardist = clear;
exports.build = series(stylesBild, scriptsBild);
exports.default = series(nunjucks, copyAssets, styles, scripts, parallel(watch));
exports.oldtask = series(nunjucks, copyAssets, styles, scriptLight, parallel(watch));



// gulp.task('watch', watch);
// gulp.task('scriptLight', scriptLight);
// gulp.task('scripts', scripts);
// gulp.task('scriptsBild', scriptsBild);
// gulp.task('styles', styles);
// gulp.task('stylesBild', stylesBild);
// gulp.task('copyAssets', copyAssets);
// gulp.task('clear', clear);
// gulp.task('clearimg', clearimg);
// gulp.task('grid', grid);
// gulp.task('nunjucks', nunjucks);
// gulp.task('webp', imagesWebp);


// gulp.task('oldtask', gulp.series('nunjucks', 'copyAssets', 'styles', 'scriptLight', 'watch'));
// gulp.task('default', gulp.series('nunjucks', 'copyAssets', 'styles', 'scripts', 'watch'));
// gulp.task("build", gulp.parallel("stylesBild", "scriptsBild"));
// gulp.task("buildLight", gulp.parallel("stylesBild", "scriptLight"));