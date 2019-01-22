import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { User, Database, Password, DBPort } = process.env;
const connectionString =
 "postgres://tfwgnrzxquzceg:905cc02e26d3cba3ec2cdf2e559b79643dbc28fd591555b9242fb482449ca055@ec2-54-235-68-3.compute-1.amazonaws.com:5432/d7ot1a16k184d3";

const pool = new Pool({
  connectionString: connectionString
});

export default pool;
