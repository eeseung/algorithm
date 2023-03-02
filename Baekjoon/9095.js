// 1, 2, 3 더하기
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = parseInt(input[0]);
const arr = input.slice(1).map(Number);

function solution(n, arr) {
  const max = Math.max(...arr);
  const dp = Array.from({length: max + 1}).fill(0);
  const answer = [];

  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 4;

  for (let i = 4; i <= max; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }

  for (let i = 0; i < n; i++) {
    answer.push(dp[arr[i]]);
  }

  return answer.join('\n');
}

console.log(solution(n, arr));
