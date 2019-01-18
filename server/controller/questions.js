import db from "../db/connect";
import Joi from "joi";
import validat from "../middleware/validator";

const createQuestion = (req, res) => {
  const result = Joi.validate(req.body, validat.questions);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  let { meetup, title, body } = req.body;
  title = title.replace(/([#$@%><*/\\])/g, "").trim();
  body = body.replace(/([#$@%><*/\\])/g, "").trim();
  const { userId } = req.userData;
  const queryQst =
    "INSERT INTO questions(createdon, createdby, meetup, title, body, vote)" +
    " VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
  const queryValue = [
    new Date().toISOString(),
    parseInt(userId),
    parseInt(meetup),
    title,
    body,
    0
  ];
  db.query(queryQst, queryValue)
    .then(data => {
      if (data.rowCount < 1) {
        return res.json({
          status: 503,
          error: " Something Went Wrong!"
        });
      }
      return res.json({
        status: 201,
        data: data.rows[0],
        message: "Question successfully created"
      });
    })
    .catch(e => {
      if (e.code === "23503") {
        return res.json({
          status: 404,
          error: "Meetup  Doesn't Exist"
        });
      } else if (e.name === "error") {
        res.json({
          status: 500,
          error: "Internal Server Error Occurred"
        });
      }
    });
};

export default createQuestion;
