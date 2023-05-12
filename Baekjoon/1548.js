// 부분 삼각 수열
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const N = parseInt(input[0]);
const arr = input[1].split(' ').map(Number);

function solution(N, arr) {
  const sorted = arr.sort((a, b) => a - b);
  let answer = 1;

  for (let x = 0; x < N - 1; x++) {
    for (let z = N - 1; z > -1; z--) {
      if (x + 1 > z) continue;
      if (sorted[x] + sorted[x + 1] > sorted[z]) answer = Math.max(answer, z - x + 1);
    }
  }

  return answer;
}

console.log(solution(N, arr));
