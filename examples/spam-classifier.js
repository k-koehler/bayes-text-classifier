const fs = require("fs");
const { BayesTextClassifier } = require("bayes-text-classifier");
const trainTestSplit = require("train-test-split");

const data = fs
  .readFileSync("./spam_ham.txt")
  .toString()
  .split("\n")
  .map((s) => s.split("\t"));
const clf = new BayesTextClassifier();
const [train, test] = trainTestSplit(data, 0.8);
for (const [category, text] of train) {
  clf.learnText(text, category);
}
let correct = 0;
for (const [category, text] of test) {
  if (clf.classifyText(text) === category) {
    ++correct;
  }
}
console.log("Accuracy=", correct / test.length || 0);
