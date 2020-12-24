// ======== Preprocessor (sass, scss, less, stylus)

const less = require('gulp-less');
// const sass = require('gulp-sass');
// const scss = require('gulp-sass');
// const styl = require('gulp-stylus');
//===================================

const gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del'),
	browserSync = require('browser-sync').create(),
	concat = require('gulp-concat'),
	cleanCSS = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	gcmq = require('gulp-group-css-media-queries'),
	smartgrid = require('smart-grid'),
	webpack = require("webpack-stream"),
	changed = require('gulp-changed'),
	uglify = require('gulp-uglify-es').default,
	rename = require("gulp-rename"),
	nunjucksRender = require('gulp-nunjucks-render'),
	webp = require('gulp-webp');

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
const folderProd = './radiobazaar/';
let path = {
	dist: {
		folder: folderProd + 'dist/',
		html: folderProd + 'dist/',
		js: folderProd + 'dist/assets/js/',
		css: folderProd + 'dist/assets/css/',
		img: folderProd + 'dist/assets/images/',
		fonts: folderProd + 'dist/assets/fonts/',
		fonts: folderProd + 'dist/assets/libs/',
		assets: folderProd + 'dist/assets/',
		images: folderProd + 'src/assets/images/**/',
	},
	src: {
		folder: folderProd + 'src/',
		html: folderProd + 'src/**/*.html',
		// html: folderProd + 'src/**/[^_]*.html',
		js: folderProd + 'src/js/main.js',
		css: folderProd + 'src/assets/*.css',
		less: folderProd + 'src/less/',
		sass: folderProd + 'src/sass/',
		scss: folderProd + 'src/scss/',
		stylus: folderProd + 'src/styl/',
		img: folderProd + 'src/assets/images/**/*.{jpg,jpeg,png,webp,svg}',
		images: folderProd + 'src/assets/images/**/*.{jpg,jpeg,png}',
		fonts: folderProd + 'src/fonts/**/*.*',
		assets: folderProd + 'src/assets/',
		njk: folderProd + 'src/njk/',
	},
	watch: {
		html: folderProd + 'src/**/*.html',
		js: folderProd + 'src/js/**/*.js',
		// style: folderProd + 'src/scss/**/*.{scss,css}',
		less: folderProd + 'src/less/**/*.less',
		img: folderProd + 'src/imgages/**/*.*',
		fonts: folderProd + 'src/fonts/**/*.*',
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
		// .pipe(sourcemaps.init())
		.pipe(rename("script.js"))
		.pipe(uglify()) // Minify JS (opt.)
		// .pipe(sourcemaps.write())
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


function copyHtml() {
	return gulp.src(path.src.html)
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
		// .pipe(debug({
		// 	title: 'copyAssets'
		// }))
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
	// gulp.watch(path.watch.html, copyHtml);
	gulp.watch(path.watch.njk, nunjucks);
	gulp.watch(path.watch.assets, copyAssets);
	gulp.watch(path.watch.js, scriptLight);
	// gulp.watch(path.watch.js, scripts);
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

function cleanimg() {
	return del(path.dist.img);
}

gulp.task('watch', watch);
gulp.task('scriptLight', scriptLight);
gulp.task('scripts', scripts);
gulp.task('scriptsBild', scriptsBild);
gulp.task('styles', styles);
gulp.task('copyHtml', copyHtml);
gulp.task('stylesBild', stylesBild);
gulp.task('copyAssets', copyAssets);
gulp.task('clear', clear);
gulp.task('cleanimg', cleanimg);
gulp.task('grid', grid);
gulp.task('nunjucks', nunjucks);
gulp.task('webp', imagesWebp);

// gulp.task('scripts', gulp.series('copyHtml', 'copyAssets', 'styles', 'scripts', 'watch'));
gulp.task('scripts', gulp.series('nunjucks', 'copyAssets', 'styles', 'scripts', 'watch'));
gulp.task('default', gulp.series('nunjucks', 'copyAssets', 'styles', 'scriptLight', 'watch'));
gulp.task('builDebug', gulp.series('nunjucks', 'copyAssets', 'stylesBild', 'scriptLight', 'watch'));
gulp.task("buildHard", gulp.parallel("stylesBild", "scriptsBild"));
gulp.task("buildLight", gulp.parallel("stylesBild", "scriptLight"));



/* Проверить поддерживает браузер функцию calc css или нет, если нет то подключаем другой файл со стилями 
	данный скрипт подключить в html */

/*     <script>
        var div = document.createElement('div');
        div.style.cssText = 'width:calc(10px)';

        if(!(div.style.length > 0)){
            var link = document.createElement('link');
            link.setAttribute('href', 'assets/css/styles-calc.css')
            link.setAttribute('rel', 'stylesheet')
            document.body.appendChild(link);
        }
    </script> */

//=============================