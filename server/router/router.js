import express from "express";
import sign from "../controller/authen/signup";
import userlog from "../controller/authen/login";
import meetup from "../controller/meetups";
import questions from "../controller/questions";
import comment from "../controller/comments";
import vote from "../controller/vote";
import rsvp from "../controller/rsvp";
import upload from "../middleware/fileupload";
import check from "../middleware/authen";
import validatersvp from "../middleware/validateRsvp";

const router = express.Router();

router.post("/auth/login", userlog);
router.post("/auth/signup", sign);
router.get("/meetups", check.authen, meetup.getMeetup);
router.post(
  "/meetups",
  check.authen,
  check.authenAdmin,
  upload.single("imagePath"),
  meetup.createMeetup
);
router.get("/meetups/upcoming/", check.authen, meetup.upcomingMeetup);
router.get("/meetups/:meetup_id", check.authen, meetup.singleMeetup);
router.delete(
  "/meetups/:meetup_id",
  check.authen,
  check.authenAdmin,
  meetup.deleteMeetup
);
router.post("/questions", check.authen, questions);
router.post("/comments/", check.authen, comment);
router.patch("/questions/:question_id/upvote", check.authen, vote.upvote);
router.patch("/questions/:question_id/downvote", check.authen, vote.downVote);
router.post(
  "/meetups/:meetup_id/rsvp",
  check.authen,
  check.authenUser,
  validatersvp,
  rsvp
);

export default router;
