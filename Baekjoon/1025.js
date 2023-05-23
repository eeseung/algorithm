// 제곱수 찾기
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [N, M] = input[0].split(' ').map(Number);
const arr = input.slice(1);

// 완전 제곱수 판별
function isPerfectSquareNumber(num) {
  return Math.floor(Math.sqrt(num)) ** 2 === num;
}

function solution(N, M, arr) {
  let answer = -1;

  for (let i = 0; i < N; i++) { // 시작 행 위치
    for (let j = 0; j < M; j++) { // 시작 열 위치
      for (let x = -N; x < N; x++) { // 행 공차
        for (let y = -M; y < M; y++) { // 열 공차
          let r = i, c = j;
          let num = '';

          if (x === 0 && y === 0) continue;
          while (r >= 0 && r < N && c >= 0 && c < M) {
            num += arr[r][c];
            if (isPerfectSquareNumber(parseInt(num))) answer = Math.max(answer, num);
            r += x;
            c += y;
          }
        }
      }
    }
  }

  return answer;
}

console.log(solution(N, M, arr));
