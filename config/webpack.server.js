var webpack = require("webpack");
var path = require("path");
var fs = require("fs");

var nodeModules = {};

fs.readdirSync("node_modules")
	.filter(function(x) {
		return [".bin"].indexOf(x) === -1;
	})
	.forEach(function(mod) {
		nodeModules[mod] = "commonjs " + mod;
	});

var autoprefixer = require("autoprefixer");

module.exports = {
	target: "node",
	context: __dirname,
	cache: false,
	debug: false,
	devtool: false,
	entry: ["../src/server/server.jsx"],
	output: {
		path: path.join(__dirname, "../dist/server"),
		filename: "server.min.js"
	},
	plugins: [
		new webpack.DefinePlugin({
			__CLIENT__: false,
			__SERVER__: true,
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
		loaders: [],
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
	externals: nodeModules,
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
	}
};
