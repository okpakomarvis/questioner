/* eslint-disable quotes */
import db from "../db/connect";
import Joi from "joi";
import validat from "../middleware/validator";
import authen from "../middleware/authen";

export default {
	createMeetup:(req, res)=> {
		const result = Joi.validate(req.body, validat.meetup);
		if(result.error){
			return res.status(400).send(result.error.details[0].message);
			
		} 
		const { location, topic, happeningOn, tags } = req.body;
		const imagepath = req.file.path;
		const queryMeetup ='INSERT INTO meetups(createdon, location, imagepath,topic, happeningon, tags)'+
							' VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
		const queryValue =[new Date().toISOString(), location, imagepath, topic, new Date(happeningOn).toISOString(), tags];
		db.query(queryMeetup, queryValue)
			.then(data =>{
				if(data.rowCount < 1){
					return res.json({
						status: 503,
						error: " Something Went Wrong "
					});
					
				}
				return res.json({
					status: 201,
					data: data.rows[0],
					message:"Meetup successfully created"
				});
			})
			.catch(e =>{
				if(e.name==='error'){
					res.json({
						status: 500,
						error: "Internal Server Error Occurred"
					});
					
				}	
			});
	},
	singleMeetup:(req, res)=> {
		const meetup_id = parseInt(req.params.meetup_id);
		db.query('select * from meetups where meetup_id = $1 ', [meetup_id])
			.then(data =>{
				if(data.rowCount < 1){
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
				if(e.code==='22P02'){
					res.json({
						status: 400,
						error: "Characters are not Allowed"
					});
					
				}else if(e.name==='error'){
					res.json({
						status: 500,
						error: "Internal Server Error Occurred"
					});
					
				}
				
			});
	},

	deleteMeetup:(req, res)=> {
		const meetup = parseInt(req.params.meetup_id);
		const queryDelete =	'delete from meetups where meetup_id = $1 RETURNING meetup_id';
		db.query(queryDelete, [meetup])
			.then(data =>{
				if(data.rowCount < 1){
					return res.json({
						status: 404,
						error: " No Meetup found "
					});	
				}
				return res.json({
					status:200,
					message: `Successfully deleted ${data.rowCount} Meetups row`
				});
			})
			.catch(e =>{
				if(e.code==='22P02'){
					res.json({
						status: 400,
						error: "Characters are not Allowed"
					});
					
				}else if(e.name==='error'){
					res.json({
						status: 500,
						error: "Internal Server Error Occurred"
					});
					
				}
			});
	},
	getMeetup:(req, res)=> {
		db.query('select * from meetups')
			.then(data =>{
				if(data.rowCount < 1){
					return res.json({
						status: 404,
						error: " No Meetup found "
					});	
				}
				return res.json({
					status: 200,
					count:data.rowCount,
					data: data.rows,
					message: "All Meetup retrieve successfully"
				});
			})
			.catch(e =>{
				if(e.name === 'error'){
					res.json({
						status: 500,
						error: "Internal Server Error Occurred"
					});
					
				}
			});
	},

	upcomingMeetup:(req, res) =>{
		const date = new Date().toISOString();
		db.query('select * from meetups where happeningon > $1', [date])
			.then(data =>{
				if(data.rowCount < 1){
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
			.catch(e =>{
				if(e.name === 'error'){
					res.json({
						status: 500,
						error: "Internal Server Error Occurred"
					});
					
				}
			});	
	},

	createQuestion:(req, res) =>{
		const result = Joi.validate(req.body, validat.questions);
		if(result.error){
			return	res.status(400).send(result.error.details[0].message);
		} 
		const { meetup, title, body} = req.body;
		const {userId} = req.userData;
		const queryQst ='INSERT INTO questions(createdon, createdby, meetup, title, body, vote)'+
						' VALUES($1, $2, $3, $4, $5, $6) RETURNING *' ;
		const queryValue = [ new Date().toISOString(), parseInt(userId), parseInt(meetup), title, body, 0];
		db.query(queryQst, queryValue)
			.then(data =>{
				if(data.rowCount < 1){
					return res.json({
						status: 503,
						error: " Something Went Wrong!"
					});	
				}
				return res.json({
					status: 201,
					data: data.rows[0],
					message:"Question successfully created"
				});
			})
			.catch(e =>{
				if(e.code === '23503'){
					return res.json({
						status: 404,
						error: "Meetup or user Doesn't Exist"
					});
					
				}else if(e.name === 'error'){
					res.json({
						status: 500,
						error: "Internal Server Error Occurred"
					});
					
				}
			});
	},

	comment:(req, res) =>{
		const result = Joi.validate(req.body, validat.comment);
		if(result.error){
			return	res.status(400).send(result.error.details[0].message);
		} 
	    console.log(req.body.question);
		db.query("SELECT * FROM questions where question_id = $1", [req.body.question])
			.then(result=>{
				console.log(result.rows[0]);
				if(result.rowCount <1){
					return res.json({
						status:404,
						error: "Question  Doesn't exist"
					});
				}
				db.query("INSERT INTO comments(questions, comment) VALUES($1, $2) RETURNING *",
					[req.body.question, req.body.comment])
					.then(data=>{
						if(data.rowCount <1){
							return res.json({
								status: 503,
								error: "Something Went Wrong"
							});
						}
						const returnResult ={
							id: data.rows[0].comment_id,
							question: result.rows[0].question_id,
							title: result.rows[0].title,
							body : result.rows[0].body,
							comment: data.rows[0].comment,
						};
						return res.json({
							status:201,
							data: returnResult,
							message: " Comment Successfully Created "
						});
					})
					.catch(e=>{
						if(e.name === 'error'){
							return res.json({
								status: 500,
								error: "Internal Server Error Occurred"
							});
						}
					});	
			})
			.catch(e=>{
				if(e.code === '22P02'){
					return res.json({
						status: 400,
						error: "Characters are not Allowed"
					});
					
				}else if(e.name === 'error'){
					res.json({
						status: 500,
						error: "Internal Server Error Occurred"
					});
					
				}
			});
	},

	upvote:(req, res) => {
		const queryvt = 'update questions set vote = vote + $1 where question_id = $2 RETURNING *';
		const queryValue = [ 1 , parseInt(req.params.question_id)] ;
		db.query(queryvt, queryValue)
			.then(data =>{
				if(data.rowCount < 1){
					return res.json({
						status: 404,
						error: "No Question Found"
					});	
				}
				db.query("SELECT user_id , questions FROM upvote where questions = $1",[req.params.question_id])
					.then(result =>{
						if(result.rowCount >0){
							return res.json({ 
								status:201,
								error: "Sorry you have Already Upvoted this question before"
							});
						}
						const {userId}= req.userData;
						db.query("INSERT INTO upvote( questions, user_id) VALUES($1, $2)",[req.params.question_id, userId])
							.then()
							.catch(e=>{
								if(e.name === 'error'){
									return res.json({
										status: 500,
										error: "Internal Server Error Occurred"
									});
								}
							});
						return res.json({ 
							status:201,
							data: data.rows[0],
							message: " upvote successfully!"
						});
					})
					.catch(e =>{
						if(e.name === 'error'){
							res.json({
								status: 500,
								error: "Internal Server Error Occurred"
							});
						}
					});
			})
			.catch(e =>{
				if(e.code === '22P02'){
					return res.json({
						status: 400,
						error: "Characters are not Allowed"
					});
					
				}else if(e.name === 'error'){
					res.json({
						status: 500,
						error: "Internal Server Error Occurred"
					});
					
				}
				
			});
	},
	downVote:(req, res) => {
		const queryvt = 'update questions set vote = vote - $1 where question_id = $2 RETURNING *';
		const queryValue = [1, parseInt(req.params.question_id)];
		db.query(queryvt, queryValue)
			.then(data =>{
				if(data.rowCount < 1){
					return res.json({
						status: 404,
						error: "No Question Found"
					});	
				}
				db.query("SELECT user_id , questions FROM downvote where questions = $1",[req.params.question_id])
					.then(result =>{
						if(result.rowCount > 0){
							return res.json({ 
								status:201,
								error: "Sorry you have Already downvoted this question before"
							});
						}
						const {userId} = req.userData;
						db.query("INSERT INTO downvote( questions, user_id) VALUES($1, $2)",[req.params.question_id, userId ])
							.then()
							.catch(e=>{
								if(e.name === 'error'){
									return res.json({
										status: 500,
										error: "Internal Server Error Occurred"
									});
								}
							});
						return res.json({ 
							status:201,
							data: data.rows[0],
							message: " upvote successfully!"
						});
					})
					.catch(e =>{
						if(e.name === 'error'){
							res.json({
								status: 500,
								error: "Internal Server Error Occurred"
							});
						}
					});
			})
			.catch(e =>{
				if(e.code === '22P02'){
					return res.json({
						status: 400,
						error: "Characters are not Allowed"
					});
					
				}else if(e.name === 'error'){
					res.json({
						status: 500,
						error: "Internal Server Error Occurred"
					});
					
				}
			});
			
	},

	createRvsp:(req, res) =>{
		const meetup_id = parseInt(req.params.meetup_id);
		db.query('select * from meetups where meetup_id = $1',[meetup_id])
			.then(data =>{
				if(data.rowCount < 1){
					return res.json({
						status: 404,
						error: " Meetup Doesn't Exist "
					});	
				}
			})
			.catch(e =>{
				if(e.name === 'error'){
					return 	res.json({
						status: 500,
						error: "Internal Server Error Occurred"
					});
					
				}
			});	
		const result = Joi.validate(req.body, validat.rsvp);
		if(result.error){
			return res.status(400).send(result.error.details[0].message);
		} 
		const { response } = req.body;
		const {userId} = req.userData;
		const queryrsvp = 'INSERT INTO rsvp("user" , meetup, response) VALUES($1, $2, $3) RETURNING *';
		db.query(queryrsvp,[ userId,  meetup_id, response] )
			.then(data =>{
				if(data.rowCount < 1){
					return res.json({
						status: 404,
						error: " No Meetup Found "
					});	
				}
				return res.json({
					status: 201,
					data: data.rows[0],
					message:"RSVP successfully created"
				});
			})
			.catch(e =>{
				if(e.name === 'error'){
					res.json({
						status: 500,
						error: "Internal Server Error Occurred"
					});
					
				}
			});
	}

};
