import MultinomialNaiveBayesClassifier, {
  MuiltinomialNaiveBayesClassifierArgs,
} from "./multinomial-naive-bayes-classifier";
import { tokenizeEnglishText } from "./utils";

export interface BayesTextClassifierArgs
  extends MuiltinomialNaiveBayesClassifierArgs {
  tokenizePunctuation?: boolean;
}

export default class BayesTextClassifier<T> {
  private multinomialNaiveBayesClassifier: MultinomialNaiveBayesClassifier<
    string,
    T
  >;
  private tokenizePunctuation: boolean;
  /**
   * create a new text classifier
   */
  constructor({
    tokenizePunctuation = true,
    ...args
  }: BayesTextClassifierArgs = {}) {
    this.tokenizePunctuation = tokenizePunctuation;
    this.multinomialNaiveBayesClassifier = new MultinomialNaiveBayesClassifier(
      args
    );
  }

  /**
   * learn an excerpt of text
   * @param text the text to learn
   * @param classType expected class for the model to predict
   * @returns this
   */
  public learnText(text: string, classType: T) {
    this.multinomialNaiveBayesClassifier.fit(
      tokenizeEnglishText(text, this.tokenizePunctuation),
      classType
    );
    return this;
  }

  /**
   * classify an excerpt of text
   * @param text the text to classify
   * @returns classification prediction
   */
  public classifyText(text: string) {
    return this.multinomialNaiveBayesClassifier.classify(
      tokenizeEnglishText(text, this.tokenizePunctuation)
    );
  }
  /**
   * dump the model to load later
   */
  public dump() {
    return JSON.stringify({
      tokenizePunctuation: this.tokenizePunctuation,
      multinomialNaiveBayesClassifier: this.multinomialNaiveBayesClassifier.dump(),
    });
  }

  /**
   * load the model from a previously dumped string
   * @param dumpStr the result from model.dump
   * @returns the model from the string
   */
  public static load<T>(dumpStr: string) {
    const { tokenizePunctuation, multinomialNaiveBayesClassifier } = JSON.parse(
      dumpStr
    );
    const bayesTextClassifier = new BayesTextClassifier<T>({
      tokenizePunctuation,
    });
    bayesTextClassifier.multinomialNaiveBayesClassifier = MultinomialNaiveBayesClassifier.load(
      multinomialNaiveBayesClassifier
    );
    return bayesTextClassifier;
  }
}
