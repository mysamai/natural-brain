const stopwords = require('natural/lib/natural/util/stopwords');
const ClassifierBase = require('natural/lib/natural/classifiers/classifier');
const Classifier = require('./classifier');

const stopwordsBackup = stopwords.words.slice();

class BrainJSClassifier extends ClassifierBase {
  constructor (options, stemmer) {
    const b = new Classifier(options);
    super(b, stemmer);
  }
}

BrainJSClassifier.restore = function (data, stemmer) {
  var result = new BrainJSClassifier({}, stemmer);

  result.classifier.brain.fromJSON(data.classifier.brain);
  result.docs = data.docs;
  result.features = data.features;

  return result;
};

BrainJSClassifier.load = function (filename, stemmer, callback) {
  ClassifierBase.load(filename, (err, classifier) => {
    if (err) {
      callback(err);
    }
    callback(err, BrainJSClassifier.restore(classifier, stemmer));
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
