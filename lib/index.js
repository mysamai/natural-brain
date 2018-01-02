const stopwords = require('natural/lib/natural/util/stopwords');
const ClassifierBase = require('natural/lib/natural/classifiers/classifier');
const Classifier = require('./classifier');

const stopwordsBackup = stopwords.words.slice();

class BrainJSClassifier extends ClassifierBase {
  constructor (options, stemmer) {
    const b = new Classifier(options);
    super(b, stemmer);
    this.options = options;
  }
}

BrainJSClassifier.restore = function (data, options, stemmer) {
  var result = new BrainJSClassifier(options || data.options, stemmer);

  result.classifier.brain.fromJSON(data.classifier.brain);
  result.docs = data.docs;
  result.features = data.features;

  result.train();

  return result;
};

BrainJSClassifier.load = function (filename, options, stemmer, callback) {
  ClassifierBase.load(filename, (err, classifier) => {
    if (err) {
      callback(err);
    }
    if (typeof callback === 'function') {
      callback(err, BrainJSClassifier.restore(classifier, options, stemmer));
    }
  });
};

BrainJSClassifier.disableStopWords = function () {
  stopwords.words.splice(0, stopwords.words.length);
  return stopwordsBackup;
};

BrainJSClassifier.enableStopWords = function () {
  if (!stopwords.length) {
    stopwords.words.push.apply(stopwords.words, stopwordsBackup);
  }
};

BrainJSClassifier.stopwords = stopwords;

module.exports = BrainJSClassifier;
