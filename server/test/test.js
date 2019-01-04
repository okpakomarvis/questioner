/* eslint-disable no-unused-vars */
import chai from "chai";
import superfast from "supertest";
import should from "should";
import app from "../app";
const expect = chai.expect;
let request = superfast(app);

// eslint-disable-next-line no-undef
describe("GET /Meetups", ()=> {
	// eslint-disable-next-line no-undef
	it("Returns All Meetup List",(done)=> {
		request.get("/api/v1/meetups")
			.expect(200)
			.end(function(err, res) {
				// eslint-disable-next-line no-console
				expect(res.body).to.be.a("Object");
				done(err);
			});
	});
	// eslint-disable-next-line no-undef
	it("It Should test for Headers", function(done) {
		
		request.get("/api/v1/meetups")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.end(function(err, res) {
				done(err);
			});
	});
});

// eslint-disable-next-line no-undef
describe("POST /Meetups", ()=> {
	// eslint-disable-next-line no-undef
	it("It Should Not Create a new Meetups", (done)=>{
		request.post("/api/v1/meetups")
			.send({
				location:"abuja",
				imagePath:"./images/firstimage.jpg",
				topic:"Ebola sanitization conference",
				happeningOn:"01/20/2018",
				tag:"Health"	
			})
			.expect(400)
			.end(function(err, res) {
				done(err);
			});
	});
});
// eslint-disable-next-line no-undef
describe("GET /meetups/:meetup_id",()=>{
	// Testing how to find a meetup by id
	// eslint-disable-next-line no-undef
	it("Returns a Meetup by id", (done)=> {
		const newmeetup= {
			meetup_id:1,
			createdOn:"Tue 25 2018",
			location:"abuja",
			imagePath:"./images/firstimage.jpg",
			topic:"Ebola sanitization conference",
			happeningOn:"01/20/2018",
			tag:"Health"
		};
		request.get("/api/v1/meetups/" +newmeetup.meetup_id)
			.expect(200)
			.end(function(err, res) {
				expect(res.body.message).to.be.a("string");
				done(err);
			});
	});

});
// eslint-disable-next-line no-undef
describe("GET /Meetup/upcoming", ()=> {
	// eslint-disable-next-line no-undef
	it("Returns All Upcomming Meetup List",(done)=> {
		request.get("/api/v1/meetup/upcoming")
			.expect(200)
			.end(function(err, res) {
				// eslint-disable-next-line no-console
				expect(res.body).to.be.a("Object");
				done(err);
			});
	});
	// eslint-disable-next-line no-undef
	it("It Should test for Headers", function(done) {
		
		request.get("/api/v1/meetup/upcoming")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.end(function(err, res) {
				done(err);
			});
	});
});
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
// eslint-disable-next-line no-undef
describe("Patch /questions/:question_id/upvote", ()=> {
	// eslint-disable-next-line no-undef
	it("It should upvote a Question", (done)=>{
		request.patch("/api/v1/questions/2/upvote")
			.expect(200)
			.end(function(err, res) {
				expect(res.body.message).to.be.a("string");
				done(err);
			});
	});
});
// eslint-disable-next-line no-undef
describe("Patch /questions/:question_id/downvote", ()=> {
	// eslint-disable-next-line no-undef
	it("It should downvote a Question", (done)=>{
		request.patch("/api/v1/questions/2/downvote")
			.expect(200)
			.end(function(err, res) {
				expect(res.body.message).to.be.a("string");
				done(err);
			});
	});
	
});
// eslint-disable-next-line no-undef
describe("POST /meetups/:meetup_id/rsvp", ()=> {
	// eslint-disable-next-line no-undef
	it("It should Not Create a new Rsvp", (done)=>{
		request.post("api/v1/meetups/3/rsvp")
			.send({
				user:2,
				meetup:3,
				response:"Yes"
			})
			.expect(400)
			.end(function(err, res) {
				done();
			});
	});
});

