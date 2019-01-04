import db from "../db/dbuser";
import Joi from "joi";
import validat from "../middleware/validator";

exports.createMeetup = (req, res, next) =>{
	// eslint-disable-next-line no-console
	const result = Joi.validate(req.body, validat.meetup);
	if(result.error){
		res.status(400).send(result.error.details[0].message);
		return;
	} 
	const newMeetup = {
		meetup_id: db.meetup.length +1,
		createdOn: new Date().toLocaleString(),
		location: req.body.location,
		imagePath: req.file.path,
		topic: req.body.topic,
		happeningOn: new Date(req.body.happeningOn).toGMTString(),
		tag: req.body.tag
	};
	db.meetup.push(newMeetup);
	res.json({
		status: 201,
		data: newMeetup,
		message:"Meetup successfully created"
	});
	next();
};
exports.singleMeetup =(req, res, next)=> {
	const singleMeetup = db.meetup.find(c=> c.meetup_id === parseInt(req.params.meetup_id));
	if(!singleMeetup){
		return res.json({
			status:"404",
			error:"No Meetup found"
		});
	}
	res.json({
		status:200,
		data: singleMeetup,
		message: "Meetup retrieve successfully "
	});
	next();
};
exports.getMeetup = (req, res, next)=> {
	if(!db.meetup){
		return res.json({
			status: "500",
			error: "Internal Server Error"
		});
	}
	res.json({
		status: 200,
		count:db.meetup.length,
		data: db.meetup,
		message : "All Meetup retrieve successfully"
	});
	next();
};
exports.upcomingMeetup = (req, res, next) =>{
	const date = new Date().toGMTString();
	let upmeetup = db.meetup.filter(obj=> {	
		return obj.happeningOn > date;
	});
	if(upmeetup.length ===0){
		return res.json({
			status: 404,
			error : "No Up ComingMeetup Found"
		});
	} 
	res.json({
		status: 200,
		data: upmeetup,
		message: "All Up Coming Meetup retrieve Successfully"
	});
	next();
};
exports.createQuestion = (req, res, next) =>{
	const result = Joi.validate(req.body, validat.questions);
	if(result.error){
		res.status(400).send(result.error.details[0].message);
		return;
	} 
	const newQuestion = {
		question_id: db.question.length +1,
		createdOn: new Date().toLocaleString(),
		createdBy:req.body.user_id,
		meetup:req.body.meetup_id,
		title:req.body.title,
		body:req.body.body,
		vote:0
	};
	db.question.push(newQuestion);
	res.json({
		status: 201,
		data: newQuestion,
		message:"Question successfully created"
	});
	next();
};
exports.upvote = (req, res, next) => {
	const upvoteQ = db.question.find(c => c.question_id === parseInt(req.params.question_id));
	if(!upvoteQ) {
		return res.json({
			status: 404,
			error: " No Question Found "
		});
	}
	upvoteQ.meetup = req.body.meetup;
	upvoteQ.title = req.body.title;
	upvoteQ.body = req.body.body;
	upvoteQ.vote  += 1;
	res.json({ 
		status:"201",
		data: upvoteQ,
		message: " upvote successfully!"
	});

	next();
};
exports.downVote = (req, res, next) => {
	const downVote = db.question.find(c => c.question_id === parseInt(req.params.question_id));
	if(!downVote) {
		return res.json({
			status: 404,
			error: " No Question Found "
		});
	}
	downVote.meetup = req.body.meetup;
	downVote.title = req.body.title;
	downVote.body = req.body.body;
	downVote.vote -= 1; 
	res.json({ 
		status: 201,
		data: downVote,
		message: "downvote successfull!"
	});
	
	next();
};
exports.createRvsp = (req, res, next) =>{
	const meetup = db.meetup.find(c=> c.meetup_id === parseInt(req.params.meetup_id));
	if(!meetup){
		return res.json({
			status:"404",
			error:"No Meetup found"
		});
	}
	const result = Joi.validate(req.body, validat.rsvp);
	if(result.error){
		res.status(400).send(result.error.details[0].message);
		return;
	} 
	const newRsvp = {
		rsvp_id: db.rsvp.length +1,
		user:req.body.user_id,
		meetup:meetup.meetup_id,
		response:req.body.response
	};
	db.question.push(newRsvp);
	res.json({
		status: 201,
		data: newRsvp,
		message:"RSVP successfully created"
	});
	
	next();
};
