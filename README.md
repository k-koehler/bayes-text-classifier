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
