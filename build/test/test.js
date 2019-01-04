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
describe("GET /Meetups", function () {
	// eslint-disable-next-line no-undef
	it("Returns All Meetup List", function (done) {
		request.get("/api/v1/meetups").expect(200).end(function (err, res) {
			// eslint-disable-next-line no-console
			expect(res.body).to.be.a("Object");
			done(err);
		});
	});
	// eslint-disable-next-line no-undef
	it("It Should test for Headers", function (done) {

		request.get("/api/v1/meetups").set("Accept", "application/json").expect("Content-Type", /json/).end(function (err, res) {
			done(err);
		});
	});
});

// eslint-disable-next-line no-undef
describe("POST /Meetups", function () {
	// eslint-disable-next-line no-undef
	it("It Should Not Create a new Meetups", function (done) {
		request.post("/api/v1/meetups").send({
			location: "abuja",
			imagePath: "./images/firstimage.jpg",
			topic: "Ebola sanitization conference",
			happeningOn: "01/20/2018",
			tag: "Health"
		}).expect(400).end(function (err, res) {
			done(err);
		});
	});
});
// eslint-disable-next-line no-undef
describe("GET /meetups/:meetup_id", function () {
	// Testing how to find a meetup by id
	// eslint-disable-next-line no-undef
	it("Returns a Meetup by id", function (done) {
		var newmeetup = {
			meetup_id: 1,
			createdOn: "Tue 25 2018",
			location: "abuja",
			imagePath: "./images/firstimage.jpg",
			topic: "Ebola sanitization conference",
			happeningOn: "01/20/2018",
			tag: "Health"
		};
		request.get("/api/v1/meetups/" + newmeetup.meetup_id).expect(200).end(function (err, res) {
			expect(res.body.message).to.be.a("string");
			done(err);
		});
	});
});
// eslint-disable-next-line no-undef
describe("GET /Meetup/upcoming", function () {
	// eslint-disable-next-line no-undef
	it("Returns All Upcomming Meetup List", function (done) {
		request.get("/api/v1/meetup/upcoming").expect(200).end(function (err, res) {
			// eslint-disable-next-line no-console
			expect(res.body).to.be.a("Object");
			done(err);
		});
	});
	// eslint-disable-next-line no-undef
	it("It Should test for Headers", function (done) {

		request.get("/api/v1/meetup/upcoming").set("Accept", "application/json").expect("Content-Type", /json/).end(function (err, res) {
			done(err);
		});
	});
});
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
// eslint-disable-next-line no-undef
describe("Patch /questions/:question_id/upvote", function () {
	// eslint-disable-next-line no-undef
	it("It should upvote a Question", function (done) {
		request.patch("/api/v1/questions/2/upvote").expect(200).end(function (err, res) {
			expect(res.body.message).to.be.a("string");
			done(err);
		});
	});
});
// eslint-disable-next-line no-undef
describe("Patch /questions/:question_id/downvote", function () {
	// eslint-disable-next-line no-undef
	it("It should downvote a Question", function (done) {
		request.patch("/api/v1/questions/2/downvote").expect(200).end(function (err, res) {
			expect(res.body.message).to.be.a("string");
			done(err);
		});
	});
});
// eslint-disable-next-line no-undef
describe("POST /meetups/:meetup_id/rsvp", function () {
	// eslint-disable-next-line no-undef
	it("It should Not Create a new Rsvp", function (done) {
		request.post("api/v1/meetups/3/rsvp").send({
			user: 2,
			meetup: 3,
			response: "Yes"
		}).expect(400).end(function (err, res) {
			done();
		});
	});
});