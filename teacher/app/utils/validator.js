export const ValidatorType = {
  EMAIL: "email",
  EMAIL_POSTFIX: "emailPostfix",
  AT_LEAST_EIGHT: "atLeastEight",
  INCLUDE_ALPHABET_SPECIAL_CHAR_NUMBER: "includeAlphabetSpecialCharNumber",
  SEQUENTIAL_NUMBER_CHAR: "sequentialNumberChar",
};

const ValidatorPatterns = {
  [ValidatorType.EMAIL]: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
  [ValidatorType.EMAIL_POSTFIX]: "^[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
  [ValidatorType.AT_LEAST_EIGHT]: "^.{8,}$",
  [ValidatorType.INCLUDE_ALPHABET_SPECIAL_CHAR_NUMBER]: "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).+$",
  [ValidatorType.SEQUENTIAL_NUMBER_CHAR]: "^(?!.*(123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)).+$",
};

export class Validator {
  constructor(type, guide = "유효하지 않은 입력입니다.") {
    let regex = ValidatorPatterns[type] ? ValidatorPatterns[type] : `^${type}\$`;
    this.regex = new RegExp(regex);
    this.guide = guide;
  }

  isMatch = (input) => this.regex.test(input);
  getGuide = () => this.guide;
}
