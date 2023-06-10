// 징검다리 건너기
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const N = parseInt(input[0]);
const arr = input.slice(1, N + 1).map(v => v.split(' ').map(Number));
const K = parseInt(input[N]);

function solution(N, arr, K) {
  const dp = Array.from({length: N + 1}, () => [Infinity, Infinity]);

  if (N === 1) return 0;

  dp[0][0] = 0;
  dp[1][0] = arr[0][0];
  dp[2][0] = Math.min(arr[0][0] + arr[1][0], arr[0][1]);

  for (let i = 3; i < N; i++) {
    dp[i][0] = Math.min(
      dp[i - 1][0] + arr[i - 1][0], 
      dp[i - 2][0] + arr[i - 2][1]
    );
    dp[i][1] = Math.min(
      Math.min(dp[i - 1][1] + arr[i - 1][0], dp[i - 2][1] + arr[i - 2][1]),
      K + dp[i - 3][0]
    );
  }

  return Math.min(...dp[N - 1]);
}

console.log(solution(N, arr, K));
