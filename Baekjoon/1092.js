// 배
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const N = parseInt(input[0]);
const limits = input[1].split(' ').map(Number).sort((a, b) => b - a);
const M = parseInt(input[2]);
const weights = input[3].split(' ').map(Number).sort((a, b) => b - a);

function solution(N, limits, M, weights) {
  let answer = 0;

  // 모든 박스를 배로 옮길 수 없으면 -1
  if (weights[0] > limits[0]) {
    return -1;
  }

  while (weights.length > 0) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (limits[i] >= weights[j]) {
          weights.splice(j, 1);
          break;
        }
      }
    }
    answer += 1;
  }

  return answer;
}

console.log(solution(N, limits, M, weights));
