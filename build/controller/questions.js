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

var createQuestion = function createQuestion(req, res) {
	var result = _joi2.default.validate(req.body, _validator2.default.questions);
	if (result.error) {
		return res.status(400).send(result.error.details[0].message);
	}
	var _req$body = req.body,
	    meetup = _req$body.meetup,
	    title = _req$body.title,
	    body = _req$body.body;

	title = title.replace(/([#$@%><*/\\])/g, '').trim();
	body = body.replace(/([#$@%><*/\\])/g, '').trim();
	var userId = req.userData.userId;

	var queryQst = "INSERT INTO questions(createdon, createdby, meetup, title, body, vote)" + " VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
	var queryValue = [new Date().toISOString(), parseInt(userId), parseInt(meetup), title, body, 0];
	_connect2.default.query(queryQst, queryValue).then(function (data) {
		if (data.rowCount < 1) {
			return res.json({
				status: 503,
				error: " Something Went Wrong!"
			});
		}
		return res.json({
			status: 201,
			data: data.rows[0],
			message: "Question successfully created"
		});
	}).catch(function (e) {
		if (e.code === "23503") {
			return res.json({
				status: 404,
				error: "Meetup  Doesn't Exist"
			});
		} else if (e.name === "error") {
			res.json({
				status: 500,
				error: "Internal Server Error Occurred"
			});
		}
	});
};

exports.default = createQuestion;