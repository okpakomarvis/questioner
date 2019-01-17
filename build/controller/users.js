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

var _authen = require("../middleware/authen");

var _authen2 = _interopRequireDefault(_authen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable quotes */
exports.default = {
	createMeetup: function createMeetup(req, res) {
		var result = _joi2.default.validate(req.body, _validator2.default.meetup);
		if (result.error) {
			return res.status(400).send(result.error.details[0].message);
		}
		var _req$body = req.body,
		    location = _req$body.location,
		    topic = _req$body.topic,
		    happeningOn = _req$body.happeningOn,
		    tags = _req$body.tags;

		var imagepath = req.file.path;
		var queryMeetup = 'INSERT INTO meetups(createdon, location, imagepath,topic, happeningon, tags)' + ' VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
		var queryValue = [new Date().toISOString(), location, imagepath, topic, new Date(happeningOn).toISOString(), tags];
		_connect2.default.query(queryMeetup, queryValue).then(function (data) {
			if (data.rowCount < 1) {
				return res.json({
					status: 503,
					error: " Something Went Wrong "
				});
			}
			return res.json({
				status: 201,
				data: data.rows[0],
				message: "Meetup successfully created"
			});
		}).catch(function (e) {
			if (e.name === 'error') {
				res.json({
					status: 500,
					error: "Internal Server Error Occurred"
				});
			}
		});
	},
	singleMeetup: function singleMeetup(req, res) {
		var meetup_id = parseInt(req.params.meetup_id);
		_connect2.default.query('select * from meetups where meetup_id = $1 ', [meetup_id]).then(function (data) {
			if (data.rowCount < 1) {
				return res.json({
					status: 404,
					error: " No Meetup found "
				});
			}
			return res.json({
				status: 200,
				data: data.rows[0],
				message: " Meetup retrieve successfully "
			});
		}).catch(function (e) {
			if (e.code === '22P02') {
				res.json({
					status: 400,
					error: "Characters are not Allowed"
				});
			} else if (e.name === 'error') {
				res.json({
					status: 500,
					error: "Internal Server Error Occurred"
				});
			}
		});
	},

	deleteMeetup: function deleteMeetup(req, res) {
		var meetup = parseInt(req.params.meetup_id);
		var queryDelete = 'delete from meetups where meetup_id = $1 RETURNING meetup_id';
		_connect2.default.query(queryDelete, [meetup]).then(function (data) {
			if (data.rowCount < 1) {
				return res.json({
					status: 404,
					error: " No Meetup found "
				});
			}
			return res.json({
				status: 200,
				message: "Successfully deleted " + data.rowCount + " Meetups row"
			});
		}).catch(function (e) {
			if (e.code === '22P02') {
				res.json({
					status: 400,
					error: "Characters are not Allowed"
				});
			} else if (e.name === 'error') {
				res.json({
					status: 500,
					error: "Internal Server Error Occurred"
				});
			}
		});
	},
	getMeetup: function getMeetup(req, res) {
		_connect2.default.query('select * from meetups').then(function (data) {
			if (data.rowCount < 1) {
				return res.json({
					status: 404,
					error: " No Meetup found "
				});
			}
			return res.json({
				status: 200,
				count: data.rowCount,
				data: data.rows,
				message: "All Meetup retrieve successfully"
			});
		}).catch(function (e) {
			if (e.name === 'error') {
				res.json({
					status: 500,
					error: "Internal Server Error Occurred"
				});
			}
		});
	},

	upcomingMeetup: function upcomingMeetup(req, res) {
		var date = new Date().toISOString();
		_connect2.default.query('select * from meetups where happeningon > $1', [date]).then(function (data) {
			if (data.rowCount < 1) {
				return res.json({
					status: 404,
					error: " No Meetup found "
				});
			}
			return res.json({
				status: 200,
				count: data.rowCount,
				data: data.rows,
				message: " All Up Coming Meetup retrieve Successfully"
			});
		}).catch(function (e) {
			if (e.name === 'error') {
				res.json({
					status: 500,
					error: "Internal Server Error Occurred"
				});
			}
		});
	},

	createQuestion: function createQuestion(req, res) {
		var result = _joi2.default.validate(req.body, _validator2.default.questions);
		if (result.error) {
			return res.status(400).send(result.error.details[0].message);
		}
		var _req$body2 = req.body,
		    meetup = _req$body2.meetup,
		    title = _req$body2.title,
		    body = _req$body2.body;
		var userId = req.userData.userId;

		var queryQst = 'INSERT INTO questions(createdon, createdby, meetup, title, body, vote)' + ' VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
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
			if (e.code === '23503') {
				return res.json({
					status: 404,
					error: "Meetup or user Doesn't Exist"
				});
			} else if (e.name === 'error') {
				res.json({
					status: 500,
					error: "Internal Server Error Occurred"
				});
			}
		});
	},

	comment: function comment(req, res) {
		var result = _joi2.default.validate(req.body, _validator2.default.comment);
		if (result.error) {
			return res.status(400).send(result.error.details[0].message);
		}
		console.log(req.body.question);
		_connect2.default.query("SELECT * FROM questions where question_id = $1", [req.body.question]).then(function (result) {
			console.log(result.rows[0]);
			if (result.rowCount < 1) {
				return res.json({
					status: 404,
					error: "Question  Doesn't exist"
				});
			}
			_connect2.default.query("INSERT INTO comments(questions, comment) VALUES($1, $2) RETURNING *", [req.body.question, req.body.comment]).then(function (data) {
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
				if (e.name === 'error') {
					return res.json({
						status: 500,
						error: "Internal Server Error Occurred"
					});
				}
			});
		}).catch(function (e) {
			if (e.code === '22P02') {
				return res.json({
					status: 400,
					error: "Characters are not Allowed"
				});
			} else if (e.name === 'error') {
				res.json({
					status: 500,
					error: "Internal Server Error Occurred"
				});
			}
		});
	},

	upvote: function upvote(req, res) {
		var queryvt = 'update questions set vote = vote + $1 where question_id = $2 RETURNING *';
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
					if (e.name === 'error') {
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
				if (e.name === 'error') {
					res.json({
						status: 500,
						error: "Internal Server Error Occurred"
					});
				}
			});
		}).catch(function (e) {
			if (e.code === '22P02') {
				return res.json({
					status: 400,
					error: "Characters are not Allowed"
				});
			} else if (e.name === 'error') {
				res.json({
					status: 500,
					error: "Internal Server Error Occurred"
				});
			}
		});
	},
	downVote: function downVote(req, res) {
		var queryvt = 'update questions set vote = vote - $1 where question_id = $2 RETURNING *';
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
					if (e.name === 'error') {
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
				if (e.name === 'error') {
					res.json({
						status: 500,
						error: "Internal Server Error Occurred"
					});
				}
			});
		}).catch(function (e) {
			if (e.code === '22P02') {
				return res.json({
					status: 400,
					error: "Characters are not Allowed"
				});
			} else if (e.name === 'error') {
				res.json({
					status: 500,
					error: "Internal Server Error Occurred"
				});
			}
		});
	},

	createRvsp: function createRvsp(req, res) {
		var meetup_id = parseInt(req.params.meetup_id);
		_connect2.default.query('select * from meetups where meetup_id = $1', [meetup_id]).then(function (data) {
			if (data.rowCount < 1) {
				return res.json({
					status: 404,
					error: " Meetup Doesn't Exist "
				});
			}
		}).catch(function (e) {
			if (e.name === 'error') {
				return res.json({
					status: 500,
					error: "Internal Server Error Occurred"
				});
			}
		});
		var result = _joi2.default.validate(req.body, _validator2.default.rsvp);
		if (result.error) {
			return res.status(400).send(result.error.details[0].message);
		}
		var response = req.body.response;
		var userId = req.userData.userId;

		var queryrsvp = 'INSERT INTO rsvp("user" , meetup, response) VALUES($1, $2, $3) RETURNING *';
		_connect2.default.query(queryrsvp, [userId, meetup_id, response]).then(function (data) {
			if (data.rowCount < 1) {
				return res.json({
					status: 404,
					error: " No Meetup Found "
				});
			}
			return res.json({
				status: 201,
				data: data.rows[0],
				message: "RSVP successfully created"
			});
		}).catch(function (e) {
			if (e.name === 'error') {
				res.json({
					status: 500,
					error: "Internal Server Error Occurred"
				});
			}
		});
	}

};