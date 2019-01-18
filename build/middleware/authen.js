"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	authen: function authen(req, res, next) {
		try {
			var token = req.headers.authorization.split(" ")[1];
			var decoded = _jsonwebtoken2.default.verify(token, process.env.JWT_KEY);
			req.userData = decoded;

			next();
		} catch (error) {
			return res.status(401).json({
				message: "Auth failed"
			});
		}
	},
	authenAdmin: function authenAdmin(req, res, next) {
		var isAdmin = req.userData.isAdmin;

		if (isAdmin === false) {
			return res.json({
				status: 403,
				message: " Unauthorize, Access Denied!"
			});
		}
		next();
	},
	authenUser: function authenUser(req, res, next) {
		var isAdmin = req.userData.isAdmin;

		if (isAdmin === true) {
			return res.json({
				status: 403,
				message: " Unauthorize, Access Denied!"
			});
		}
		next();
	}

};