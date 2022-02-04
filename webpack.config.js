//! ------------------------------ Подключение пакетов
// Описание всех пакетов в Памятке разработки.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

//! ------------------------------ Объявление переменных
// isDev - флаг ключа, используемого при запуске (настраивается в package.json) для
// 		определения режима сборки
let isDev = !process.argv.includes('--build');
const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

//! ------------------------------ Настройка
// Установка режима сборки по умолчанию, для избежания предупреждения.
// Доступны два варианта 'development' (обычный) или 'production' (minimal).
//		mode: 'development' - доступны комментарии и не очень сжатый формат
//		mode: 'production' - доступны комментарии в основном файле и сжатый формат
// 	devtool: - настройки source-map для поиска ошибок
// 	entry: - точка входа. Если несколько файлов, то несколько свойств
// 	output: - итоговое название
//		optimization: - настройки выходного файла
// 		minimizer: - отключаем создание LICENSE.txt с комментариями и убираем их из итога
//		plugins: - название итоговых JS-файлов автоматически вставляется в HTML. При 
// 		многостраничном варианте HtmlWebpackPlugin вызывается несколько раз (можно через 
//			массив и .concat). Разные js модули требуют привязки к точкам входа (chunks: ['main']).
//   		Во избежание трудностей данный процесс запускается в конце
module.exports = {
	mode: isDev ? 'development' : 'production',
	devtool: isDev ? 'eval-source-map' : false,
	entry: {
		main: './src/index.js',
	},
	output: {
		filename: filename('js'),
	},
	optimization: {
		minimizer: [new TerserPlugin({
			extractComments: false,
			terserOptions: {
				output: {
					comments: false,
				},
			},
		})],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './dist/index.html', // вход
			filename: 'index.html', // название выходного файла
			chunks: ['main'] // связь с точкой входа (entry)
		}),
	]
}