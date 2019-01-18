/* eslint-disable no-unused-vars */
import chai from "chai";
import superfast from "supertest";
import should from "should";
import app from "../app";

const expect = chai.expect;
let request = superfast(app);

// eslint-disable-next-line no-undef
describe("Patch /questions/:question_id/upvote", () => {
  // eslint-disable-next-line no-undef
  it("It should upvote a Question", done => {
    request
      .patch("/api/v1/questions/1/upvote")
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });
});
// eslint-disable-next-line no-undef
describe("Patch /questions/:question_id/downvote", () => {
  // eslint-disable-next-line no-undef
  it("It should downvote a Question", done => {
    request
      .patch("/api/v1/questions/1/downvote")
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });
});
