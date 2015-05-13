var brain = require('brain');

var Classifier = function() {
  this.brain = new brain.NeuralNetwork();
  this.data = [];
};

Classifier.prototype.addExample = function(features, label) {
  var output = {};
  output[label] = 1;

  this.data.push({ input: features, output: output });
};

Classifier.prototype.train = function() {
  return this.brain.train(this.data);
};

Classifier.prototype.getClassifications = function(features) {
  return this.brain.run(features);
};

Classifier.prototype.classify = function(features) {
  var classifications = this.getClassifications(features);
  var max = 0;
  var result = null;

  for(var key in classifications) {
    if(classifications[key] > max) {
      max = classifications[key];
      result = key;
    }
  }

  return result;
};

module.exports = Classifier;