const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

let isDev = !process.argv.includes('--build');

module.exports = {
	mode: isDev ? 'development' : 'production',
	devtool: isDev ? 'eval-source-map' : false,
	entry: {
		main: './src/index.js',
	},
	output: {
		filename: `[name].js`,
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
			template: './dist/index.html',
			filename: 'index.html' // название выходного файла
		}),
	]
}