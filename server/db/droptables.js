import pool from "./connect";

console.log("Dropping tables...");

(async () => {
  try {
    await pool.query("DROP TABLE IF EXISTS users CASCADE");
    await pool.query("DROP TABLE IF EXISTS meetups CASCADE");
    await pool.query("DROP TABLE IF EXISTS questions CASCADE");
    await pool.query("DROP TABLE IF EXISTS comments CASCADE");
    await pool.query("DROP TABLE IF EXISTS rsvps CASCADE");
    await pool.query("DROP TABLE IF EXISTS upvote CASCADE");
    await pool.query("DROP TABLE IF EXISTS downvote CASCADE");
  } catch (error) {
    console.log(error);
  }
})();
