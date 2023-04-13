// 쉬운 계단 수
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');

function solution(n) {
  const dp = Array.from({length: n + 1}, () => Array(10).fill(0));

  // dp[n][i] -> 길이가 n이면서 i로 끝나는 계단 수의 개수
  dp[1] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  dp[2] = [1, 1, 2, 2, 2, 2, 2, 2, 2, 1];

  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < 10; j++) {
      if (j === 0) {
        dp[i][j] = dp[i - 1][j + 1] % 1000000000;
      } else if (j === 9) {
        dp[i][j] = dp[i - 1][j - 1] % 1000000000;
      } else {
        dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j + 1]) % 1000000000;
      }
    }
  }

  return dp[n].reduce((acc, cur) => acc + cur, 0) % 1000000000;
}

console.log(solution(parseInt(input[0])));
