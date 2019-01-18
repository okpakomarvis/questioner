"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _connect = require("../db/connect");

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	upvote: function upvote(req, res) {
		var queryvt = "update questions set vote = vote + $1 where question_id = $2 RETURNING *";
		var queryValue = [1, parseInt(req.params.question_id)];
		_connect2.default.query(queryvt, queryValue).then(function (data) {
			if (data.rowCount < 1) {
				return res.json({
					status: 404,
					error: "No Question Found"
				});
			}
			_connect2.default.query("SELECT user_id , questions FROM upvote where questions = $1", [req.params.question_id]).then(function (result) {
				if (result.rowCount > 0) {
					return res.json({
						status: 201,
						error: "Sorry you have Already Upvoted this question before"
					});
				}
				var userId = req.userData.userId;

				_connect2.default.query("INSERT INTO upvote( questions, user_id) VALUES($1, $2)", [req.params.question_id, userId]).then().catch(function (e) {
					if (e.name === "error") {
						return res.json({
							status: 500,
							error: "Internal Server Error Occurred"
						});
					}
				});
				return res.json({
					status: 201,
					data: data.rows[0],
					message: " upvote successfully!"
				});
			}).catch(function (e) {
				console.log(e);
				if (e.name === "error") {
					res.json({
						status: 500,
						error: "Internal Server Error Occurred"
					});
				}
			});
		}).catch(function (e) {
			console.log(e);
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
	},

	downVote: function downVote(req, res) {
		var queryvt = "update questions set vote = vote - $1 where question_id = $2 RETURNING *";
		var queryValue = [1, parseInt(req.params.question_id)];
		_connect2.default.query(queryvt, queryValue).then(function (data) {
			if (data.rowCount < 1) {
				return res.json({
					status: 404,
					error: "No Question Found"
				});
			}
			_connect2.default.query("SELECT user_id , questions FROM downvote where questions = $1", [req.params.question_id]).then(function (result) {
				if (result.rowCount > 0) {
					return res.json({
						status: 201,
						error: "Sorry you have Already downvoted this question before"
					});
				}
				var userId = req.userData.userId;

				_connect2.default.query("INSERT INTO downvote( questions, user_id) VALUES($1, $2)", [req.params.question_id, userId]).then().catch(function (e) {
					if (e.name === "error") {
						return res.json({
							status: 500,
							error: "Internal Server Error Occurred"
						});
					}
				});
				return res.json({
					status: 201,
					data: data.rows[0],
					message: " upvote successfully!"
				});
			}).catch(function (e) {
				if (e.name === "error") {
					res.json({
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
	}
};