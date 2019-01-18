import db from "../../db/connect";
import Joi from "joi";
import validat from "../../middleware/validator";
import bcrypt from "bcrypt";
import emailValidator from "email-validator";

const createUsers = (req, res) => {
  const result = Joi.validate(req.body, validat.valUsers);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const { email, username } = req.body;
  const validEmail = emailValidator.validate(email);
  if (validEmail === true) {
    db.query(
      "SELECT email, username FROM users where email= $1 AND username = $2",
      [email, username]
    )
      .then(user => {
        if (user.rowCount > 0) {
          return res.json({
            status: 409,
            message: "user already exist"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.json({
                status: 500,
                error: "Internal Server Error Occurred"
              });
            } else {
              const { username, email } = req.body;
              const queryUser =
                "INSERT INTO users(username, email, password, createdon, isadmin)" +
                " VALUES($1, $2, $3, $4, $5) RETURNING *";
              const queryValue = [
                username,
                email,
                hash,
                new Date().toISOString(),
                false
              ];
              db.query(queryUser, queryValue)
                .then(result => {
                  if (result.rowCount > 0) {
                    return res.json({
                      status: 201,
                      message: "user account successfully created"
                    });
                  }
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
            }
          });
        }
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
  } else {
    res.json({
      status: 401,
      message: "not a valid email"
    });
  }
};

export default createUsers;
