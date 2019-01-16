"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var checkImage = function checkImage(req, res, next) {
	console.log(req.body.imagePath);
	if (!req.body.imagePath) {
		return res.json({
			status: 400,
			error: "Image was not provided"
		});
	}
	next();
};
exports.default = checkImage;