"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var STORAGE_KEY = '__gcsBrowserUpload';

var FileMeta = /*#__PURE__*/function () {
  function FileMeta(id, fileSize, chunkSize, storage) {
    (0, _classCallCheck2["default"])(this, FileMeta);
    this.id = id;
    this.fileSize = fileSize;
    this.chunkSize = chunkSize;
    this.storage = storage;
  }

  (0, _createClass2["default"])(FileMeta, [{
    key: "getMeta",
    value: function getMeta() {
      var meta = this.storage.getItem("".concat(STORAGE_KEY, ".").concat(this.id));

      if (meta) {
        return JSON.parse(meta);
      } else {
        return {
          checksums: [],
          chunkSize: this.chunkSize,
          started: false,
          fileSize: this.fileSize
        };
      }
    }
  }, {
    key: "setMeta",
    value: function setMeta(meta) {
      var key = "".concat(STORAGE_KEY, ".").concat(this.id);

      if (meta) {
        this.storage.setItem(key, JSON.stringify(meta));
      } else {
        this.storage.removeItem(key);
      }
    }
  }, {
    key: "isResumable",
    value: function isResumable() {
      var meta = this.getMeta();
      return meta.started && this.chunkSize === meta.chunkSize;
    }
  }, {
    key: "getResumeIndex",
    value: function getResumeIndex() {
      return this.getMeta().checksums.length;
    }
  }, {
    key: "getFileSize",
    value: function getFileSize() {
      return this.getMeta().fileSize;
    }
  }, {
    key: "addChecksum",
    value: function addChecksum(index, checksum) {
      var meta = this.getMeta();
      meta.checksums[index] = checksum;
      meta.started = true;
      this.setMeta(meta);
    }
  }, {
    key: "getChecksum",
    value: function getChecksum(index) {
      return this.getMeta().checksums[index];
    }
  }, {
    key: "reset",
    value: function reset() {
      this.setMeta(null);
    }
  }]);
  return FileMeta;
}();

exports["default"] = FileMeta;