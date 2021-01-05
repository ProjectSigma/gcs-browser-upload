"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadAlreadyFinishedError = exports.InvalidChunkSizeError = exports.UploadIncompleteError = exports.MissingOptionsError = exports.UnknownResponseError = exports.UploadFailedError = exports.UrlNotFoundError = exports.FileAlreadyUploadedError = exports.DifferentChunkError = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _es6Error = _interopRequireDefault(require("es6-error"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var DifferentChunkError = /*#__PURE__*/function (_ExtendableError) {
  (0, _inherits2["default"])(DifferentChunkError, _ExtendableError);

  var _super = _createSuper(DifferentChunkError);

  function DifferentChunkError(chunkIndex, originalChecksum, newChecksum) {
    var _this;

    (0, _classCallCheck2["default"])(this, DifferentChunkError);
    _this = _super.call(this, "Chunk at index '".concat(chunkIndex, "' is different to original"));
    _this.chunkIndex = chunkIndex;
    _this.originalChecksum = originalChecksum;
    _this.newChecksum = newChecksum;
    return _this;
  }

  return DifferentChunkError;
}(_es6Error["default"]);

exports.DifferentChunkError = DifferentChunkError;

var FileAlreadyUploadedError = /*#__PURE__*/function (_ExtendableError2) {
  (0, _inherits2["default"])(FileAlreadyUploadedError, _ExtendableError2);

  var _super2 = _createSuper(FileAlreadyUploadedError);

  function FileAlreadyUploadedError(id, url) {
    (0, _classCallCheck2["default"])(this, FileAlreadyUploadedError);
    return _super2.call(this, "File '".concat(id, "' has already been uploaded to unique url '").concat(url, "'"));
  }

  return FileAlreadyUploadedError;
}(_es6Error["default"]);

exports.FileAlreadyUploadedError = FileAlreadyUploadedError;

var UrlNotFoundError = /*#__PURE__*/function (_ExtendableError3) {
  (0, _inherits2["default"])(UrlNotFoundError, _ExtendableError3);

  var _super3 = _createSuper(UrlNotFoundError);

  function UrlNotFoundError(url) {
    (0, _classCallCheck2["default"])(this, UrlNotFoundError);
    return _super3.call(this, "Upload URL '".concat(url, "' has either expired or is invalid"));
  }

  return UrlNotFoundError;
}(_es6Error["default"]);

exports.UrlNotFoundError = UrlNotFoundError;

var UploadFailedError = /*#__PURE__*/function (_ExtendableError4) {
  (0, _inherits2["default"])(UploadFailedError, _ExtendableError4);

  var _super4 = _createSuper(UploadFailedError);

  function UploadFailedError(status) {
    (0, _classCallCheck2["default"])(this, UploadFailedError);
    return _super4.call(this, "HTTP status ".concat(status, " received from GCS, consider retrying"));
  }

  return UploadFailedError;
}(_es6Error["default"]);

exports.UploadFailedError = UploadFailedError;

var UnknownResponseError = /*#__PURE__*/function (_ExtendableError5) {
  (0, _inherits2["default"])(UnknownResponseError, _ExtendableError5);

  var _super5 = _createSuper(UnknownResponseError);

  function UnknownResponseError(res) {
    var _this2;

    (0, _classCallCheck2["default"])(this, UnknownResponseError);
    _this2 = _super5.call(this, 'Unknown response received from GCS');
    _this2.res = res;
    return _this2;
  }

  return UnknownResponseError;
}(_es6Error["default"]);

exports.UnknownResponseError = UnknownResponseError;

var MissingOptionsError = /*#__PURE__*/function (_ExtendableError6) {
  (0, _inherits2["default"])(MissingOptionsError, _ExtendableError6);

  var _super6 = _createSuper(MissingOptionsError);

  function MissingOptionsError() {
    (0, _classCallCheck2["default"])(this, MissingOptionsError);
    return _super6.call(this, 'Missing options for Upload');
  }

  return MissingOptionsError;
}(_es6Error["default"]);

exports.MissingOptionsError = MissingOptionsError;

var UploadIncompleteError = /*#__PURE__*/function (_ExtendableError7) {
  (0, _inherits2["default"])(UploadIncompleteError, _ExtendableError7);

  var _super7 = _createSuper(UploadIncompleteError);

  function UploadIncompleteError() {
    (0, _classCallCheck2["default"])(this, UploadIncompleteError);
    return _super7.call(this, 'Upload is not complete');
  }

  return UploadIncompleteError;
}(_es6Error["default"]);

exports.UploadIncompleteError = UploadIncompleteError;

var InvalidChunkSizeError = /*#__PURE__*/function (_ExtendableError8) {
  (0, _inherits2["default"])(InvalidChunkSizeError, _ExtendableError8);

  var _super8 = _createSuper(InvalidChunkSizeError);

  function InvalidChunkSizeError(chunkSize) {
    (0, _classCallCheck2["default"])(this, InvalidChunkSizeError);
    return _super8.call(this, "Invalid chunk size ".concat(chunkSize, ", must be a multiple of 262144"));
  }

  return InvalidChunkSizeError;
}(_es6Error["default"]);

exports.InvalidChunkSizeError = InvalidChunkSizeError;

var UploadAlreadyFinishedError = /*#__PURE__*/function (_ExtendableError9) {
  (0, _inherits2["default"])(UploadAlreadyFinishedError, _ExtendableError9);

  var _super9 = _createSuper(UploadAlreadyFinishedError);

  function UploadAlreadyFinishedError() {
    (0, _classCallCheck2["default"])(this, UploadAlreadyFinishedError);
    return _super9.call(this, 'Upload instance has already finished');
  }

  return UploadAlreadyFinishedError;
}(_es6Error["default"]);

exports.UploadAlreadyFinishedError = UploadAlreadyFinishedError;