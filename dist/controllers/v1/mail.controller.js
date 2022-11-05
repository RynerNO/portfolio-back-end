"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("../../config"));

var _axios = _interopRequireDefault(require("axios"));

var send = function send(req, res) {
  var message = "\nFrom: *".concat(req.body.email, "* \nName: * ").concat(req.body.name, "* \nMessasge: * ").concat(req.body.text, "* ");

  _axios["default"].post("".concat(_config["default"].messageApi), {
    message: message,
    token: _config["default"].messageToken
  }).then(function (response) {
    res.status(200).json({
      message: 'Success'
    });
  })["catch"](function (err) {
    res.status(400);
  });
};

var _default = {
  send: send
};
exports["default"] = _default;