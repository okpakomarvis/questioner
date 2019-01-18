import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { User, Database, Password, DBPort } = process.env;
const connectionString =
  "postgres://" +
  User +
  ":" +
  Password +
  "@localhost:" +
  DBPort +
  "/" +
  Database +
  "";
const pool = new Pool({
  connectionString: connectionString
});

export default pool;
