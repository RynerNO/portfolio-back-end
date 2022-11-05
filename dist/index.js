"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

var _routes = _interopRequireDefault(require("./routes"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _axios = _interopRequireDefault(require("axios"));

var _compression = _interopRequireDefault(require("compression"));

var _cors = _interopRequireDefault(require("cors"));

var _Project = _interopRequireDefault(require("./models/Project"));

var _fs = _interopRequireDefault(require("fs"));

var _webpConverter = _interopRequireDefault(require("webp-converter"));

var _rimraf = _interopRequireDefault(require("rimraf"));

var _captureWebsite = _interopRequireDefault(require("capture-website"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

_dotenv["default"].config();

_mongoose["default"].connect(_config["default"].databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: '*'
}));
app.use(_bodyParser["default"].json());
app.use((0, _compression["default"])());
app.use(_routes["default"]);
app.use(_express["default"]["static"](_path["default"].resolve('dist', 'public')));

function isFileExist(_x) {
  return _isFileExist.apply(this, arguments);
} // Check public files
// Restore posters


function _isFileExist() {
  _isFileExist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(path) {
    var isExist;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _fs["default"].promises.stat(path);

          case 3:
            isExist = _context.sent;
            return _context.abrupt("return", true);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

            if (!(_context.t0.code == "ENOENT")) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", false);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _isFileExist.apply(this, arguments);
}

function start() {
  return _start.apply(this, arguments);
}

function _start() {
  _start = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var projects, _iterator, _step, _loop, _ret;

    return _regenerator["default"].wrap(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _Project["default"])().find();

          case 2:
            projects = _context4.sent;
            _iterator = _createForOfIteratorHelper(projects);
            _context4.prev = 4;
            _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
              var project, projectID, Link, isExist, deleteFolder;
              return _regenerator["default"].wrap(function _loop$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      project = _step.value;
                      projectID = project.projectID;
                      Link = project.link;
                      _context3.next = 5;
                      return isFileExist(_path["default"].resolve('dist', "public/posters/".concat(projectID, "/poster.webp")));

                    case 5:
                      isExist = _context3.sent;
                      console.log(isExist);

                      if (!isExist) {
                        _context3.next = 9;
                        break;
                      }

                      return _context3.abrupt("return", "continue");

                    case 9:
                      console.log("Poster file for ".concat(project.title, " is missing"));
                      deleteFolder = new Promise(function (resolve, reject) {
                        (0, _rimraf["default"])(_path["default"].resolve('dist', "public/posters/".concat(projectID)), function (error) {
                          if (error) {
                            reject(error);
                          }

                          resolve();
                        });
                      });
                      _context3.next = 13;
                      return deleteFolder;

                    case 13:
                      _context3.next = 15;
                      return _fs["default"].promises.mkdir(_path["default"].resolve('dist', "public/posters/".concat(projectID)), {
                        recursive: true
                      });

                    case 15:
                      _context3.next = 17;
                      return _captureWebsite["default"].file(Link, _path["default"].resolve('dist', "public/posters/".concat(projectID), 'poster.png'), {
                        launchOptions: {
                          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
                        }
                      });

                    case 17:
                      _context3.next = 19;
                      return _webpConverter["default"].cwebp(_path["default"].resolve('dist', "public/posters/".concat(projectID), 'poster.png'), _path["default"].resolve('dist', "public/posters/".concat(projectID, "/poster.webp")), "-q 90");

                    case 19:
                      console.log("Poster file for ".concat(project.title, " restored"));

                    case 20:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _loop);
            });

            _iterator.s();

          case 7:
            if ((_step = _iterator.n()).done) {
              _context4.next = 14;
              break;
            }

            return _context4.delegateYield(_loop(), "t0", 9);

          case 9:
            _ret = _context4.t0;

            if (!(_ret === "continue")) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt("continue", 12);

          case 12:
            _context4.next = 7;
            break;

          case 14:
            _context4.next = 19;
            break;

          case 16:
            _context4.prev = 16;
            _context4.t1 = _context4["catch"](4);

            _iterator.e(_context4.t1);

          case 19:
            _context4.prev = 19;

            _iterator.f();

            return _context4.finish(19);

          case 22:
            app.listen(_config["default"].port, /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      console.log("SERVER RUNNING ON PORT: ".concat(_config["default"].port)); // HEROKU DYNO ANTI-SLEEP

                      setInterval(function () {
                        _axios["default"].get('https://portfolio-ruiner.herokuapp.com/').then(function () {})["catch"](function () {});
                      }, 1000 * 60 * 25);

                    case 2:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            })));

          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee3, null, [[4, 16, 19, 22]]);
  }));
  return _start.apply(this, arguments);
}

start();