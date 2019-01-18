"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.storage = undefined;

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = exports.storage = _multer2.default.diskStorage({
	destination: function destination(req, file, cb) {
		cb(null, "./server/uploads/");
	},
	filename: function filename(req, file, cb) {
		cb(null, new Date().toISOString().split(":") + file.originalname);
	}
});
var filterFile = function filterFile(req, file, cb) {
	//reject or accept a file
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
		cb(null, true);
	} else {
		cb(new Error("file was not uploaded"), false);
	}
};
var upload = (0, _multer2.default)({
	storage: storage,
	limits: { fileSize: 1024 * 1024 * 3 },
	fileFilter: filterFile
});

exports.default = upload;