/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  if (str.length <= 1) return true;
  str = str.match(/[a-z]/gi)?.join("").toLowerCase();
  if (!str) return false;
  const halfLen = Math.floor(str.length / 2);
  for (let i = 0; i <= halfLen; i++) {
    if (str[i] != str[str.length - i - 1]) return false;
  }
  return true;
}

module.exports = isPalindrome;
