//!------------------------------ Подключение ядра Gulp. В {} указываются подключаемые функции
// src - метод Gulp для работы с путями
// dest - метод Gulp для формирования итоговых данных
// series - метод Gulp, позволяющий выполнять серию задач
// watch - метод Gulp, позволяющий выполнять отслеживание изменений в реальном времени
// parallel - метод Gulp, позволяющий выполнять сценарии одновременно
// task - метод Gulp для выполнения сценария по умолчанию
const { src, dest, series, watch, parallel, task } = require('gulp');

//! --------------------------------- Подключение пакетов
// Описание всех пакетов в Памятке разработки.
const del = require('del');
const sync = require('browser-sync').create();
const replace = require('gulp-replace');
const If = require('gulp-if');

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

//! ------------------------------ Объявление переменных
// const { configFTP } - подключение переменной из другого файла, которая содержит 
//			скрытые настройки ftp-подключения 
// isDev - флаг ключа, используемого при запуске (настраивается в package.json) для
// 		определения режима сборки
const { configFTP } = require('./gulp/ftpConfig');
let isBuild = process.argv.includes('--build');


//! --------------------------------- Задачи
// Работа с HTML:
// 	src('src/**.html') - путь. ** - все файлы
//		If(isBuild, задача) - задача выполняется только в режиме Production 
// 	include() - соединение HTML файлов. @@ - префикс для подключения
// 	replace() - замена символов @img/ на img/
// 	htmlmin() - минимизирования файлов HTML.
// 		collapseWhitespace - удаление пробелов
// 		removeComments - удаление комментариев
// 	dest('dist') - формирование результата в папку dist
function html() {
	return src('src/**.html')
		.pipe(include({
			prefix: '@@'
		}))
		.pipe(replace(/@img\//g, 'img/'))
		.pipe(If(isBuild, htmlmin({
			collapseWhitespace: true,
			removeComments: true
		})))
		.pipe(dest('dist'))
}

// Работа с SCSS (название должно отличаться от пакета const sass):
// 	src('src/**.html') - путь. ** - все файлы
//		If(isBuild, задача) - задача выполняется только в режиме Production
// 	sass() - компиляция итогового файла при помощи пакета sass
//			{ sourcemaps: !isBuild } - карта формируется только в режиме Development
// 	replace() - замена символов @img/ на ../img/
//		autoprefixer() - добавление авто префиксов
//		concat() - соединение файлов CSS в один
//		groupMedia() - группировка медиа-запросов 
//		csso() - минимизирования файлов CSS 
// 	dest('dist') - формирование результата в папку dist
function scss() {
	return src('src/scss/**.scss', { sourcemaps: !isBuild })
		.pipe(sass())
		.pipe(replace(/@img\//g, '../img/'))
		.pipe(If(isBuild, autoprefixer({
			browsers: ['last 2 versions']
		})))
		.pipe(concat('style.css'))
		.pipe(groupMedia())
		.pipe(If(isBuild, csso()))
		.pipe(dest('dist/css'))
}

// Работа с Изображениями (данный вариант требует настройки сервера в .htaccess)
// src('src/img/**.{jpg,jpeg,png,webp}') - сначала обрабатываются только изображения
// 	If(isBuild, задача) - задача выполняется только в режиме Production
//		newer('dist/img')) - проверяется наличие изображений в конечной папке во избежание
// 								повторной конвертации
//		webp() - конвертация изображений
//	src('src/img/**.*') - всё содержимое img копируется в папку с итогом
function images() {
	return src('src/img/**.{jpg,jpeg,png,webp}')
		.pipe(If(isBuild, newer('dist/img')))
		.pipe(If(isBuild, webp()))
		.pipe(If(isBuild, dest('dist/img')))
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
// 	webpack(configWebpack) - подключение внешнего файла конфигурации
//		при минимуме настроек и плагинов можно прописать конфигурацию внутри скобок:
//			webpack({ 	mode: isBuild ? 'production' : 'development', 
//							entry: {	main: './src/index.js',	},
//							output: { filename: `[name].js`,	},})
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
// 	configFTP.log - отображение лога загрузки
// 	ftpConnect.dest('/') - указание удалённой папки для загрузки на сервере.
//									в данном примере указан корневой каталог сайта.
function ftp() {
	configFTP.log = util.log;
	const ftpConnect = vinyl.create(configFTP);
	return src('dist/**/*.*', {})
		.pipe(ftpConnect.dest('/'))
}

// Отслеживание изменений
// sync.init - активируем плагин взаимодействия с браузером
// 	server - путь к итоговой сборке
//		notify - предупреждения Gulp'а в консоли браузера
// watch - метод Gulp, позволяющий выполнять отслеживание изменений в реальном времени
// 	1 элемент - путь и файлы для отслеживания
//		2 элемент - запуск соответствующей задачи
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
exports.start = series(clear, mainTasks, js, watching) 		// npm run start
exports.build = series(clear, mainTasks, js)						// npm run dev / build 
exports.public = series(clear, mainTasks, js, ftp)				// npm run public
exports.clear = clear

// Запуск сценария по умолчанию / в терминале gulp 
task(`default`, exports.start)