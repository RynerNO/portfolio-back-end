"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("../../middleware/auth"));

var _projects = _interopRequireDefault(require("../../controllers/v1/projects.controller"));

var router = new _express.Router();
router.get('/get', _projects["default"].getProjects);
router.post('/get', _projects["default"].getProjects);
router.post('/add', _auth["default"], _projects["default"].addProject);
router.post('/delete', _auth["default"], _projects["default"].deleteProject);
var _default = router;
exports["default"] = _default;