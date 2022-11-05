"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var ProjectSchema = new _mongoose["default"].Schema({
  title: String,
  tech: Array,
  link: {
    type: String,
    "default": ''
  },
  git: String,
  pages: Array,
  projectID: String,
  createdAt: String,
  updatedAt: String
});
ProjectSchema.pre('save', function () {
  this.createdAt = new Date();
});

function loadModel(modelName, modelSchema) {
  return _mongoose["default"].models[modelName] // Check if the model exists
  ? _mongoose["default"].model(modelName) // If true, only retrieve it
  : _mongoose["default"].model(modelName, modelSchema); // If false, define it
}

var _default = function _default() {
  return loadModel('Project', ProjectSchema);
};

exports["default"] = _default;