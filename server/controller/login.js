import db from "../db/connect";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import validat from "../middleware/validator";
		
const loginUser = async (req, res)=>{
	const result = Joi.validate(req.body,validat.login);
	if(result.error){
		return res.status(400).send(result.error.details[0].message);	
	}
	// eslint-disable-next-line quotes
	const queryUser = 'SELECT email, user_id, username, isadmin, password FROM users where email=$1'; 
	db.query(queryUser, [req.body.email])
		.then(user =>{
			console.log(user);
			if(user.rowCount < 1){
				return res.json({
					status: 401,
					error:" Auth failed "
				});	
			}
			bcrypt.compare(req.body.password, user.rows[0].password, (err, result)=>{
				console.log(result);
				if(err){
					return res.json({
						status:401,
						error:"Auth failed ",
					});		
				}
				if(result){
					const token = jwt.sign({
						email:user.rows[0].email,
						userId:user.rows[0].user_id,
						isAdmin:user.rows[0].isadmin
					}, 
					process.env.JWT_KEY,
					{
						expiresIn:"1h"
					});
					return res.json({
						status:200,
						token:token,
						mesage:"Auth successful, User Login "
					});
				}
				return res.json({
					status:401,
					error:"Auth failed"
				});		
			});
		})
		.catch(e =>{
			// eslint-disable-next-line quotes
			if(e.name === 'error'){
				res.json({
					status: 500,
					error: "Internal Server Error Occurred"
				});
					
			}
		});
};
export default loginUser;