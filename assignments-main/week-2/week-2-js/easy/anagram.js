/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  const cleanStr = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');

  let word1 = cleanStr(str1);
  let word2 = cleanStr(str2);

  if (word1.length !== word2.length) {
    return false;
  }

  return word1 == word2;

}

module.exports = isAnagram;
