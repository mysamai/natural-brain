var stopwords = require('natural/lib/natural/util/stopwords');
var ClassifierBase = require('natural/lib/natural/classifiers/classifier');
var util = require('util');
var Classifier = require('./classifier');

var stopwordsBackup = stopwords.words.slice();

var BrainJSClassifier = function(options, stemmer) {
  var b = new Classifier(options);

  ClassifierBase.call(this, b, stemmer);
};

util.inherits(BrainJSClassifier, ClassifierBase);

BrainJSClassifier.restore = function(data, stemmer) {
  var result = new BrainJSClassifier({}, stemmer);
  result.docs = data.docs;
  result.features = data.features;

  return result;
};

BrainJSClassifier.load = function(filename, stemmer, callback) {
  ClassifierBase.load(filename, function(err, classifier) {
    if (err) {
      callback(err);
    }
    callback(err, BrainJSClassifier.restore(classifier, stemmer));
  });
};

BrainJSClassifier.disableStopWords = function() {
  stopwords.words.splice(0, stopwords.words.length);
  return stopwordsBackup;
};

BrainJSClassifier.enableStopWords = function() {
  if(!stopwords.length) {
    stopwords.words.push.apply(stopwords.words, stopwordsBackup);
  }
};

BrainJSClassifier.stopwords = stopwords;

module.exports = BrainJSClassifier;
