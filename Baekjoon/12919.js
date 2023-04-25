// A와 B 2
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');

function solution(S, T) {
  let answer = 0;

  function deleteA(str) {
    return str.slice(0, -1);
  }

  function deleteB(str) {
    return str.split('').reverse().join('').slice(0, -1);
  }

  function makeS(str) {
    if (str === S) answer = 1;
    if (str[0] === 'B') makeS(deleteB(str));
    if (str[str.length - 1] === 'A') makeS(deleteA(str));
  }

  makeS(T);

  return answer;
}

console.log(solution(input[0], input[1]));
