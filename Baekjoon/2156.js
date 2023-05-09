// 포도주 시식
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const n = parseInt(input[0]);
const arr = input.slice(1).map(Number);

function solution(n, arr) {
  const dp = Array(n + 1).fill(0);
  dp[1] = arr[0];
  dp[2] = arr[0] + arr[1];

  for (let i = 3; i <= n; i++) {
    dp[i] = Math.max(dp[i - 3] + arr[i - 2] + arr[i - 1], dp[i - 2] + arr[i - 1], dp[i - 1]);
  }

  return dp[n];
}

console.log(solution(n, arr));
