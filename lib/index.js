var ClassifierBase = require('natural/lib/natural/classifiers/classifier');
var util = require('util');
var Classifier = require('./classifier');

var BrainJSClassifier = function(options, stemmer) {
  var b = new Classifier();

  ClassifierBase.call(this, b, stemmer);
};

util.inherits(BrainJSClassifier, ClassifierBase);

module.exports = BrainJSClassifier;
