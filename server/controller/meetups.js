import db from "../db/connect";
import Joi from "joi";
import validat from "../middleware/validator";

export default {
  createMeetup: (req, res) => {
    const result = Joi.validate(req.body, validat.meetup);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    let { location, topic, happeningOn, tags } = req.body;
    location = location.replace(/([#$@%><*/\\])/g, "").trim();
    topic = topic.replace(/([#$@%><*/\\])/g, "").trim();
    const imagepath = req.file.path;
    const queryMeetup =
      "INSERT INTO meetups(createdon, location, imagepath, topic, happeningon, tags)" +
      " VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
    const queryValue = [
      new Date().toISOString(),
      location,
      imagepath,
      topic,
      new Date(happeningOn).toISOString(),
      [tags]
    ];
    db.query(queryMeetup, queryValue)
      .then(data => {
        if (data.rowCount < 1) {
          return res.json({
            status: 503,
            error: " Something Went Wrong "
          });
        }
        return res.json({
          status: 201,
          data: data.rows[0],
          message: "Meetup successfully created"
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
  },

  singleMeetup: (req, res) => {
    const meetup_id = parseInt(req.params.meetup_id);
    db.query("select * from meetups where meetup_id = $1 ", [meetup_id])
      .then(data => {
        if (data.rowCount < 1) {
          return res.json({
            status: 404,
            error: " No Meetup found "
          });
        }
        return res.json({
          status: 200,
          data: data.rows[0],
          message: " Meetup retrieve successfully "
        });
      })
      .catch(e => {
        if (e.code === "22P02") {
          res.json({
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

  deleteMeetup: (req, res) => {
    const meetup = parseInt(req.params.meetup_id);
    const queryDelete =
      "delete from meetups where meetup_id = $1 RETURNING meetup_id";
    db.query(queryDelete, [meetup])
      .then(data => {
        if (data.rowCount < 1) {
          return res.json({
            status: 404,
            error: " No Meetup found "
          });
        }
        return res.json({
          status: 200,
          message: `Successfully deleted ${data.rowCount} Meetups row`
        });
      })
      .catch(e => {
        if (e.code === "22P02") {
          res.json({
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
  getMeetup: (req, res) => {
    db.query("select * from meetups")
      .then(data => {
        if (data.rowCount < 1) {
          return res.json({
            status: 404,
            error: " No Meetup found "
          });
        }
        return res.json({
          status: 200,
          count: data.rowCount,
          data: data.rows,
          message: "All Meetup retrieve successfully"
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
  },

  upcomingMeetup: (req, res) => {
    const date = new Date().toISOString();
    db.query("select * from meetups where happeningon > $1", [date])
      .then(data => {
        if (data.rowCount < 1) {
          return res.json({
            status: 404,
            error: " No Meetup found "
          });
        }
        return res.json({
          status: 200,
          count: data.rowCount,
          data: data.rows,
          message: " All Up Coming Meetup retrieve Successfully"
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
  }
};
