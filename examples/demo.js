const BrainJSClassifier = require('../lib/index');
const classifier = new BrainJSClassifier();

classifier.addDocument('my unit-tests failed.', 'software');
classifier.addDocument('tried the program, but it was buggy.', 'software');
classifier.addDocument('tomorrow we will do standup.', 'meeting');
classifier.addDocument('the drive has a 2TB capacity.', 'hardware');
classifier.addDocument('i need a new power supply.', 'hardware');
classifier.addDocument('can you play some new music?', 'music');

classifier.train();

console.log(classifier.classify('did the tests pass?'));
console.log(classifier.classify('did you buy a new drive?'));
console.log(classifier.classify('What is the capacity?'));
console.log(classifier.classify('Lets meet tomorrow?'));
console.log(classifier.classify('Can you play some stuff?'));
