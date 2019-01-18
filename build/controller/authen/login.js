"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _connect = require("../../db/connect");

var _connect2 = _interopRequireDefault(_connect);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _validator = require("../../middleware/validator");

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginUser = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var result, queryUser;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						result = _joi2.default.validate(req.body, _validator2.default.login);

						if (!result.error) {
							_context.next = 3;
							break;
						}

						return _context.abrupt("return", res.status(400).send(result.error.details[0].message));

					case 3:
						// eslint-disable-next-line quotes
						queryUser = 'SELECT email, user_id, username, isadmin, password FROM users where email=$1';

						_connect2.default.query(queryUser, [req.body.email]).then(function (user) {
							if (user.rowCount < 1) {
								return res.json({
									status: 401,
									error: " Auth failed "
								});
							}
							_bcrypt2.default.compare(req.body.password, user.rows[0].password, function (err, result) {
								if (err) {
									return res.json({
										status: 401,
										error: "Auth failed "
									});
								}
								if (result) {
									var token = _jsonwebtoken2.default.sign({
										email: user.rows[0].email,
										userId: user.rows[0].user_id,
										isAdmin: user.rows[0].isadmin
									}, process.env.JWT_KEY, {
										expiresIn: "1h"
									});
									return res.json({
										status: 200,
										token: token,
										mesage: "Auth successful, User Login "
									});
								}
								return res.json({
									status: 401,
									error: "Auth failed"
								});
							});
						}).catch(function (e) {
							// eslint-disable-next-line quotes
							if (e.name === 'error') {
								res.json({
									status: 500,
									error: "Internal Server Error Occurred"
								});
							}
						});

					case 5:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function loginUser(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = loginUser;