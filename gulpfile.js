//!------------------------------ Подключение ядра Gulp. В {} указываются подключаемые функции
const { src, dest, series, watch, parallel, task } = require('gulp');

//! --------------------------------- Подключение пакетов
// Описание всех пакетов в Паметке разработки.
const del = require('del');
const sync = require('browser-sync').create();
const replace = require('gulp-replace');

const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');

const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const groupMedia = require('gulp-group-css-media-queries');
const csso = require('gulp-csso');

const webp = require('gulp-webp');
const newer = require('gulp-newer');

const webpack = require('webpack-stream');
const configWebpack = require('./webpack.config');

const vinyl = require('vinyl-ftp');
const util = require('gulp-util');
const { configFTP } = require('./gulp/ftpConfig');


//! --------------------------------- Задачи
// Работа с HTML:
function html() {
	return src('src/**.html')
		.pipe(include({
			prefix: '@@'
		}))
		.pipe(replace(/@img\//g, 'img/'))
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(dest('dist'))
}

// Работа с SCSS (название должно отличаться от пакета const sass):
function scss() {
	return src('src/scss/**.scss')
		.pipe(sass())
		.pipe(replace(/@img\//g, '../img/'))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(concat('style.css'))
		.pipe(groupMedia())
		.pipe(csso())
		.pipe(dest('dist/css'))
}

// Работа с Изображениями (данный вариант требует настройки сервера в .htaccess)
function images() {
	return src('src/img/**.{jpg,jpeg,png,webp}')
		.pipe(newer('dist/img'))
		.pipe(webp())
		.pipe(dest('dist/img'))
		.pipe(src('src/img/**.*'))
		.pipe(dest('dist/img'))
}

// Перенос файлов из папки в итоговую
function copyFonts() {
	return src(`src/fonts/**/*.*`)
		.pipe(dest('dist/fonts/'))
}
function copyIcons() {
	return src(`src/icon/**/*.*`)
		.pipe(dest('dist/icon/'))
}

// Работа с JS через WebPack
function js() {
	return src('src/**.js')
		.pipe(webpack(configWebpack))
		.pipe(dest('dist'))
}

// Очищение папки назначения
function clear() {
	return del('dist')
}

// Отправка на сервер (сначала на сервере необходимо создать ftp-подключение)
function ftp() {
	configFTP.log = util.log;
	const ftpConnect = vinyl.create(configFTP);
	return src('dist/**/*.*', {})
		.pipe(ftpConnect.dest('/'))
}

// Отслеживание изменений
function watching() {
	sync.init({
		server: './dist',
		notify: false,
		port: 4040,
	})
	watch('src/**.html', series(html)).on('change', sync.reload)
	watch('src/html/**.html', series(html)).on('change', sync.reload)
	watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
	watch('src/**.js', series(js)).on('change', sync.reload)
	watch('src/js/**.js', series(js)).on('change', sync.reload)
	watch('src/img/**/*.*', series(images)).on('change', sync.reload)
}

//! --------------------------------- Запуск
// Создание каскада задач, выполняемых одновременно
const mainTasks = parallel(scss, html, images, copyFonts, copyIcons);

// Запуск сценария каскадом series() или по одиночно / в терминале gulp build 
exports.serve = series(clear, mainTasks, js, watching)
exports.build = series(clear, mainTasks, js)
exports.public = series(clear, mainTasks, js, ftp)
exports.clear = clear

// Запуск сценария по умолчанию / в терминале gulp 
task(`default`, exports.serve)