const brain = require('brain.js');
const max = require('lodash.maxby');

module.exports = class Classifier {
  constructor (options) {
    this.brain = new brain.NeuralNetwork(options);
    this.data = [];
    this.options = options;
  }

  addExample (input, label) {
    this.data.push({
      input, output: { [label]: 1 }
    });
  }

  train (options) {
    return this.brain.train(this.data, options);
  }

  getClassifications (features) {
    const data = this.brain.run(features);

    return Object.keys(data)
        .map(label => ({ label: label, value: data[label] }));
  }

  classify (features) {
    const classifications = this.getClassifications(features);
    const res = max(classifications, current => current.value);
    return res ? res.label : null;
  }
};
