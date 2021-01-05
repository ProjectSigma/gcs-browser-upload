"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _axios = require("axios");

var _FileMeta = _interopRequireDefault(require("./FileMeta"));

var _FileProcessor = _interopRequireDefault(require("./FileProcessor"));

var _debug = _interopRequireDefault(require("./debug"));

var errors = _interopRequireWildcard(require("./errors"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var MIN_CHUNK_SIZE = 262144;

var Upload = /*#__PURE__*/function () {
  function Upload(args, allowSmallChunks) {
    (0, _classCallCheck2["default"])(this, Upload);

    var opts = _objectSpread({
      chunkSize: MIN_CHUNK_SIZE,
      storage: window.localStorage,
      contentType: 'text/plain',
      onChunkUpload: function onChunkUpload() {},
      id: null,
      url: null,
      file: null
    }, args);

    if ((opts.chunkSize % MIN_CHUNK_SIZE !== 0 || opts.chunkSize === 0) && !allowSmallChunks) {
      throw new errors.InvalidChunkSizeError(opts.chunkSize);
    }

    if (!opts.id || !opts.url || !opts.file) {
      throw new errors.MissingOptionsError();
    }

    (0, _debug["default"])('Creating new upload instance:');
    (0, _debug["default"])(" - Url: ".concat(opts.url));
    (0, _debug["default"])(" - Id: ".concat(opts.id));
    (0, _debug["default"])(" - File size: ".concat(opts.file.size));
    (0, _debug["default"])(" - Chunk size: ".concat(opts.chunkSize));
    this.opts = opts;
    this.meta = new _FileMeta["default"](opts.id, opts.file.size, opts.chunkSize, opts.storage);
    this.processor = new _FileProcessor["default"](opts.file, opts.chunkSize);
  }

  (0, _createClass2["default"])(Upload, [{
    key: "start",
    value: function () {
      var _start = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var meta, processor, opts, finished, resumeUpload, uploadChunk, validateChunk, getRemoteResumeIndex;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                meta = this.meta, processor = this.processor, opts = this.opts, finished = this.finished;

                resumeUpload = /*#__PURE__*/function () {
                  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                    var localResumeIndex, remoteResumeIndex, resumeIndex;
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            localResumeIndex = meta.getResumeIndex();
                            _context.next = 3;
                            return getRemoteResumeIndex();

                          case 3:
                            remoteResumeIndex = _context.sent;
                            resumeIndex = Math.min(localResumeIndex, remoteResumeIndex);
                            (0, _debug["default"])("Validating chunks up to index ".concat(resumeIndex));
                            (0, _debug["default"])(" - Remote index: ".concat(remoteResumeIndex));
                            (0, _debug["default"])(" - Local index: ".concat(localResumeIndex));
                            _context.prev = 8;
                            _context.next = 11;
                            return processor.run(validateChunk, 0, resumeIndex);

                          case 11:
                            _context.next = 22;
                            break;

                          case 13:
                            _context.prev = 13;
                            _context.t0 = _context["catch"](8);
                            (0, _debug["default"])('Validation failed, starting from scratch');
                            (0, _debug["default"])(" - Failed chunk index: ".concat(_context.t0.chunkIndex));
                            (0, _debug["default"])(" - Old checksum: ".concat(_context.t0.originalChecksum));
                            (0, _debug["default"])(" - New checksum: ".concat(_context.t0.newChecksum));
                            _context.next = 21;
                            return processor.run(uploadChunk);

                          case 21:
                            return _context.abrupt("return");

                          case 22:
                            (0, _debug["default"])('Validation passed, resuming upload');
                            _context.next = 25;
                            return processor.run(uploadChunk, resumeIndex);

                          case 25:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, null, [[8, 13]]);
                  }));

                  return function resumeUpload() {
                    return _ref.apply(this, arguments);
                  };
                }();

                uploadChunk = /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(checksum, index, chunk) {
                    var total, start, end, headers, res;
                    return _regenerator["default"].wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            total = opts.file.size;
                            start = index * opts.chunkSize;
                            end = index * opts.chunkSize + chunk.byteLength - 1;
                            headers = {
                              'Content-Type': opts.contentType,
                              'Content-Range': "bytes ".concat(start, "-").concat(end, "/").concat(total)
                            };
                            (0, _debug["default"])("Uploading chunk ".concat(index, ":"));
                            (0, _debug["default"])(" - Chunk length: ".concat(chunk.byteLength));
                            (0, _debug["default"])(" - Start: ".concat(start));
                            (0, _debug["default"])(" - End: ".concat(end));
                            _context2.next = 10;
                            return safePut(opts.url, chunk, {
                              headers: headers,
                              validateStatus: function validateStatus(_) {
                                return true;
                              }
                            });

                          case 10:
                            res = _context2.sent;
                            checkResponseStatus(res, opts, [200, 201, 308]);
                            (0, _debug["default"])("Chunk upload succeeded, adding checksum ".concat(checksum));
                            meta.addChecksum(index, checksum);
                            opts.onChunkUpload({
                              totalBytes: total,
                              uploadedBytes: end + 1,
                              chunkIndex: index,
                              chunkLength: chunk.byteLength
                            });

                          case 15:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function uploadChunk(_x, _x2, _x3) {
                    return _ref2.apply(this, arguments);
                  };
                }();

                validateChunk = /*#__PURE__*/function () {
                  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(newChecksum, index) {
                    var originalChecksum, isChunkValid;
                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            originalChecksum = meta.getChecksum(index);
                            isChunkValid = originalChecksum === newChecksum;

                            if (isChunkValid) {
                              _context3.next = 5;
                              break;
                            }

                            meta.reset();
                            throw new errors.DifferentChunkError(index, originalChecksum, newChecksum);

                          case 5:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function validateChunk(_x4, _x5) {
                    return _ref3.apply(this, arguments);
                  };
                }();

                getRemoteResumeIndex = /*#__PURE__*/function () {
                  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
                    var headers, res, header, range, bytesReceived;
                    return _regenerator["default"].wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            headers = {
                              'Content-Range': "bytes */".concat(opts.file.size)
                            };
                            (0, _debug["default"])('Retrieving upload status from GCS');
                            _context4.next = 4;
                            return safePut(opts.url, null, {
                              headers: headers,
                              validateStatus: function validateStatus(_) {
                                return true;
                              }
                            });

                          case 4:
                            res = _context4.sent;
                            checkResponseStatus(res, opts, [308]);
                            header = res.headers.range;
                            (0, _debug["default"])("Received upload status from GCS: ".concat(header));
                            range = header.match(/(\d+?)-(\d+?)$/);
                            bytesReceived = parseInt(range[2]) + 1;
                            return _context4.abrupt("return", Math.floor(bytesReceived / opts.chunkSize));

                          case 11:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function getRemoteResumeIndex() {
                    return _ref4.apply(this, arguments);
                  };
                }();

                if (!finished) {
                  _context5.next = 7;
                  break;
                }

                throw new errors.UploadAlreadyFinishedError();

              case 7:
                if (!(meta.isResumable() && meta.getFileSize() === opts.file.size)) {
                  _context5.next = 13;
                  break;
                }

                (0, _debug["default"])('Upload might be resumable');
                _context5.next = 11;
                return resumeUpload();

              case 11:
                _context5.next = 16;
                break;

              case 13:
                (0, _debug["default"])('Upload not resumable, starting from scratch');
                _context5.next = 16;
                return processor.run(uploadChunk);

              case 16:
                (0, _debug["default"])('Upload complete, resetting meta');
                meta.reset();
                this.finished = true;

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "pause",
    value: function pause() {
      this.processor.pause();
      (0, _debug["default"])('Upload paused');
    }
  }, {
    key: "unpause",
    value: function unpause() {
      this.processor.unpause();
      (0, _debug["default"])('Upload unpaused');
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this.processor.pause();
      this.meta.reset();
      (0, _debug["default"])('Upload cancelled');
    }
  }]);
  return Upload;
}();

exports["default"] = Upload;
(0, _defineProperty2["default"])(Upload, "errors", errors);

function checkResponseStatus(res, opts) {
  var allowed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var status = res.status;

  if (allowed.indexOf(status) > -1) {
    return true;
  }

  switch (status) {
    case 308:
      throw new errors.UploadIncompleteError();

    case 201:
    case 200:
      throw new errors.FileAlreadyUploadedError(opts.id, opts.url);

    case 404:
      throw new errors.UrlNotFoundError(opts.url);

    case 500:
    case 502:
    case 503:
    case 504:
      throw new errors.UploadFailedError(status);

    default:
      throw new errors.UnknownResponseError(res);
  }
}

function safePut() {
  return _safePut.apply(this, arguments);
}

function _safePut() {
  _safePut = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var _args6 = arguments;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _axios.put.apply(null, _args6);

          case 3:
            return _context6.abrupt("return", _context6.sent);

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6["catch"](0);

            if (!(_context6.t0 instanceof Error)) {
              _context6.next = 12;
              break;
            }

            throw _context6.t0;

          case 12:
            return _context6.abrupt("return", _context6.t0);

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 6]]);
  }));
  return _safePut.apply(this, arguments);
}