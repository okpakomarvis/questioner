import multer from "multer";
const storage = multer.diskStorage({
	destination: function(req, file , cb){
		cb(null, "./uploads/");
	},
	filename:function (req, file, cb){
		cb(null, new Date().toISOString().split(":")+file.originalname);
	}
});
const filterFile = (req, file, cb)=> {
	//reject or accept a file
	if(file.mimetype==="image/jpeg" || file.mimetype==="image/png"){
		cb(null, true);
	}else{
		cb(new Error("file was not uploaded"), false);
	}
};
const upload = multer({
	storage: storage, 
	limits:{fileSize: 1024 * 1024 *3},
	fileFilter:filterFile
});
export default upload;