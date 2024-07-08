// 고냥이
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const N = parseInt(input[0]);
const str = input[1];

function solution(N, str) {
  const alphabet = Array(26).fill(0);
  let start = 0;
  let end = 0;
  let answer = 0;

  while (start < str.length && end < str.length) {
    if (alphabet.filter((v) => v > 0).length < N) {
      alphabet[str[end].charCodeAt(0) - 97]++;
      end++;
    } else if (alphabet.filter((v) => v > 0).length === N) {
      if (alphabet[str[end].charCodeAt(0) - 97]) {
        alphabet[str[end].charCodeAt(0) - 97]++;
        end++;
      } else {
        alphabet[str[start].charCodeAt(0) - 97]--;
        start++;
      }
    } else {
      alphabet[str[start].charCodeAt(0) - 97]--;
      start++;
    }
    answer = Math.max(answer, end - start);
  }

  return answer;
}

console.log(solution(N, str));
