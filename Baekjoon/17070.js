// 파이프 옮기기 1
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const n = parseInt(input[0]);
const arr = input.slice(1).map(v => v.split(' ').map(Number));

function solution(n, arr) {
  const wall = Array.from({length: n + 1}, () => Array(n + 1).fill(0));
  const dp = Array.from({length: n + 1}, () => Array.from({length: n + 1}, () => [0, 0, 0])); // 파이프 이동 방법의 개수[가로, 세로, 대각선]

  dp[1][2][0] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      wall[i][j] = arr[i - 1][j - 1];
    }
  }

  for (let x = 1; x <= n; x++) {
    for (let y = 2; y <= n; y++) {
      if (wall[x][y] === 1) continue; // 벽인 경우

      dp[x][y][0] += dp[x][y - 1][0] + dp[x][y - 1][2]; // 가로
      dp[x][y][1] += dp[x - 1][y][1] + dp[x - 1][y][2]; // 세로
      if (wall[x - 1][y] === 0 && wall[x][y - 1] === 0) { // 대각선
        dp[x][y][2] += dp[x - 1][y - 1][0] + dp[x - 1][y - 1][1] + dp[x - 1][y - 1][2];
      }
    }
  }

  return dp[n][n][0] + dp[n][n][1] + dp[n][n][2];
}

console.log(solution(n, arr));
