"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _connect = require("../../db/connect");

var _connect2 = _interopRequireDefault(_connect);

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

var _validator = require("../../middleware/validator");

var _validator2 = _interopRequireDefault(_validator);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _emailValidator = require("email-validator");

var _emailValidator2 = _interopRequireDefault(_emailValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUsers = function createUsers(req, res) {
	var result = _joi2.default.validate(req.body, _validator2.default.valUsers);
	if (result.error) {
		res.status(400).send(result.error.details[0].message);
		return;
	}
	var _req$body = req.body,
	    email = _req$body.email,
	    username = _req$body.username;

	var validEmail = _emailValidator2.default.validate(email);
	if (validEmail === true) {
		_connect2.default.query("SELECT email, username FROM users where email= $1 AND username = $2", [email, username]).then(function (user) {
			if (user.rowCount > 0) {
				return res.json({
					status: 409,
					message: "user already exist"
				});
			} else {
				_bcrypt2.default.hash(req.body.password, 10, function (err, hash) {
					if (err) {
						return res.json({
							status: 500,
							error: "Internal Server Error Occurred"
						});
					} else {
						var _req$body2 = req.body,
						    _username = _req$body2.username,
						    _email = _req$body2.email;

						var queryUser = "INSERT INTO users(username, email, password, createdon, isadmin)" + " VALUES($1, $2, $3, $4, $5) RETURNING *";
						var queryValue = [_username, _email, hash, new Date().toISOString(), false];
						_connect2.default.query(queryUser, queryValue).then(function (result) {
							if (result.rowCount > 0) {
								return res.json({
									status: 201,
									message: "user account successfully created"
								});
							}
						}).catch(function (e) {
							console.log(e);
							if (e.name === "error") {
								res.json({
									status: 500,
									error: "Internal Server Error Occurred"
								});
							}
						});
					}
				});
			}
		}).catch(function (e) {

			if (e.name === "error") {
				res.json({
					status: 500,
					error: "Internal Server Error Occurred"
				});
			}
		});
	} else {
		res.json({
			status: 401,
			message: "not a valid email"
		});
	}
};

exports.default = createUsers;