import pool from "./connect";

console.log("Creating tables...");

(async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
        user_id SERIAL PRIMARY KEY,
        firstname VARCHAR(50) ,
        lastname VARCHAR(50) ,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        phonenumber VARCHAR(11) ,
        isadmin BOOLEAN NOT NULL,
        createdon TIMESTAMPTZ )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS meetups(
        meetup_id SERIAL PRIMARY KEY,
        topic VARCHAR(255) NOT NULL,
        imagepath VARCHAR(255) NOT NULL,
        location TEXT NOT NULL,
        happeningon VARCHAR(200) NOT NULL,
        tags TEXT[],
        createdon TIMESTAMPTZ )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS questions(
        question_id SERIAL PRIMARY KEY,
        meetup INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        body TEXT NOT NULL,
        vote INT DEFAULT 0,
        createdby INT NOT NULL,
        createdon TIMESTAMPTZ ,
        FOREIGN KEY (createdby) REFERENCES users (user_id) ON DELETE CASCADE,
        FOREIGN KEY (meetup) REFERENCES meetups (meetup_id) ON DELETE CASCADE)`);

    await pool.query(`CREATE TABLE IF NOT EXISTS rsvp(
        rsvp_id SERIAL,
        meetup INT NOT NULL,
        userid INT NOT NULL,
        response VARCHAR(5) NOT NULL,
        PRIMARY KEY(meetup, userid),
        FOREIGN KEY (meetup) REFERENCES meetups (meetup_id) ON DELETE CASCADE,
        FOREIGN KEY (userid) REFERENCES users (user_id) ON DELETE CASCADE)`);

    await pool.query(`CREATE TABLE IF NOT EXISTS comments(
        comment_id SERIAL PRIMARY KEY,
        question INT NOT NULL,
        comment TEXT NOT NULL,
        userid INT NOT NULL,
        createdon TIMESTAMPTZ DEFAULT NOW(),
        FOREIGN KEY (userid) REFERENCES users (user_id) ON DELETE CASCADE,
        FOREIGN KEY (question) REFERENCES questions (question_id) ON DELETE CASCADE)`);

    await pool.query(`CREATE TABLE IF NOT EXISTS upvote(
        upvote_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        questions INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
        FOREIGN KEY (questions) REFERENCES questions (question_id) ON DELETE CASCADE)`);

    await pool.query(`CREATE TABLE IF NOT EXISTS downvote(
            downvote_id SERIAL PRIMARY KEY,
            user_id INT NOT NULL,
            questions INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
            FOREIGN KEY (questions) REFERENCES questions (question_id) ON DELETE CASCADE)`);
    await pool.query(
      `INSERT INTO users(email, password, username, isadmin) VALUES('okpakomarvis@gmail.com', '$2b$10$gr3/kMVSjEbgsYhH0yCtTOciZxPsfN/QMfwopELNDot/jiuG3xezC', 'marvis1', true)`
    );
  } catch (error) {
    console.log(error);
  }
})();
