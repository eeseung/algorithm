// 회문
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const arr = input.slice(1);

function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  function isPseudo(left, right) {
    while (left < right) {
      if (str[left] === str[right]) {
        left++;
        right--;
      } else return false;
    }
    return true;
  }
  
  while (left < right) {
    if (str[left] === str[right]) {
      left++;
      right--;
    } else {
      if (isPseudo(left + 1, right) || isPseudo(left, right - 1)) return 1;
      return 2;
    }
  }

  return 0;
}

function solution(arr) {
  const answer = [];

  for (const str of arr) {
    answer.push(isPalindrome(str));
  }

  return answer.join('\n');
}

console.log(solution(arr));
