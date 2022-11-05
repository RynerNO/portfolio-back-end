"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _mail = _interopRequireDefault(require("../../controllers/v1/mail.controller"));

var _messageValidator = _interopRequireDefault(require("../../validators/messageValidator"));

var mailRouter = new _express.Router();
mailRouter.post('/send', _messageValidator["default"], _mail["default"].send);
var _default = mailRouter;
exports["default"] = _default;