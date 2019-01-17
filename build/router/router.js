"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _users = require("../controller/users");

var _users2 = _interopRequireDefault(_users);

var _signup = require("../controller/signup");

var _signup2 = _interopRequireDefault(_signup);

var _login = require("../controller/login");

var _login2 = _interopRequireDefault(_login);

var _validateimage = require("../middleware/validateimage");

var _validateimage2 = _interopRequireDefault(_validateimage);

var _fileupload = require("../middleware/fileupload");

var _fileupload2 = _interopRequireDefault(_fileupload);

var _authen = require("../middleware/authen");

var _authen2 = _interopRequireDefault(_authen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.post("/auth/login", _login2.default);
router.post("/auth/signup", _signup2.default);
router.get("/meetups", _authen2.default.authen, _users2.default.getMeetup);
router.post("/meetups", _authen2.default.authen, _authen2.default.authenAdmin, _fileupload2.default.single("imagePath"), _users2.default.createMeetup);
router.get("/meetups/upcoming/", _authen2.default.authen, _users2.default.upcomingMeetup);
router.get("/meetups/:meetup_id", _authen2.default.authen, _users2.default.singleMeetup);
router.delete("/meetups/:meetup_id", _authen2.default.authen, _authen2.default.authenAdmin, _users2.default.deleteMeetup);
router.post("/questions", _authen2.default.authen, _users2.default.createQuestion);
router.post("/comments/", _users2.default.comment);
router.patch("/questions/:question_id/upvote", _authen2.default.authen, _users2.default.upvote);
router.patch("/questions/:question_id/downvote", _authen2.default.authen, _users2.default.downVote);
router.post("/meetups/:meetup_id/rsvp", _authen2.default.authen, _authen2.default.authenUser, _users2.default.createRvsp);

exports.default = router;