"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _pg = require("pg");

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var _process$env = process.env,
    User = _process$env.User,
    Database = _process$env.Database,
    Password = _process$env.Password,
    DBPort = _process$env.DBPort;

var connectionString = "postgres://" + User + ":" + Password + "@localhost:" + DBPort + "/" + Database + "";
var pool = new _pg.Pool({
	connectionString: connectionString
});

exports.default = pool;