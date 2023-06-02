// 끝나지 않는 파티
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [N, M] = input[0].split(' ').map(Number);
const nArr = input.slice(1, N + 1).map(v => v.split(' ').map(Number));
const mArr = input.slice(N + 1).map(v => v.split(' ').map(Number));

function solution(N, M, nArr, mArr) {
  const answer = [];

  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (nArr[i][j] > nArr[i][k] + nArr[k][j]) nArr[i][j] = nArr[i][k] + nArr[k][j];
      }
    }
  }

  for (const [a, b, c] of mArr) {
    if (nArr[a - 1][b - 1] <= c) answer.push('Enjoy other party');
    else answer.push('Stay here');
  }

  return answer.join('\n');
}

console.log(solution(N, M, nArr, mArr));
