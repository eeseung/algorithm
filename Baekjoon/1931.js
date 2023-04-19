// 회의실 배정
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const N = parseInt(input[0]);
const arr = input.slice(1).map(v => v.split(' ').map(Number));

function solution(N, arr) {
  const sorted = arr.sort((a, b) => a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]);
  let startTime = 0;
  let answer = 0;

  for (let i = 0; i < N; i++) {
    if (sorted[i][0] >= startTime) {
      startTime = sorted[i][1];
      answer++;
    }
  }

  return answer;
}

console.log(solution(N, arr));
