"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _connect = require("../db/connect");

var _connect2 = _interopRequireDefault(_connect);

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

var _validator = require("../middleware/validator");

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createRvsp = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var result, meetup, userId, response, findMeetup, userJoin, userResult;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						result = _joi2.default.validate(req.body, _validator2.default.rsvp);

						if (!result.error) {
							_context.next = 4;
							break;
						}

						res.status(400).send(result.error.details[0].message);
						return _context.abrupt("return");

					case 4:
						_context.prev = 4;
						meetup = parseInt(req.params.meetup_id);
						userId = req.userData.userId;
						response = req.body.response;
						_context.next = 10;
						return _connect2.default.query("SELECT * FROM meetups where meetup_id = $1", [meetup]);

					case 10:
						findMeetup = _context.sent;

						if (!(findMeetup.rows.length === 0)) {
							_context.next = 13;
							break;
						}

						return _context.abrupt("return", res.json({
							status: 404,
							error: "Meetup Doesn't Exist"
						}));

					case 13:
						_context.next = 15;
						return _connect2.default.query('SELECT * From rsvp where userid = $1 AND meetup = $2', [userId, meetup]);

					case 15:
						userJoin = _context.sent;

						if (!(userJoin.rows.length > 0)) {
							_context.next = 18;
							break;
						}

						return _context.abrupt("return", res.json({
							status: 400,
							error: "You have Already Joined the Meetup"
						}));

					case 18:
						_context.next = 20;
						return _connect2.default.query('INSERT INTO rsvp(userid, meetup, response) VALUES($1, $2, $3) RETURNING *', [userId, meetup, response.trim()]);

					case 20:
						userResult = _context.sent;

						console.log(userResult);
						return _context.abrupt("return", res.json({
							status: 200,
							data: userResult.rows[0],
							message: "Rsvp Successfull created"
						}));

					case 25:
						_context.prev = 25;
						_context.t0 = _context["catch"](4);

						console.log(_context.t0);

						if (!(_context.t0.name === "error")) {
							_context.next = 30;
							break;
						}

						return _context.abrupt("return", res.json({
							status: 500,
							error: "Internal Server Error Occurred"
						}));

					case 30:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, undefined, [[4, 25]]);
	}));

	return function createRvsp(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();
exports.default = createRvsp;