import jwt from "jsonwebtoken";
export default {
	authen:(req, res, next)=>{
		try{
			const token= req.headers.authorization.split(" ")[1];
			const decoded= jwt.verify(token, process.env.JWT_KEY);
			req.userData= decoded;
	
			next();
		} 
		catch(error){
			return res.status(401).json({
				message:"Auth failed"
			});
		}
	},
	authenAdmin:(req, res, next) =>{
		const {isAdmin} = req.userData;
		if (isAdmin === false){
			return res.json({
				status:403,
				message: " Unauthorize, Access Denied!"
			});
		}
		next();
	},
	authenUser:(req, res, next) =>{
		const {isAdmin} = req.userData;
		if (isAdmin === true){
			return res.json({
				status:403,
				message: " Unauthorize, Access Denied!"
			});
		}
		next();
	}

};

