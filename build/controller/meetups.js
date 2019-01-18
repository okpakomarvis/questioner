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

		location = location.replace(/([#$@%><*/\\])/g, '').trim();
		topic = topic.replace(/([#$@%><*/\\])/g, '').trim();
		var imagepath = req.file.path;
		var queryMeetup = "INSERT INTO meetups(createdon, location, imagepath, topic, happeningon, tags)" + " VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
		var queryValue = [new Date().toISOString(), location, imagepath, topic, new Date(happeningOn).toISOString(), [tags]];
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
			console.log(e);
			if (e.name === "error") {
				res.json({
					status: 500,
					error: "Internal Server Error Occurred"
				});
			}
		});
	},

	singleMeetup: function singleMeetup(req, res) {
		var meetup_id = parseInt(req.params.meetup_id);
		_connect2.default.query("select * from meetups where meetup_id = $1 ", [meetup_id]).then(function (data) {
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
			if (e.code === "22P02") {
				res.json({
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

	deleteMeetup: function deleteMeetup(req, res) {
		var meetup = parseInt(req.params.meetup_id);
		var queryDelete = "delete from meetups where meetup_id = $1 RETURNING meetup_id";
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
			if (e.code === "22P02") {
				res.json({
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
	getMeetup: function getMeetup(req, res) {
		_connect2.default.query("select * from meetups").then(function (data) {
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
			if (e.name === "error") {
				res.json({
					status: 500,
					error: "Internal Server Error Occurred"
				});
			}
		});
	},

	upcomingMeetup: function upcomingMeetup(req, res) {
		var date = new Date().toISOString();
		_connect2.default.query("select * from meetups where happeningon > $1", [date]).then(function (data) {
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
			if (e.name === "error") {
				res.json({
					status: 500,
					error: "Internal Server Error Occurred"
				});
			}
		});
	}
};