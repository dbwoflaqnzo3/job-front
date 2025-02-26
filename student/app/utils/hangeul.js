const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
const JONG = ' ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ';

const IJUNG_MOEUM = {
  'ㅘ': ['ㅗㅏ'],
  'ㅚ': ['ㅗㅣ'],
  'ㅟ': ['ㅜㅣ'],
  'ㅢ': ['ㅡㅣ'],
  'ㅐ': ['ㅏㅣ'],
  'ㅒ': ['ㅑㅣ'],
  'ㅔ': ['ㅓㅣ'],
  'ㅖ': ['ㅕㅣ'],
  'ㅝ': ['ㅜㅓ'],
  'ㅙ': ['ㅗㅐ', 'ㅘㅣ', 'ㅗㅏㅣ'],
  'ㅞ': ['ㅜㅔ', 'ㅝㅣ', 'ㅜㅓㅣ'],
};

export function _choseong(char) {
  if (!_isHangeul(char)) return char;
  const index = char.charCodeAt(0) - 0xAC00;
  return CHO[Math.floor(index / 588)];
}

export function _jungseong(char) {
  if (!_isHangeul(char)) return char;
  const index = char.charCodeAt(0) - 0xAC00;
  return JUNG[Math.floor((index % 588) / 28)];
}

export function _jongseong(char) {
  if (!_isHangeul(char)) return char;
  const index = char.charCodeAt(0) - 0xAC00;
  return JONG[index % 28];
}

export function choseong(text) {
  return [...text].map(_choseong).join('');
}

export function jungseong(text) {
  return [...text].map(_jungseong).join('');
}

export function jongseong(text) {
  return [...text].map(_jongseong).join('');
}

export function hasBatchim(char) {
  if (!_isHangeul(char)) return false;
  return _jongseong(char) !== ' ';
}

export function puleossugi(text) {
  return [...text].map(char => {
    if (!_isHangeul(char) || !_isEumjeol(char)) return char;
    return [_choseong(char), _jungseong(char), hasBatchim(char) ? _jongseong(char) : ''].join('');
  }).join('');
}

export function moassugi(text) {
  let result = text;
  Object.entries(IJUNG_MOEUM).forEach(([key, moeums]) => {
    moeums.forEach(moeum => {
      if (result.includes(moeum)) {
        result = result.replace(moeum, key);
      }
    });
  });

  let list = [...result].map(char => ({ char, isJaeum: _isJaeum(char) }));
  let finalResult = [], charBuffer = [];
  let moeumFlag = false;

  for (let { char, isJaeum } of list.reverse()) {
    charBuffer.unshift(char);
    if (isJaeum) {
      if (moeumFlag) {
        finalResult.unshift(_moassugi(charBuffer.join('')));
        charBuffer = [];
        moeumFlag = false;
      }
      continue;
    }
    moeumFlag = true;
  }

  return finalResult.join('');
}

export function last(text) {
  return text[text.length - 1];
}

export function eunNeun(text) {
  return hasBatchim(last(text)) ? '은' : '는';
}

export function eunNeunName(text) {
  return hasBatchim(last(text)) ? '이는' : '는';
}

export function iGa(text) {
  return hasBatchim(last(text)) ? '이' : '가';
}

export function iGaName(text) {
  return hasBatchim(last(text)) ? '이가' : '가';
}

export function eulReul(text) {
  return hasBatchim(last(text)) ? '을' : '를';
}

export function eulReulName(text) {
  return hasBatchim(last(text)) ? '이를' : '를';
}

export function roEuro(text) {
  return hasBatchim(last(text)) ? '으로' : '로';
}

export function withEunNeun(text) {
  return text + eunNeun(text);
}

export function withEunNeunName(text) {
  return text + eunNeunName(text);
}

export function withIGa(text) {
  return text + iGa(text);
}

export function withIGaName(text) {
  return text + iGaName(text);
}

export function withEulReul(text) {
  return text + eulReul(text);
}

export function withEulReulName(text) {
  return text + eulReulName(text);
}

export function withRoEuro(text) {
  return text + roEuro(text);
}

function _isJaeum(char) {
  const code = char.charCodeAt(0);
  return code >= 0x3131 && code <= 0x314E;
}

function _isMoeum(char) {
  const code = char.charCodeAt(0);
  return code >= 0x314F && code <= 0x3163;
}

function _isEumjeol(char) {
  const code = char.charCodeAt(0);
  return code >= 0xAC00 && code <= 0xD7A3;
}

function _isHangeul(char) {
  return _isJaeum(char) || _isMoeum(char) || _isEumjeol(char);
}

export function isHangeul(text) {
  return [...text].every(char => _isHangeul(char) || char === ' ');
}

export function hasHangeul(text) {
  return [...text].some(char => _isHangeul(char));
}

export function hasSeparatedJaeumOrMoeum(text) {
  return [...text].some(char => _isJaeum(char) || _isMoeum(char));
}

export function isSeparatedJaeumOrMoeum(text) {
  return [...text].every(char => _isJaeum(char) || _isMoeum(char));
}

export function containsHangeul(text, other) {
  return puleossugi(text).includes(puleossugi(other));
}

export function containsChoseong(text, other) {
  if (!isSeparatedJaeumOrMoeum(other)) return false;
  return choseong(text).includes(other);
}