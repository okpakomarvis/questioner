"use strict";

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.meetup = {
	topic: _joi2.default.string().max(40).required(),
	location: _joi2.default.string().max(30).required(),
	happeningOn: _joi2.default.date().required(),
	tag: _joi2.default.string().max(20).required()
};
exports.questions = {
	user_id: _joi2.default.number().required(),
	meetup_id: _joi2.default.number().required(),
	title: _joi2.default.string().max(30).required(),
	body: _joi2.default.string().max(50).required()
};
exports.dateQuestion = {
	meetup: _joi2.default.number(),
	title: _joi2.default.string().max(30),
	body: _joi2.default.string().max(50),
	vote: _joi2.default.number()
};
exports.rsvp = {
	user_id: _joi2.default.number().required(),
	topic: _joi2.default.string().max(40).required(),
	response: _joi2.default.string().max(6).required()
};
exports.valUsers = {
	username: _joi2.default.string().min(3).max(25).required(),
	email: _joi2.default.string().min(3).max(30).required(),
	password: _joi2.default.string().min(6).max(20).required()
};