import db from "../db/connect";
import Joi from "joi";
import validat from "../middleware/validator";

const comment = (req, res) => {
  const result = Joi.validate(req.body, validat.comment);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  let comment = req.body.comment;
  comment = comment.replace(/([#$@%><*/\\])/g, "").trim();
  const { userId } = req.userData;
  db.query("SELECT * FROM questions where question_id = $1", [
    req.body.question
  ])
    .then(result => {
      if (result.rowCount < 1) {
        return res.json({
          status: 404,
          error: "Question  Doesn't exist"
        });
      }
      db.query(
        "INSERT INTO comments(question, userid, comment) VALUES($1, $2, $3) RETURNING *",
        [req.body.question, userId, comment]
      )
        .then(data => {
          if (data.rowCount < 1) {
            return res.json({
              status: 503,
              error: "Something Went Wrong"
            });
          }
          const returnResult = {
            id: data.rows[0].comment_id,
            question: result.rows[0].question_id,
            title: result.rows[0].title,
            body: result.rows[0].body,
            comment: data.rows[0].comment
          };
          return res.json({
            status: 201,
            data: returnResult,
            message: " Comment Successfully Created "
          });
        })
        .catch(e => {
          if (e.name === "error") {
            return res.json({
              status: 500,
              error: "Internal Server Error Occurred"
            });
          }
        });
    })
    .catch(e => {
      if (e.code === "22P02") {
        return res.json({
          status: 400,
          error: "Characters are not Allowed"
        });
      } else if (e.name === "error") {
        res.json({
          status: 500,
          error: "Internal Server Error Occurred"
        });
      }
    });
};

export default comment;
