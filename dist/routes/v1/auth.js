"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("../../controllers/v1/auth.controller"));

var _login = _interopRequireDefault(require("../../validators/login"));

var authRouter = new _express.Router();
authRouter.post('/login', _login["default"], _auth["default"].login);
var _default = authRouter;
exports["default"] = _default;