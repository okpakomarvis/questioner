"use strict";

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require("supertest");

var _supertest2 = _interopRequireDefault(_supertest);

var _should = require("should");

var _should2 = _interopRequireDefault(_should);

var _app = require("../app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
var expect = _chai2.default.expect;
var request = (0, _supertest2.default)(_app2.default);
// eslint-disable-next-line no-undef
describe("Patch /questions/:question_id/upvote", function () {
	// eslint-disable-next-line no-undef
	it("It should upvote a Question", function (done) {
		request.patch("/api/v1/questions/1/upvote").expect(200).end(function (err, res) {
			done(err);
		});
	});
});
// eslint-disable-next-line no-undef
describe("Patch /questions/:question_id/downvote", function () {
	// eslint-disable-next-line no-undef
	it("It should downvote a Question", function (done) {
		request.patch("/api/v1/questions/1/downvote").expect(200).end(function (err, res) {
			done(err);
		});
	});
});