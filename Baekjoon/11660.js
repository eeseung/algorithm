// 구간 합 구하기 5
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [n, m] = input[0].split(' ').map(Number);
const arr = input.slice(1, n + 1).map(v => v.split(' ').map(Number));
const xyArr = input.slice(n + 1).map(v => v.split(' ').map(Number));

function solution(n, m, arr, xyArr) {
  const dp = Array.from({length: n + 1}, () => Array(n + 1).fill(0));
  const answer = [];

  for (let x = 1; x <= n; x++) {
    for (let y = 1; y <= n; y++) {
      dp[x][y] = dp[x - 1][y] + dp[x][y - 1] - dp[x - 1][y - 1] + arr[x - 1][y - 1];
    }
  }

  for (let i = 0; i < m; i++) {
    const [x1, y1, x2, y2] = xyArr[i];
    answer.push(dp[x2][y2] - dp[x1 - 1][y2] - dp[x2][y1 - 1] + dp[x1 - 1][y1 - 1]);
  }

  return answer.join('\n');
}

console.log(solution(n, m, arr, xyArr));
