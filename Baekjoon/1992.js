// 쿼드트리
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = parseInt(input[0]);
const arr = input.slice(1).map(v => v.split('').map(Number));

function solution(n, arr) {
  const answer = [];

  function recursion(n, x, y) {
    let total = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        total += arr[y + j][x + i];
      }
    }
    if (total === 0) answer.push('0');
    else if (total === n * n) answer.push('1');
    else {
      n /= 2;
      answer.push('(');
      recursion(n, x, y);
      recursion(n, x + n, y);
      recursion(n, x, y + n);
      recursion(n, x + n, y + n);
      answer.push(')');
    }
  }

  recursion(n, 0, 0);

  return answer.join('');
}

console.log(solution(n, arr));
