# Bayes Text Classifier

## Install

```
npm i bayes-text-classifier
```

## Usage

```typescript
import { BayesTextClassifier } from 'bayes-text-classifier';

const classifier = new BayesTextClassifier();
classifier.learnText("i am feeling good today", "good");
classifier.learnText("i am feeling bad today", "bad");
console.log(classifier.classifyText("im good"));
// good
console.log(classifier.classifyText("im bad"));
// bad
```

## How It Works

This is a an implementation of a multinomial naive bayes classifier in pure javascript, which means you can use it anywhere you can use javascript.

## What is a Naive Bayes Classifier?

Naive bayes classifiers are simple classifiers often used in text classification tasks, such as, famously, detecting whether or not a given email is spam or not spam. Naive bayes classifiers are useful when you have sparse data, intractably many parameters, or when you to train the model in linear time.

https://en.wikipedia.org/wiki/Naive_Bayes_classifier

## Examples

### Persistence

You can persist your model to a string using the `dump` method.

```typescript
const classifier = new BayesTextClassifier();
classifier.learnText("i am feeling good today", "good");
classifier.learnText("i am feeling bad today", "bad");
const str = classifier.dump();
console.log(str);
// {"tokenizePunctuation":true,"multinomialNaiveBayesClassifier":
// "{\"alpha\":1e-9,\"classRelativeFeatureFrequencies\"
// :[[\"good\",\"[[\\\"i\\\",1],[\\\"am\\\",1],[\\\"feeling\\\",1],
// [\\\"good\\\",1],[\\\"today\\\",1]]\"],[\"bad\",\"[[\\\"i\\\",1],
// [\\\"am\\\",1],[\\\"feeling\\\",1],[\\\"bad\\\",1],[\\\"today\\\",
// 1]]\"]],\"classTypeFrequencyCounter\":\"[[\\\"good\\\",1],
// [\\\"bad\\\",1]]\",\"n\":2}"}
```

Reloading the model is as easy as:

```typescript
const newClassifier = BayesTextClassifier.load<string>(str);
console.log(newClassifier.classifyText("im good"));
// good
console.log(newClassifier.classifyText("im bad"));
// bad
```

### Classifying Spam vs "Ham"

In this classic example, we load a dataset of spam vs. not-spam ("ham") emails and attempt to classify each email correctly. We split the data into randomized training and testing sets, and then just learn on each example.

```typescript
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
```

We can see that this model gives great performance. Since the model is validated on a random subset of the data, I've ran the above code 5 times, so you can see it's output on 5 random subsets of the data. An accuracy above 90% can be considered great performance.

```
➜  examples git:(master) node spam-classifier.js
Accuracy= 0.9775784753363229
➜  examples git:(master) node spam-classifier.js
Accuracy= 0.9775784753363229
➜  examples git:(master) node spam-classifier.js
Accuracy= 0.9847533632286996
➜  examples git:(master) node spam-classifier.js
Accuracy= 0.9820627802690582
➜  examples git:(master) node spam-classifier.js
Accuracy= 0.9847533632286996
```

Please note that the above dataset may or may not be as challenging as a real life dataset. The point of this example is to show that the model works, and is simple to use.
