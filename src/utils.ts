/**
 * separate punc from words, ignore common words, etc.
 * won't work for special characters
 * @param text the text to tokenize
 * @param punctation optional: include punctuation as a token or not
 */
export function tokenizeEnglishText(text: string, punctuation = true) {
  let token = "",
    tokens: string[] = [];

  function swallowToken() {
    if (token) {
      tokens.push(token);
      token = "";
    }
  }

  for (const char of text + " ") {
    if (/\s/.test(char)) {
      swallowToken();
      continue;
    }
    if (/[a-zA-Z0-9]/.test(char)) {
      token += char;
      continue;
    }
    if (punctuation) {
      // otherwise, assume punctuation or some interesting feature
      swallowToken();
      token += char;
    }
  }
  return tokens;
}
