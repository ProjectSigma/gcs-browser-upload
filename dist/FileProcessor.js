"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _es6Promise = require("es6-promise");

var _sparkMd = _interopRequireDefault(require("spark-md5"));

var _debug = _interopRequireDefault(require("./debug"));

var FileProcessor = /*#__PURE__*/function () {
  function FileProcessor(file, chunkSize) {
    (0, _classCallCheck2["default"])(this, FileProcessor);
    this.paused = false;
    this.file = file;
    this.chunkSize = chunkSize;
    this.unpauseHandlers = [];
  }

  (0, _createClass2["default"])(FileProcessor, [{
    key: "run",
    value: function () {
      var _run = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(fn) {
        var _this = this;

        var startIndex,
            endIndex,
            file,
            chunkSize,
            totalChunks,
            spark,
            processIndex,
            waitForUnpause,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                startIndex = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 0;
                endIndex = _args2.length > 2 ? _args2[2] : undefined;
                file = this.file, chunkSize = this.chunkSize;
                totalChunks = Math.ceil(file.size / chunkSize);
                spark = new _sparkMd["default"].ArrayBuffer();
                (0, _debug["default"])('Starting run on file:');
                (0, _debug["default"])(" - Total chunks: ".concat(totalChunks));
                (0, _debug["default"])(" - Start index: ".concat(startIndex));
                (0, _debug["default"])(" - End index: ".concat(endIndex || totalChunks));

                processIndex = /*#__PURE__*/function () {
                  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(index) {
                    var start, section, chunk, checksum, shouldContinue;
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!(index === totalChunks || index === endIndex)) {
                              _context.next = 3;
                              break;
                            }

                            (0, _debug["default"])('File process complete');
                            return _context.abrupt("return");

                          case 3:
                            if (!_this.paused) {
                              _context.next = 6;
                              break;
                            }

                            _context.next = 6;
                            return waitForUnpause();

                          case 6:
                            start = index * chunkSize;
                            section = file.slice(start, start + chunkSize);
                            _context.next = 10;
                            return getData(file, section);

                          case 10:
                            chunk = _context.sent;
                            checksum = getChecksum(spark, chunk);
                            _context.next = 14;
                            return fn(checksum, index, chunk);

                          case 14:
                            shouldContinue = _context.sent;

                            if (!(shouldContinue !== false)) {
                              _context.next = 18;
                              break;
                            }

                            _context.next = 18;
                            return processIndex(index + 1);

                          case 18:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function processIndex(_x2) {
                    return _ref.apply(this, arguments);
                  };
                }();

                waitForUnpause = function waitForUnpause() {
                  return new _es6Promise.Promise(function (resolve) {
                    _this.unpauseHandlers.push(resolve);
                  });
                };

                _context2.next = 13;
                return processIndex(startIndex);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function run(_x) {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: "pause",
    value: function pause() {
      this.paused = true;
    }
  }, {
    key: "unpause",
    value: function unpause() {
      this.paused = false;
      this.unpauseHandlers.forEach(function (fn) {
        return fn();
      });
      this.unpauseHandlers = [];
    }
  }]);
  return FileProcessor;
}();

function getChecksum(spark, chunk) {
  spark.append(chunk);
  var state = spark.getState();
  var checksum = spark.end();
  spark.setState(state);
  return checksum;
}

function getData(_x3, _x4) {
  return _getData.apply(this, arguments);
}

function _getData() {
  _getData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(file, blob) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new _es6Promise.Promise(function (resolve, reject) {
              var reader = new window.FileReader();

              reader.onload = function () {
                return resolve(reader.result);
              };

              reader.onerror = reject;
              reader.readAsArrayBuffer(blob);
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getData.apply(this, arguments);
}

var _default = FileProcessor;
exports["default"] = _default;