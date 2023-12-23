/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if (str1.length != str2.length) return false;

  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  // return str1.split("").sort().join("") == str2.split("").sort().join("");
  const counter = {};
  for (let i = 0; i < str1.length; i++) {
    if (counter.hasOwnProperty(str1[i])) {
      counter[str1[i]]++;
    } else {
      counter[str1[i]] = 1;
    }
  }

  for (let i = 0; i < str2.length; i++) {
    if (counter.hasOwnProperty(str2[i])) {
      counter[str2[i]]--;
    } else {
      return false;
    }
  }

  for (const key in counter) {
    if (counter[key] != 0) return false;
  }

  return true;
}

module.exports = isAnagram;
