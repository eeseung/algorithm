// 연속합
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = input[0];
const arr = input[1].split(' ').map(Number);

function solution(n, arr) {
  const dp = [];
  
  for (let i = 0; i < n; i++) {
    dp[i] = arr[i];
    if (dp[i - 1] + arr[i] > dp[i]) dp[i] = dp[i - 1] + arr[i];
  }

  return Math.max(...dp);
}

console.log(solution(n, arr));
