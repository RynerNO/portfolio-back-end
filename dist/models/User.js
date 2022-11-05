"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("../config"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var UserSchema = new _mongoose["default"].Schema({
  name: String,
  email: String,
  createdAt: String,
  updatedAt: String,
  password: String
});

UserSchema.methods.generateToken = function () {
  return _jsonwebtoken["default"].sign({
    id: this._id
  }, _config["default"].jwtSecret);
};

UserSchema.methods.comparePasswords = function (plainPassword) {
  return _bcryptjs["default"].compareSync(plainPassword, this.password);
};

function loadModel(modelName, modelSchema) {
  return _mongoose["default"].models[modelName] // Check if the model exists
  ? _mongoose["default"].model(modelName) // If true, only retrieve it
  : _mongoose["default"].model(modelName, modelSchema); // If false, define it
}

var _default = function _default() {
  return loadModel('User', UserSchema);
};

exports["default"] = _default;