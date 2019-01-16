import superfast from "supertest";
import app from "../app";
let request = superfast(app);

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
			.end(function() {
				done();
			});
	});
});

