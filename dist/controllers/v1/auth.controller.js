"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../../models/User"));

var login = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, username, password, user, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, password = _req$body.password;
            _context.next = 3;
            return (0, _User["default"])().findOne({
              name: username
            });

          case 3:
            user = _context.sent;

            if (!user) {
              _context.next = 8;
              break;
            }

            if (!user.comparePasswords(password)) {
              _context.next = 8;
              break;
            }

            token = user.generateToken();
            return _context.abrupt("return", res.json({
              user: user,
              token: token,
              status: true
            }));

          case 8:
            return _context.abrupt("return", res.status(400).json({
              form: 'Неверный логин или пароль'
            }));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  login: login
};
exports["default"] = _default;