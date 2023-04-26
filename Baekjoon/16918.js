// 봄버맨
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [R, C, N] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(v => v.split(''));

function solution(r, c, n, arr) {
  if (n === 1) return arr.map(v => v.join('')).join('\n');
  else if (n % 2 === 0) return Array.from({length: r}, () => 'O'.repeat(c)).join('\n');
  
  function explosion(prevArr, s) {
    const result = Array.from({length: r}, () => Array(c).fill('O'));
    const state =  s === '.' ? 'O' : '.';

    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        if (prevArr[i][j] === s) {
          result[i][j] = state;
          if (i + 1 < r) result[i + 1][j] = state;
          if (0 < i) result[i - 1][j] = state;
          if (0 < j) result[i][j - 1] = state;
          if (j + 1 < c) result[i][j + 1] = state;
        }
      }
    }

    return result;
  }

  const grid = explosion(arr, 'O');

  if (n % 4 === 3) return grid.map(v => v.join('')).join('\n');
  else if (n % 4 === 1) return explosion(grid, 'O').map(v => v.join('')).join('\n');
}

console.log(solution(R, C, N, arr));
