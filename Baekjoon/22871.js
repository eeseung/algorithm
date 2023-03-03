// 징검다리 건너기 (large)
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = parseInt(input[0]);
const arr = [0, ...input[1].split(' ').map(Number)];

function solution(n, arr) {
  const dp = Array.from(Array(n + 1).fill(Infinity));
  dp[1] = 0;

  for (let i = 2; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      const power = (i - j) * (1 + Math.abs(arr[i] - arr[j]));
      dp[i] = Math.min(dp[i], Math.max(dp[j], power));
    }
  }

  return dp[n];
}

console.log(solution(n, arr));
