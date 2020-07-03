import { MultinomialNaiveBayesClassifier } from ".";

describe("MultinomialBayesClassifier", () => {
  test("should generally work", () => {
    enum Result {
      Positive,
      Negative,
    }
    const data: [string, Result][] = [
      ["i am great !", Result.Positive],
      ["everything is good !", Result.Positive],
      ["i feel good", Result.Positive],
      ["yes ! ! !", Result.Positive],
      ["no :(", Result.Negative],
      ["this is bad", Result.Negative],
      ["dont feel so great", Result.Negative],
      ["this sucks", Result.Negative],
    ];
    const classifier = new MultinomialNaiveBayesClassifier();
    for (const [words, result] of data) {
      classifier.fit(words.split(" "), result);
    }
    expect(classifier.classify(["good"])).toBe(Result.Positive);
    expect(classifier.classify(["bad"])).toBe(Result.Negative);
  });

  it("should serialize and deserialize", () => {
    enum Result {
      Positive,
      Negative,
    }
    const data: [string, Result][] = [
      ["i am great !", Result.Positive],
      ["everything is good !", Result.Positive],
      ["i feel good", Result.Positive],
      ["yes ! ! !", Result.Positive],
      ["no :(", Result.Negative],
      ["this is bad", Result.Negative],
      ["dont feel so great", Result.Negative],
      ["this sucks", Result.Negative],
    ];
    const classifier = new MultinomialNaiveBayesClassifier();
    for (const [words, result] of data) {
      classifier.fit(words.split(" "), result);
    }
    const str = classifier.dump();
    const newClassifier = MultinomialNaiveBayesClassifier.load(str);
    expect(newClassifier.classify(["good"])).toBe(Result.Positive);
    expect(newClassifier.classify(["bad"])).toBe(Result.Negative);
  });
});
