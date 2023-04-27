// 계단 오르기
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const n = parseInt(input[0]);
const arr = input.slice(1).map(Number);

function solution(n, arr) {
  const dp = Array(n).fill(0);
  dp[0] = arr[0];
  dp[1] = arr[0] + arr[1];
  dp[2] = Math.max(arr[0], arr[1]) + arr[2];

  for (let i = 3; i < n; i++) {
    dp[i] = Math.max(dp[i - 3] + arr[i - 1] + arr[i], dp[i - 2] + arr[i]);
  }

  return dp[n - 1];
}

console.log(solution(n, arr));
