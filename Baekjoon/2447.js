// 별 찍기 - 10
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const N = parseInt(input[0]);

function solution(N) {
  const answer = Array.from({length: N}, () => Array(N).fill('*'));

  function divide(row, col, size) {
    if (size === 1) return;

    for (let i = row; i < row + size; i += size / 3) {
      for (let j = col; j < col + size; j += size / 3) {
        if (i === row + size / 3 && j === col + size / 3) {
          for (let r = i; r < i + size / 3; r++) {
            for (let c = j; c < j + size / 3; c++) {
              answer[r][c] = ' ';
            }
          }
        }
        else divide(i, j, size / 3);
      }
    }
  }

  divide(0, 0, N);

  return answer.map(v => v.join('')).join('\n');
}

console.log(solution(N));
