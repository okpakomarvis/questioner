"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _signup = require("../controller/authen/signup");

var _signup2 = _interopRequireDefault(_signup);

var _login = require("../controller/authen/login");

var _login2 = _interopRequireDefault(_login);

var _meetups = require("../controller/meetups");

var _meetups2 = _interopRequireDefault(_meetups);

var _questions = require("../controller/questions");

var _questions2 = _interopRequireDefault(_questions);

var _comments = require("../controller/comments");

var _comments2 = _interopRequireDefault(_comments);

var _vote = require("../controller/vote");

var _vote2 = _interopRequireDefault(_vote);

var _rsvp = require("../controller/rsvp");

var _rsvp2 = _interopRequireDefault(_rsvp);

var _fileupload = require("../middleware/fileupload");

var _fileupload2 = _interopRequireDefault(_fileupload);

var _authen = require("../middleware/authen");

var _authen2 = _interopRequireDefault(_authen);

var _validateRsvp = require("../middleware/validateRsvp");

var _validateRsvp2 = _interopRequireDefault(_validateRsvp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post("/auth/login", _login2.default);
router.post("/auth/signup", _signup2.default);
router.get("/meetups", _authen2.default.authen, _meetups2.default.getMeetup);
router.post("/meetups", _authen2.default.authen, _authen2.default.authenAdmin, _fileupload2.default.single("imagePath"), _meetups2.default.createMeetup);
router.get("/meetups/upcoming/", _authen2.default.authen, _meetups2.default.upcomingMeetup);
router.get("/meetups/:meetup_id", _authen2.default.authen, _meetups2.default.singleMeetup);
router.delete("/meetups/:meetup_id", _authen2.default.authen, _authen2.default.authenAdmin, _meetups2.default.deleteMeetup);
router.post("/questions", _authen2.default.authen, _questions2.default);
router.post("/comments/", _authen2.default.authen, _comments2.default);
router.patch("/questions/:question_id/upvote", _authen2.default.authen, _vote2.default.upvote);
router.patch("/questions/:question_id/downvote", _authen2.default.authen, _vote2.default.downVote);
router.post("/meetups/:meetup_id/rsvp", _authen2.default.authen, _authen2.default.authenUser, _validateRsvp2.default, _rsvp2.default);

exports.default = router;