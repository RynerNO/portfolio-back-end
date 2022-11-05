"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Project = _interopRequireDefault(require("../../models/Project"));

var _fs = _interopRequireDefault(require("fs"));

var _webpConverter = _interopRequireDefault(require("webp-converter"));

var _path = _interopRequireDefault(require("path"));

var _uuid = require("uuid");

var _rimraf = _interopRequireDefault(require("rimraf"));

var _captureWebsite = _interopRequireDefault(require("capture-website"));

var getProjects = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var projectID, projects, project;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            projectID = req.body.projectID;

            if (projectID) {
              _context.next = 8;
              break;
            }

            _context.next = 4;
            return (0, _Project["default"])().find();

          case 4:
            projects = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              projects: projects
            }));

          case 8:
            _context.next = 10;
            return (0, _Project["default"])().findOne({
              projectID: projectID
            });

          case 10:
            project = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              project: project
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getProjects(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var addProject = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, Title, Tech, Git, Link, Pages, projectID, update, deleteFolder;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, Title = _req$body.Title, Tech = _req$body.Tech, Git = _req$body.Git, Link = _req$body.Link, Pages = _req$body.Pages, projectID = _req$body.projectID;
            update = false;
            _context2.prev = 2;

            if (!projectID) {
              projectID = (0, _uuid.v4)();
            } else update = true;

            if (!update) {
              _context2.next = 8;
              break;
            }

            deleteFolder = new Promise(function (resolve, reject) {
              (0, _rimraf["default"])(_path["default"].resolve('dist', "public/posters/".concat(projectID)), function (error) {
                if (error) {
                  reject(error);
                }

                resolve();
              });
            });
            _context2.next = 8;
            return deleteFolder;

          case 8:
            _context2.next = 10;
            return _fs["default"].promises.mkdir(_path["default"].resolve('dist', "public/posters/".concat(projectID)), {
              recursive: true
            });

          case 10:
            _context2.next = 12;
            return _captureWebsite["default"].file(Link, _path["default"].resolve('dist', "public/posters/".concat(projectID), 'poster.png'), {
              launchOptions: {
                args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
              }
            });

          case 12:
            _context2.next = 14;
            return _webpConverter["default"].cwebp(_path["default"].resolve('dist', "public/posters/".concat(projectID), 'poster.png'), _path["default"].resolve('dist', "public/posters/".concat(projectID, "/poster.webp")), "-q 90");

          case 14:
            if (update) {
              _context2.next = 19;
              break;
            }

            _context2.next = 17;
            return (0, _Project["default"])().create({
              title: Title,
              tech: Tech,
              git: Git,
              pages: Pages,
              link: Link,
              projectID: projectID
            });

          case 17:
            _context2.next = 21;
            break;

          case 19:
            _context2.next = 21;
            return (0, _Project["default"])().updateOne({
              projectID: projectID
            }, {
              title: Title,
              tech: Tech,
              git: Git,
              pages: Pages,
              link: Link,
              projectID: projectID
            });

          case 21:
            return _context2.abrupt("return", res.status(200).json({
              message: 'Success'
            }));

          case 24:
            _context2.prev = 24;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(400).json({
              message: 'Error',
              error: _context2.t0.message
            }));

          case 28:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 24]]);
  }));

  return function addProject(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var deleteProject = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var projectID;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            projectID = req.body.projectID;
            _context3.prev = 1;
            _context3.next = 4;
            return (0, _Project["default"])().deleteOne({
              projectID: projectID
            });

          case 4:
            (0, _rimraf["default"])(_path["default"].resolve('dist', "public/posters/".concat(projectID)), function (error) {
              if (error) {
                console.error(error);
              }
            });
            return _context3.abrupt("return", res.status(200).json({
              message: 'Success'
            }));

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(400).json({
              message: 'failed',
              error: _context3.t0.message
            }));

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function deleteProject(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = {
  getProjects: getProjects,
  addProject: addProject,
  deleteProject: deleteProject
};
exports["default"] = _default;