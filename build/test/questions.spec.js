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
describe("POST /questions", function () {
	// eslint-disable-next-line no-undef
	it("It should Not Create a new Question", function (done) {
		request.post("/api/v1/questions").send({
			createdBy: 1,
			meetup: 1,
			title: "When is the Orientation",
			body: "can anyone give me a clue",
			vote: 0
		}).expect(400).end(function (err, res) {
			expect(res.body.message).to.be.a("undefined");
			done(err);
		});
	});
});