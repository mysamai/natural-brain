var brain = require('brain');

var Classifier = function(options) {
  this.brain = new brain.NeuralNetwork(options);
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
  var result = [];
  var data = this.brain.run(features);

  Object.keys(data).forEach(function(label) {
    result.push({ label: label, value: data[label] });
  });

  return result;
};

Classifier.prototype.classify = function(features) {
  var classifications = this.getClassifications(features);
  var max = 0;
  var result = null;

  classifications.forEach(function(current) {
    if(current.value > max) {
      result = current.label;
      max = current.value;
    }
  });

  return result;
};

module.exports = Classifier;
