// 별 찍기 - 11
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const N = parseInt(input[0]);

function solution(N) {
  if (N === 3) return ['  *  ', ' * * ', '*****'];

  const r = solution(N / 2);
  const result = [];

  for (const i of r) {
    result.push(' '.repeat(N / 2) + i + ' '.repeat(N / 2));
  }
  for (const j of r) {
    result.push(j + ' ' + j);
  }

  return result;
}

console.log(solution(N).join('\n'));
