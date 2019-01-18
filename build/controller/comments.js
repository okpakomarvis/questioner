"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _connect = require("../db/connect");

var _connect2 = _interopRequireDefault(_connect);

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

var _validator = require("../middleware/validator");

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var comment = function comment(req, res) {
	var result = _joi2.default.validate(req.body, _validator2.default.comment);
	if (result.error) {
		return res.status(400).send(result.error.details[0].message);
	}
	var comment = req.body.comment;
	comment = comment.replace(/([#$@%><*/\\])/g, '').trim();
	var userId = req.userData.userId;

	_connect2.default.query("SELECT * FROM questions where question_id = $1", [req.body.question]).then(function (result) {
		if (result.rowCount < 1) {
			return res.json({
				status: 404,
				error: "Question  Doesn't exist"
			});
		}
		_connect2.default.query("INSERT INTO comments(question, userid, comment) VALUES($1, $2, $3) RETURNING *", [req.body.question, userId, comment]).then(function (data) {
			if (data.rowCount < 1) {
				return res.json({
					status: 503,
					error: "Something Went Wrong"
				});
			}
			var returnResult = {
				id: data.rows[0].comment_id,
				question: result.rows[0].question_id,
				title: result.rows[0].title,
				body: result.rows[0].body,
				comment: data.rows[0].comment
			};
			return res.json({
				status: 201,
				data: returnResult,
				message: " Comment Successfully Created "
			});
		}).catch(function (e) {
			if (e.name === "error") {
				return res.json({
					status: 500,
					error: "Internal Server Error Occurred"
				});
			}
		});
	}).catch(function (e) {
		if (e.code === "22P02") {
			return res.json({
				status: 400,
				error: "Characters are not Allowed"
			});
		} else if (e.name === "error") {
			res.json({
				status: 500,
				error: "Internal Server Error Occurred"
			});
		}
	});
};

exports.default = comment;