//! --------------------------------- Подключение ядра Gulp. В {} указываются подключаемые функции
// src - метод Gulp для работы с путями
// dest - метод Gulp для формирования итоговых данных
// series - метод Gulp, позволяющий выполнять серию задач
// watch - метод Gulp, позволяющий выполнять отслеживание изменений в реальном времени
// parallel - метод Gulp, позволяющий выполнять сценарии одновременно
// task - метод Gulp для выполнения сценария по умолчанию
const { src, dest, series, watch, parallel, task } = require('gulp');


//! --------------------------------- Подключение пакетов
// include - пакет для соединения файлов HTML
// htmlmin - пакет для минимизирования файлов HTML
// sass - пакет для компиляции файлов SCSS
// autoprefixer - пакет для создания префиксов в итоговом CSS
// concat - пакет для соединения нескольких файлов в один
// groupMedia - пакет для группировки медиа-запросов
// csso - пакет для минимизирования файлов CSS
// del - пакет для очищения папки назначения
// replace - пакет для поиска и замены значений
// sync - пакет для отслеживания изменений в реальном времени
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const groupMedia = require('gulp-group-css-media-queries');
const csso = require('gulp-csso');
const del = require('del');
const replace = require('gulp-replace');
const sync = require('browser-sync').create();

//! --------------------------------- Задачи
// Работа с HTML:
// 	src('src/**.html') - путь. ** - все файлы
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
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(dest('dist'))
}

// Работа с SCSS (название должно отличаться от пакета const sass):
// 	src('src/**.html') - путь. ** - все файлы
//			sourcemaps - для более удобного поиска ошибок в разных файлах
// 	sass() - компиляция итогового файла при помощи пакета sass
// 	replace() - замена символов @img/ на ../img/
//		autoprefixer() - добавление авто префиксов
//		concat() - соединение файлов CSS в один
//		groupMedia() - группировка медиа-запросов 
//		csso() - минимизирования файлов CSS 
// 	dest('dist') - формирование результата в папку dist
function scss() {
	return src('src/scss/**.scss', { sourcemaps: true })
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

// Очищение папки назначения
function clear() {
	return del('dist')
}

// Перенос файлов из папки в итоговую
// src() - доступ к папке откуда
// dest() - куда
function copy() {
	return src(`src/img/**/*.*`)
		.pipe(dest('dist/img/'))
}

// Отслеживание изменений в реальном времени
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
	watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
	watch('src/img/**/*.*', series(copy)).on('change', sync.reload)
}

//! --------------------------------- Запуск
// Создание каскада задач, выполняемых одновременно
const mainTasks = parallel(scss, html, copy);

// Запуск сценария каскадом series() или по одиночно / в терминале gulp build 
exports.build = series(clear, mainTasks)
exports.serve = series(clear, mainTasks, watching)
exports.clear = clear

// Запуск сценария по умолчанию / в терминале gulp 
task(`default`, exports.serve)