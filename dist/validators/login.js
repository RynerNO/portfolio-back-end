"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Yup = _interopRequireWildcard(require("yup"));

var _axios = _interopRequireDefault(require("axios"));

var _config = _interopRequireDefault(require("../config"));

var LoginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required()
});

var _default = function _default(req, res, next) {
  LoginSchema.validate(req.body).then(function () {
    var secret_key = _config["default"].recaptchaLoginSecret;
    var token = req.body.token;
    var url = "https://www.google.com/recaptcha/api/siteverify?secret=".concat(secret_key, "&response=").concat(token);

    _axios["default"].post(url).then(function (response) {
      if (response.data.success) {
        next();
      } else {
        res.status(422).json({
          'error': 'Capthca Failed'
        });
      }
    })["catch"](function (error) {
      return res.status(422).json({});
    });
  })["catch"](function (error) {
    res.status(422).json((0, _defineProperty2["default"])({}, error.path, error.message));
  });
};

exports["default"] = _default;