// 센서
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const N = parseInt(input[0]);
const K = parseInt(input[1]);
const arr = input[2].split(' ').map(Number).sort((a, b) => a - b);

function solution(N, K, arr) {
  const diffs = [];
  let answer = 0;

  for (let i = 1; i < N; i++) {
    diffs.push(Math.abs(arr[i] - arr[i - 1]));
  }

  diffs.sort((a, b) => b - a);

  for (let i = K - 1; i < N - 1; i++) {
    answer += diffs[i];
  }

  return answer;
}

console.log(solution(N, K, arr));
