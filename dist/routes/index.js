"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("./v1/auth"));

var _projects = _interopRequireDefault(require("./v1/projects"));

var _mail = _interopRequireDefault(require("./v1/mail"));

var v1Router = new _express.Router();
v1Router.use('/api/v1/auth', _auth["default"]);
v1Router.use('/api/v1/projects', _projects["default"]);
v1Router.use('/api/v1/mail', _mail["default"]);
var _default = v1Router;
exports["default"] = _default;