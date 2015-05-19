var ClassifierBase = require('natural/lib/natural/classifiers/classifier');
var util = require('util');
var Classifier = require('./classifier');

var BrainJSClassifier = function(options, stemmer) {
  var b = new Classifier(options);

  ClassifierBase.call(this, b, stemmer);
};

util.inherits(BrainJSClassifier, ClassifierBase);

BrainJSClassifier.prototype.toJSON = function() {
  return this.classifier.toJSON();
};

BrainJSClassifier.restore = function(data, stemmer) {
  var result = new BrainJSClassifier({}, stemmer);
  result.classifier.restore(data);

  return result;
};

//BrainJSClassifier.load = function(filename, stemmer, callback) {
//  Classifier.load(filename, function(err, classifier) {
//    if (err) {
//      callback(err);
//    }
//    callback(err, restore(classifier, stemmer));
//  });
//}

module.exports = BrainJSClassifier;
