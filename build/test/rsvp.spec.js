"use strict";

var _supertest = require("supertest");

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require("../app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = (0, _supertest2.default)(_app2.default);

// eslint-disable-next-line no-undef
describe("POST /meetups/:meetup_id/rsvp", function () {
	// eslint-disable-next-line no-undef
	it("It should Not Create a new Rsvp", function (done) {
		request.post("api/v1/meetups/3/rsvp").send({
			user: 2,
			meetup: 3,
			response: "Yes"
		}).expect(400).end(function () {
			done();
		});
	});
});