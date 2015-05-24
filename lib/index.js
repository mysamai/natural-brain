var ClassifierBase = require('natural/lib/natural/classifiers/classifier');
var util = require('util');
var Classifier = require('./classifier');

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

module.exports = BrainJSClassifier;
