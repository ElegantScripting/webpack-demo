exports.id = 0;
exports.modules = {

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _koa = __webpack_require__(4);

	var _koa2 = _interopRequireDefault(_koa);

	var _koaStatic = __webpack_require__(5);

	var _koaStatic2 = _interopRequireDefault(_koaStatic);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = module.exports = (0, _koa2.default)();

	try {
	    (function () {
	        var app = (0, _koa2.default)();
	        var hostname = process.env.HOSTNAME || "localhost";
	        var port = process.env.PORT || 8000;

	        app.use((0, _koaStatic2.default)("dist/client"));

	        app.listen(port, function () {
	            console.info("[Koa] Server is listening on http://" + hostname + ":" + port);
	        });
	    })();
	} catch (error) {
	    console.error(error.stack || error);
	}

/***/ }

};