/* eslint-disable no-unused-vars */
import chai from "chai";
import superfast from "supertest";
import should from "should";
import app from "../app";
const expect = chai.expect;
let request = superfast(app);

// eslint-disable-next-line no-undef
describe("POST /questions", ()=> {
	// eslint-disable-next-line no-undef
	it("It should Not Create a new Question", (done)=>{
		request.post("/api/v1/questions")
			.send({
				createdBy:1,
				meetup:1,
				title:"When is the Orientation",
				body:"can anyone give me a clue",
				vote:0
			})
			.expect(400)
			.end(function(err, res) {
				expect(res.body.message).to.be.a("undefined");
				done(err);
			});
	});
});
