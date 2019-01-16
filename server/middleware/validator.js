import Joi from "joi";

export default {
	valUsers: {
		email: Joi.string().trim().max(100).required(),
		password: Joi.string().trim().min(6).max(200).required(),
		username: Joi.string().trim().min(5).max(80).required()
		
	},
	meetup:{
		topic:Joi.string().trim().max(100).required(),
		location:Joi.string().trim().max(30).required(),
		happeningOn:Joi.date().required(),
		tags:Joi.string().trim().max(20).required()
	},
	questions:{
		createdBy:Joi.number().required(),
		meetup: Joi.number().required(),
		title: Joi.string().trim().max(30).required(),
		body: Joi.string().trim().max(50).required()
	},
	dateQuestion:{
		meetup:Joi.number(),
		title:Joi.string().trim().max(30),
		body: Joi.string().trim().max(50),
		vote: Joi.number()
	},
	rsvp:{
		user:Joi.number().required(),
		meetup:Joi.number().required(),
		response: Joi.string().trim().max(6).required()
	},
	login:{
		email: Joi.string().trim().required(),
		password:Joi.string().trim().required()
	}

};
