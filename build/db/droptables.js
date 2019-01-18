'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('Dropping tables...');

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _connect2.default.query('DROP TABLE IF EXISTS users CASCADE');

        case 3:
          _context.next = 5;
          return _connect2.default.query('DROP TABLE IF EXISTS meetups CASCADE');

        case 5:
          _context.next = 7;
          return _connect2.default.query('DROP TABLE IF EXISTS questions CASCADE');

        case 7:
          _context.next = 9;
          return _connect2.default.query('DROP TABLE IF EXISTS comments CASCADE');

        case 9:
          _context.next = 11;
          return _connect2.default.query('DROP TABLE IF EXISTS rsvps CASCADE');

        case 11:
          _context.next = 13;
          return _connect2.default.query('DROP TABLE IF EXISTS upvote CASCADE');

        case 13:
          _context.next = 15;
          return _connect2.default.query('DROP TABLE IF EXISTS downvote CASCADE');

        case 15:
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context['catch'](0);

          console.log(_context.t0);

        case 20:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined, [[0, 17]]);
}))();