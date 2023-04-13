// 스티커
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const t = parseInt(input[0]);

function solution(n, arr) {
  const dp = Array.from({length: n + 1}, () => Array(3).fill(0));

  dp[1][0] = 0; // 0: 안 뗌
  dp[1][1] = arr[0][0]; // 1: 위 스티커 뗌
  dp[1][2] = arr[1][0]; // 2: 아래 스티커 뗌

  for (let i = 2; i <= n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1], dp[i - 1][2]); // 이전 스티커 상관 없음
    dp[i][1] = Math.max(dp[i - 1][0], dp[i - 1][2]) + arr[0][i - 1]; // 이전 스티커 안 떼거나 아래 스티커 뗌
    dp[i][2] = Math.max(dp[i - 1][0], dp[i - 1][1]) + arr[1][i - 1]; // 이전 스티커 안 떼거나 위 스티커 뗌
  }

  return Math.max(...dp[n]);
}

for (let i = 1; i <= t; i++) {
  const n = parseInt(input[i * 3 - 2]);
  const arr = input.slice(i * 3 - 1, i * 3 + 1).map(v => v.split(' ').map(Number));

  console.log(solution(n, arr));
}
