"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var _default = {
  databaseUrl: process.env.DATABASE_URL,
  url: process.env.APP_URL || 'http://localhost:3000',
  jwtSecret: process.env.JWT_SERCET || 'hYW#T#H;%RCNozF=X!sh',
  recaptchaSecret: process.env.recaptchaSecret || '',
  messageApi: process.env.MESSAGE_API || '',
  messageToken: process.env.MESSAGE_TOKEN || '',
  recaptchaLoginSecret: process.env.LOGIN_RECAPTCHA_SECRET,
  port: process.env.PORT || 3000
};
exports["default"] = _default;