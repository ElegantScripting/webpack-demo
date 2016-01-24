var webpack = require("webpack");
var path = require("path");

module.exports = {
	target: "web",
	cache: false,
	context: __dirname,
	debug: false,
	devtool: false,
	entry: ["../src/client/client.jsx"],
	output: {
		path: path.join(__dirname, "../dist/client"),
		filename: "client.min.js",
		chunkFilename: "[name].[id].js"
	},
	plugins: [
		new webpack.DefinePlugin({
			__CLIENT__: true,
			__SERVER__: false,
			__PRODUCTION__: true,
			__DEV__: false
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: "production"
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			sourcemap: false,
			compress: {
				warnings: false
			}
		}),
	],
	module: {
		loaders: [{
			test: /\.styl$/,
			loader: "css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/"
		}, {
			test: /\.css$/,
			loader: "style-loader!css-loader!postcss-loader"
		}, ],
		postLoaders: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: "babel-loader",
			query: {
				plugins: ["transform-runtime"],
				presets: ["es2015", "stage-0", "react"]
			}
		}],
		noParse: /\.min\.js/
	},
	resolve: {
		modulesDirectories: [
			"src",
			"node_modules"
		],
		extensions: ["", ".json", ".js"]
	},
	node: {
		__dirname: true,
		fs: "empty"
	},
	postcss: function() {
		return {
			defaults: [autoprefixer],
			cleaner: [autoprefixer({
				browsers: ["last 4 versions"]
			})]
		};
	},
};
