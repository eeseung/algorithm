// 휴게소 세우기
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [N, M, L] = input[0].split(' ').map(Number);
const arr = input[1] ? input[1].split(' ').map(Number) : [];

function solution(N, M, L, arr) {
  const sorted = [0, ...arr.sort((a, b) => a - b), L];
  let left = 1, right = L - 1;

  while (left <= right) {
    let mid = parseInt((left + right) / 2);
    let sum = 0;

    for (let i = 1; i < N + 2; i++) {
      sum += parseInt((sorted[i] - sorted[i - 1] - 1) / mid);
    }

    if (sum > M) left = mid + 1;
    else right = mid - 1;
  }

  return left;
}

console.log(solution(N, M, L, arr));
