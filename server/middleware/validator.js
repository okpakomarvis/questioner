import Joi from "joi";
exports.meetup={
	topic:Joi.string().max(40).required(),
	location:Joi.string().max(30).required(),
	happeningOn:Joi.date().required(),
	tag:Joi.string().max(20).required()
};
exports.questions={
	user_id:Joi.number().required(),
	meetup_id: Joi.number().required(),
	title: Joi.string().max(30).required(),
	body: Joi.string().max(50).required()
};
exports.dateQuestion ={
	meetup:Joi.number(),
	title:Joi.string().max(30),
	body: Joi.string().max(50),
	vote: Joi.number()
};
exports.rsvp ={
	user_id:Joi.number().required(),
	topic:Joi.string().max(40).required(),
	response: Joi.string().max(6).required()
};
exports.valUsers={
	username:Joi.string().min(3).max(25).required(),
	email:Joi.string().min(3).max(30).required(),
	password:Joi.string().min(6).max(20).required()
};
