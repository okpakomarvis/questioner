'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('Creating tables...');

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return _connect2.default.query('CREATE TABLE IF NOT EXISTS users(\n        user_id SERIAL PRIMARY KEY,\n        firstname VARCHAR(50) ,\n        lastname VARCHAR(50) ,\n        username VARCHAR(50) UNIQUE NOT NULL,\n        email VARCHAR(100) UNIQUE NOT NULL,\n        password VARCHAR(100) NOT NULL,\n        phonenumber VARCHAR(11) ,\n        isadmin BOOLEAN NOT NULL,\n        createdon TIMESTAMPTZ )');

                case 3:
                    _context.next = 5;
                    return _connect2.default.query('CREATE TABLE IF NOT EXISTS meetups(\n        meetup_id SERIAL PRIMARY KEY,\n        topic VARCHAR(255) NOT NULL,\n        imagepath VARCHAR(255) NOT NULL,\n        location TEXT NOT NULL,\n        happeningon VARCHAR(200) NOT NULL,\n        tags TEXT[],\n        createdon TIMESTAMPTZ )');

                case 5:
                    _context.next = 7;
                    return _connect2.default.query('CREATE TABLE IF NOT EXISTS questions(\n        question_id SERIAL PRIMARY KEY,\n        meetup INT NOT NULL,\n        title VARCHAR(255) NOT NULL,\n        body TEXT NOT NULL,\n        vote INT DEFAULT 0,\n        createdby INT NOT NULL,\n        createdon TIMESTAMPTZ ,\n        FOREIGN KEY (createdby) REFERENCES users (user_id) ON DELETE CASCADE,\n        FOREIGN KEY (meetup) REFERENCES meetups (meetup_id) ON DELETE CASCADE)');

                case 7:
                    _context.next = 9;
                    return _connect2.default.query('CREATE TABLE IF NOT EXISTS rsvp(\n        rsvp_id SERIAL,\n        meetup INT NOT NULL,\n        userid INT NOT NULL,\n        response VARCHAR(5) NOT NULL,\n        PRIMARY KEY(meetup, userid),\n        FOREIGN KEY (meetup) REFERENCES meetups (meetup_id) ON DELETE CASCADE,\n        FOREIGN KEY (userid) REFERENCES users (user_id) ON DELETE CASCADE)');

                case 9:
                    _context.next = 11;
                    return _connect2.default.query('CREATE TABLE IF NOT EXISTS comments(\n        comment_id SERIAL PRIMARY KEY,\n        question INT NOT NULL,\n        comment TEXT NOT NULL,\n        userid INT NOT NULL,\n        createdon TIMESTAMPTZ DEFAULT NOW(),\n        FOREIGN KEY (userid) REFERENCES users (user_id) ON DELETE CASCADE,\n        FOREIGN KEY (question) REFERENCES questions (question_id) ON DELETE CASCADE)');

                case 11:
                    _context.next = 13;
                    return _connect2.default.query('CREATE TABLE IF NOT EXISTS upvote(\n        upvote_id SERIAL PRIMARY KEY,\n        user_id INT NOT NULL,\n        questions INT NOT NULL,\n        FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,\n        FOREIGN KEY (questions) REFERENCES questions (question_id) ON DELETE CASCADE)');

                case 13:
                    _context.next = 15;
                    return _connect2.default.query('CREATE TABLE IF NOT EXISTS downvote(\n            downvote_id SERIAL PRIMARY KEY,\n            user_id INT NOT NULL,\n            questions INT NOT NULL,\n            FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,\n            FOREIGN KEY (questions) REFERENCES questions (question_id) ON DELETE CASCADE)');

                case 15:
                    _context.next = 17;
                    return _connect2.default.query('INSERT INTO users(email, password, username, isadmin) VALUES(\'okpakomarvis@gmail.com\', \'$2b$10$gr3/kMVSjEbgsYhH0yCtTOciZxPsfN/QMfwopELNDot/jiuG3xezC\', \'marvis1\', true)');

                case 17:
                    _context.next = 22;
                    break;

                case 19:
                    _context.prev = 19;
                    _context.t0 = _context['catch'](0);

                    console.log(_context.t0);

                case 22:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, undefined, [[0, 19]]);
}))();