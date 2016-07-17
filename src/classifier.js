import brain from 'brain.js';

export default class Classifier {
  constructor(options) {
    this.brain = new brain.NeuralNetwork(options);
    this.data = [];
  }

  addExample(input, label) {
    const output = { [label]: 1 };
    this.data.push({ input, output });
  }

  train() {
    return this.brain.train(this.data);
  }

  getClassifications(features) {
    const data = this.brain.run(features);

    return Object.keys(data).map(label => {
      return { label: label, value: data[label] };
    });
  }

  classify(features) {
    const classifications = this.getClassifications(features);
    let max = 0;
    let result = null;

    classifications.forEach(function(current) {
      if(current.value > max) {
        result = current.label;
        max = current.value;
      }
    });

    return result;
  }
}
