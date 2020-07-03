import { tokenizeEnglishText } from "./utils";

describe("utils", () => {
  describe("tokenizeEnglishText", () => {
    it("should tokenize as expected", () => {
      expect(
        tokenizeEnglishText("hello my name is kevin and im pretty cool")
      ).toEqual([
        "hello",
        "my",
        "name",
        "is",
        "kevin",
        "and",
        "im",
        "pretty",
        "cool",
      ]);
    });

    it("should tokenize punctuation separately", () => {
      expect(tokenizeEnglishText("ok. good! confused?")).toEqual([
        "ok",
        ".",
        "good",
        "!",
        "confused",
        "?",
      ]);
    });
  });
});
