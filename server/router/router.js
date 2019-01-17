import express from "express";
import user from "../controller/users";
import sign from "../controller/signup";
import userlog from "../controller/login";
import validateimage from "../middleware/validateimage";
import upload from "../middleware/fileupload";
import check from "../middleware/authen";

const router = express.Router();

router.post("/auth/login", userlog);
router.post("/auth/signup", sign);
router.get("/meetups", check.authen, user.getMeetup);
router.post(
  "/meetups",
  check.authen,
  check.authenAdmin,
  upload.single("imagePath"),
  user.createMeetup
);
router.get("/meetups/upcoming/", check.authen, user.upcomingMeetup);
router.get("/meetups/:meetup_id", check.authen, user.singleMeetup);
router.delete(
  "/meetups/:meetup_id",
  check.authen,
  check.authenAdmin,
  user.deleteMeetup
);
router.post("/questions", check.authen, user.createQuestion);
router.post("/comments/", check.authen, user.comment);
router.patch("/questions/:question_id/upvote", check.authen, user.upvote);
router.patch("/questions/:question_id/downvote", check.authen, user.downVote);
router.post(
  "/meetups/:meetup_id/rsvp",
  check.authen,
  check.authenUser,
  user.createRvsp
);

export default router;
