// 행복 유치원
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [N, K] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

function solution(N, K, arr) {
  const costs = [];
  let answer = 0;

  for (let i = 0; i < N - 1; i++) {
    costs.push(arr[i + 1] - arr[i]);
  }

  costs.sort((a, b) => a - b);

  for (let i = 0; i < N - K; i++) {
    answer += costs[i];
  }

  return answer;
}

console.log(solution(N, K, arr));
