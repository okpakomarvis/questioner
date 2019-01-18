"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	valUsers: {
		email: _joi2.default.string().trim().email({ minDomainAtoms: 2 }).max(100).required(),
		password: _joi2.default.string().trim().min(6).max(200).required(),
		username: _joi2.default.string().trim().min(5).max(80).required()

	},
	meetup: {
		topic: _joi2.default.string().trim().max(100).required(),
		location: _joi2.default.string().trim().max(30).required(),
		happeningOn: _joi2.default.date().required(),
		tags: _joi2.default.string().trim().max(20).required()
	},
	questions: {
		meetup: _joi2.default.number().required(),
		title: _joi2.default.string().trim().max(30).required(),
		body: _joi2.default.string().trim().max(50).required()
	},
	dateQuestion: {
		meetup: _joi2.default.number(),
		title: _joi2.default.string().trim().max(30),
		body: _joi2.default.string().trim().max(50),
		vote: _joi2.default.number()
	},
	rsvp: {
		response: _joi2.default.string().trim().max(6).required()
	},
	login: {
		email: _joi2.default.string().trim().email({ minDomainAtoms: 2 }).required(),
		password: _joi2.default.string().trim().required()
	},
	comment: {
		question: _joi2.default.number().required(),
		comment: _joi2.default.string().trim().max(200).required()
	}

};