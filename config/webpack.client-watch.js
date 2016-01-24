var webpack = require("webpack");
var config = require("./webpack.client.js");
var hostname = process.env.HOSTNAME || "localhost";
var port = 8080;

config.cache = true;
config.debug = true;
config.devtool = "cheap-module-eval-source-map";

config.entry.unshift(
	"webpack-dev-server/client?http://" + hostname + ":" + port,
	"webpack/hot/only-dev-server"
);

config.output.publicPath = "http://" + hostname + ":" + port + "/dist/client";
config.output.hotUpdateMainFilename = "update/[hash]/update.json";
config.output.hotUpdateChunkFilename = "update/[hash]/[id].update.js";

config.plugins = [
	new webpack.DefinePlugin({
		__CLIENT__: true,
		__SERVER__: false,
		__PRODUCTION__: false,
		__DEV__: true
	}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
];

config.module.postLoaders = [{
	test: /\.jsx?$/,
	exclude: /(node_modules)/,
	loader: "babel-loader",
	query: {
		presets: ["es2015", "stage-0", "react", "react-hmre"]
	}
}];

config.devServer = {
	publicPath: config.output.publicPath,
	hot: true,
	inline: false,
	lazy: false,
	quiet: true,
	noInfo: true,
	headers: {
		"Access-Control-Allow-Origin": "*"
	},
	stats: {
		colors: true
	},
	host: hostname
};

module.exports = config;
