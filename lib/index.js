'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stopwords = require('natural/lib/natural/util/stopwords');

var _stopwords2 = _interopRequireDefault(_stopwords);

var _classifier = require('natural/lib/natural/classifiers/classifier');

var _classifier2 = _interopRequireDefault(_classifier);

var _classifier3 = require('./classifier');

var _classifier4 = _interopRequireDefault(_classifier3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stopwordsBackup = _stopwords2.default.words.slice();

var BrainJSClassifier = function (_ClassifierBase) {
  _inherits(BrainJSClassifier, _ClassifierBase);

  function BrainJSClassifier(options, stemmer) {
    _classCallCheck(this, BrainJSClassifier);

    var b = new _classifier4.default(options);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(BrainJSClassifier).call(this, b, stemmer));
  }

  return BrainJSClassifier;
}(_classifier2.default);

BrainJSClassifier.restore = function (data, stemmer) {
  var result = new BrainJSClassifier({}, stemmer);
  result.docs = data.docs;
  result.features = data.features;

  return result;
};

BrainJSClassifier.load = function (filename, stemmer, callback) {
  _classifier2.default.load(filename, function (err, classifier) {
    if (err) {
      callback(err);
    }
    callback(err, BrainJSClassifier.restore(classifier, stemmer));
  });
};

BrainJSClassifier.disableStopWords = function () {
  _stopwords2.default.words.splice(0, _stopwords2.default.words.length);
  return stopwordsBackup;
};

BrainJSClassifier.enableStopWords = function () {
  if (!_stopwords2.default.length) {
    _stopwords2.default.words.push.apply(_stopwords2.default.words, stopwordsBackup);
  }
};

BrainJSClassifier.stopwords = _stopwords2.default;

exports.default = BrainJSClassifier;
module.exports = exports['default'];