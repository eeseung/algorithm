// 점프
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const N = parseInt(input[0]);
const arr = input.slice(1).map(v => v.split(' ').map(Number));

function solution(N, arr) {
  const dp = Array.from({length: N}, () => Array(N).fill(BigInt(0)));
  dp[0][0] = BigInt(1);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const count = arr[i][j];
      if (count === 0) continue;
      if (i + count < N) dp[i + count][j] += dp[i][j];
      if (j + count < N) dp[i][j + count] += dp[i][j];

    }
  }

  return dp[N - 1][N - 1].toString();
}

console.log(solution(N, arr));
