import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { User, Database, Password, DBPort } = process.env;
const connectionString =
 " postgres://eyyjuvsm:xaldVsNFMdVZAo4yGXY62IC6flByTs65@stampy.db.elephantsql.com:5432/rugby";

 

  
  
  
 

const pool = new Pool({
  connectionString: connectionString
});

export default pool;
