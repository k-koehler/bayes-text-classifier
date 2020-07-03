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
