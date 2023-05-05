// 피아노 체조
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const N = parseInt(input[0]);
const arr = [0, ...input[1].split(' ').map(Number)];
const Q = parseInt(input[2]);
const xyArr = input.slice(3).map(v => v.split(' ').map(Number));

function solution(N, arr, Q, xyArr) {
  const dp = Array(N + 1).fill(0);
  const answer = [];

  for (let i = 1; i <= N; i++) {
    if (arr[i] > arr[i + 1]) dp[i] = dp[i - 1] + 1;
    else dp[i] = dp[i - 1];
  }

  for (let i = 0; i < Q; i++) {
    const [x, y] = xyArr[i];
    answer.push(dp[y - 1] - dp[x - 1]);
  }

  return answer.join('\n');
}

console.log(solution(N, arr, Q, xyArr));
