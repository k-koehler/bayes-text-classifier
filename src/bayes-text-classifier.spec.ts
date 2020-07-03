import BayesTextClassifier from "./bayes-text-classifier";

describe("BayesTextClassifier", () => {
  it("should generally work", () => {
    const classifier = new BayesTextClassifier();
    classifier.learnText("i am feeling good today", "good");
    classifier.learnText("i am feeling bad today", "bad");
    expect(classifier.classifyText("im good")).toBe("good");
    expect(classifier.classifyText("im bad")).toBe("bad");
  });

  it("should serialize and deserialzie", () => {
    const classifier = new BayesTextClassifier();
    classifier.learnText("i am feeling good today", "good");
    classifier.learnText("i am feeling bad today", "bad");
    const str = classifier.dump();
    const newClassifier = BayesTextClassifier.load<string>(str);
    expect(newClassifier.classifyText("im good")).toBe("good");
    expect(newClassifier.classifyText("im bad")).toBe("bad");
  });
});
