const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
	entry: __dirname + "/src/index.js", // 入口文件
	output: {
		path: __dirname + "/build", // 打包后文件存放
		filename: 'bundle.js' // 打包后输出文件名
	},

	// npm install --save-dev webpack-dev-server
	devServer: {
		contentBase: "./public", // 本地服务器所加载的页面所在位置
		historyApiFallback: true, // 不跳转，适合单页面应用
		inline: true // 实时刷新
	},

	module: {
		rules: [
			// npm install --save-dev babel-core babel-loader babel-preset-env
			{	
				test: /\.js$/,
				use: {
					loader: "babel-loader"
				},
				exclude: /node_modules/
			}
		]
	},

    devtool: 'inline-source-map'
}