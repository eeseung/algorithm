// 피보나치 함수
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const t = parseInt(input[0]);
const arr = input.slice(1).map(Number);

function solution(n, arr) {
  const max = Math.max(...arr);
  const dp = [];
  const answer = [];

  dp[0] = [1, 0];
  dp[1] = [0, 1];

  for (let i = 2; i <= max; i++) {
    dp[i] = [dp[i - 1][0] + dp[i - 2][0], dp[i - 1][1] + dp[i - 2][1]];
  }

  for (let i = 0; i < n; i++) {
    answer.push(dp[arr[i]]);
  }
  
  return answer.map(v => v.join(' ')).join('\n');
}

console.log(solution(t, arr));
