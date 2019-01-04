"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _users = require("../controller/users");

var _users2 = _interopRequireDefault(_users);

var _fileupload = require("../middleware/fileupload");

var _fileupload2 = _interopRequireDefault(_fileupload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.get("/meetups", _users2.default.getMeetup);
router.post("/meetups", _fileupload2.default.single("imagePath"), _users2.default.createMeetup);
router.get("/meetups/:meetup_id", _users2.default.singleMeetup);
router.get("/meetup/upcoming/", _users2.default.upcomingMeetup);
router.post("/questions", _users2.default.createQuestion);
router.patch("/questions/:question_id/upvote", _users2.default.upvote);
router.patch("/questions/:question_id/downvote", _users2.default.downVote);
router.post("/meetups/:meetup_id/rsvp", _users2.default.createRvsp);
exports.default = router;