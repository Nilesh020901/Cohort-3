/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  const characters = str.toLowerCase().split('');
    
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);

  return characters.filter(char => vowels.has(char)).length;
}

module.exports = countVowels;