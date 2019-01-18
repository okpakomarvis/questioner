"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _router = require("./router/router");

var _router2 = _interopRequireDefault(_router);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = process.env.PORT || 3000;

app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)("dev"));
app.use("/uploads", _express2.default.static("uploads"));
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use("/api/v1", _router2.default);

app.listen(port, function () {
	// eslint-disable-next-line no-console
	console.log("server is running on " + port);
});

exports.default = app;