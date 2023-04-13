// 2×n 타일링 2
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');

function solution(n) {
  const dp = Array(n + 1).fill(0);

  dp[1] = 1;
  dp[2] = 3;
  dp[3] = 5;

  for (let i = 4; i <= n; i++) {
    dp[i] = (dp[i - 2] * 2 + dp[i - 1]) % 10007;
  }

  return dp[n];
}

console.log(solution(parseInt(input[0])));
