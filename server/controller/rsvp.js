import db from "../db/connect";
import Joi from "joi";
import validat from "../middleware/validator";

const createRvsp = async (req, res) => {
  const result = Joi.validate(req.body, validat.rsvp);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  try {
    const meetup = parseInt(req.params.meetup_id);
    const { userId } = req.userData;
    const response = req.body.response;
    const findMeetup = await db.query(
      "SELECT * FROM meetups where meetup_id = $1",
      [meetup]
    );
    if (findMeetup.rows.length === 0) {
      return res.json({
        status: 404,
        error: "Meetup Doesn't Exist"
      });
    }
    const userJoin = await db.query(
      "SELECT * From rsvp where userid = $1 AND meetup = $2",
      [userId, meetup]
    );
    if (userJoin.rows.length > 0) {
      return res.json({
        status: 400,
        error: "You have Already Joined the Meetup"
      });
    }
    const userResult = await db.query(
      "INSERT INTO rsvp(userid, meetup, response) VALUES($1, $2, $3) RETURNING *",
      [userId, meetup, response.trim()]
    );
    console.log(userResult);
    return res.json({
      status: 200,
      data: userResult.rows[0],
      message: "Rsvp Successfull created"
    });
  } catch (e) {
    console.log(e);
    if (e.name === "error") {
      return res.json({
        status: 500,
        error: "Internal Server Error Occurred"
      });
    }
  }
};
export default createRvsp;
