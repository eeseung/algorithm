// 설탕 배달
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

function solution(n) {
  const dp = Array.from({length: n + 1}).fill(-1);
  dp[3] = 1;
  dp[5] = 1;

  for (let i = 6; i <= n; i++) {
    if (dp[i - 3] > 0) dp[i] = dp[i - 3] + 1;
    if (dp[i - 5] > 0) dp[i] = dp[i - 5] + 1;
  }

  return dp[n];
}

console.log(solution(parseInt(input)));
