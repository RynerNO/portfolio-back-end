"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

var _config = _interopRequireDefault(require("../config"));

var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, data, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.headers.access_token;
            data = _jsonwebtoken["default"].verify(token, _config["default"].jwtSecret);
            _context.next = 5;
            return (0, _User["default"])().findById(data.id);

          case 5:
            user = _context.sent;

            if (user) {
              _context.next = 8;
              break;
            }

            throw new Error();

          case 8:
            req.user = user;
            return _context.abrupt("return", next());

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>\n' + _context.t0);
            return _context.abrupt("return", res.status(400).json({
              message: 'Unauthenticated.'
            }));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;