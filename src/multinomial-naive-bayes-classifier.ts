import FrequencyCounter from "./frequency-counter";

export interface MuiltinomialNaiveBayesClassifierArgs {
  alpha?: number;
}

export default class MultinomialNaiveBayesClassifier<FeatureType, ClassType> {
  private alpha: number;
  private classRelativeFeatureFrequencies: Map<
    ClassType,
    FrequencyCounter<FeatureType>
  >;
  private classTypeFrequencyCounter: FrequencyCounter<ClassType>;
  private n: number;

  constructor({ alpha = 1e-9 }: MuiltinomialNaiveBayesClassifierArgs = {}) {
    this.alpha = alpha;
    this.classRelativeFeatureFrequencies = new Map();
    this.classTypeFrequencyCounter = new FrequencyCounter();
    this.n = 0;
  }

  public fit(x: FeatureType[], y: ClassType) {
    for (const x_i of x) {
      this.classRelativeFeatureFrequencies.set(
        y,
        (
          this.classRelativeFeatureFrequencies.get(y) ||
          new FrequencyCounter<FeatureType>()
        ).accept(x_i)
      );
    }
    this.classTypeFrequencyCounter.accept(y);
    ++this.n;
  }

  public classify(x: FeatureType[]) {
    let maxProba;
    let maxClassType;
    for (const [
      classType,
      relativeFrequencyCounter,
    ] of this.classRelativeFeatureFrequencies.entries()) {
      const py = this.classTypeFrequencyCounter.freq(classType) / this.n;
      let priorsProduct = 1;
      for (const x_i of x) {
        priorsProduct *=
          (relativeFrequencyCounter.freq(x_i) + this.alpha) /
          (relativeFrequencyCounter.size + this.alpha * this.n);
      }
      const proba = py * priorsProduct;
      if (
        maxClassType === undefined ||
        maxProba === undefined ||
        proba > maxProba
      ) {
        maxClassType = classType;
        maxProba = proba;
      }
    }
    if (maxClassType === undefined) {
      throw new Error(
        "Model has not yet been initialized. Have you invoked 'fit' with some training data yet?"
      );
    }
    return maxClassType;
  }
  public dump(): string {
    return JSON.stringify({
      alpha: this.alpha,
      classRelativeFeatureFrequencies: Array.from(
        this.classRelativeFeatureFrequencies.entries()
      ).map(([key, value]) => [key, value.dump()]),
      classTypeFrequencyCounter: this.classTypeFrequencyCounter.dump(),
      n: this.n,
    });
  }

  public static load<I, O>(dumpStr: string) {
    const {
      alpha,
      classRelativeFeatureFrequencies,
      classTypeFrequencyCounter,
      n,
    } = JSON.parse(dumpStr);
    const multinomialNaiveBayesClassifier = new MultinomialNaiveBayesClassifier<
      I,
      O
    >();
    multinomialNaiveBayesClassifier.alpha = alpha;
    multinomialNaiveBayesClassifier.classRelativeFeatureFrequencies = new Map(
      classRelativeFeatureFrequencies.map(([key, value]: [string, string]) => [
        key,
        FrequencyCounter.load(value),
      ])
    );
    multinomialNaiveBayesClassifier.classTypeFrequencyCounter = FrequencyCounter.load(
      classTypeFrequencyCounter
    );
    multinomialNaiveBayesClassifier.n = n;
    return multinomialNaiveBayesClassifier;
  }
}
