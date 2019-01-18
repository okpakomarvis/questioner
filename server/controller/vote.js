import db from "../db/connect";

export default {
  upvote: (req, res) => {
    const queryvt =
      "update questions set vote = vote + $1 where question_id = $2 RETURNING *";
    const queryValue = [1, parseInt(req.params.question_id)];
    db.query(queryvt, queryValue)
      .then(data => {
        if (data.rowCount < 1) {
          return res.json({
            status: 404,
            error: "No Question Found"
          });
        }
        db.query(
          "SELECT user_id , questions FROM upvote where questions = $1",
          [req.params.question_id]
        )
          .then(result => {
            if (result.rowCount > 0) {
              return res.json({
                status: 201,
                error: "Sorry you have Already Upvoted this question before"
              });
            }
            const { userId } = req.userData;
            db.query("INSERT INTO upvote( questions, user_id) VALUES($1, $2)", [
              req.params.question_id,
              userId
            ])
              .then()
              .catch(e => {
                if (e.name === "error") {
                  return res.json({
                    status: 500,
                    error: "Internal Server Error Occurred"
                  });
                }
              });
            return res.json({
              status: 201,
              data: data.rows[0],
              message: " upvote successfully!"
            });
          })
          .catch(e => {
            console.log(e);
            if (e.name === "error") {
              res.json({
                status: 500,
                error: "Internal Server Error Occurred"
              });
            }
          });
      })
      .catch(e => {
        console.log(e);
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
  },

  downVote: (req, res) => {
    const queryvt =
      "update questions set vote = vote - $1 where question_id = $2 RETURNING *";
    const queryValue = [1, parseInt(req.params.question_id)];
    db.query(queryvt, queryValue)
      .then(data => {
        if (data.rowCount < 1) {
          return res.json({
            status: 404,
            error: "No Question Found"
          });
        }
        db.query(
          "SELECT user_id , questions FROM downvote where questions = $1",
          [req.params.question_id]
        )
          .then(result => {
            if (result.rowCount > 0) {
              return res.json({
                status: 201,
                error: "Sorry you have Already downvoted this question before"
              });
            }
            const { userId } = req.userData;
            db.query(
              "INSERT INTO downvote( questions, user_id) VALUES($1, $2)",
              [req.params.question_id, userId]
            )
              .then()
              .catch(e => {
                if (e.name === "error") {
                  return res.json({
                    status: 500,
                    error: "Internal Server Error Occurred"
                  });
                }
              });
            return res.json({
              status: 201,
              data: data.rows[0],
              message: " upvote successfully!"
            });
          })
          .catch(e => {
            if (e.name === "error") {
              res.json({
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
  }
};
