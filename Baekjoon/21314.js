// 민겸 수
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');

function convertMax(arr) {
  let str = '';
  let max = '';

  arr.forEach((v, i) => {
    str += v;
    if (v === 'K') {
      max += '5';
      max += '0'.repeat(str.length - 1);
      str = '';
    }
    if (i === arr.length - 1 && v === 'M') {
      max += '1'.repeat(str.length);
    }
  })

  return max;
}

function convertMin(arr) {
  let str = '';
  let min = '';

  arr.forEach((v, i) => {
    str += v;
    if (v === 'K') {
      if (str.length > 1) {
        min += '1';
        min += '0'.repeat(str.length - 2);
      }
      min += '5';
      str = '';
    }

    if (i === arr.length - 1 && v === 'M') {
      min += '1';
      min += '0'.repeat(str.length - 1);
    }
  })

  return min;
}

function solution(arr) {
  const answer = [];

  answer.push(convertMax(arr));
  answer.push(convertMin(arr));
  
  return answer.join('\n');
}

console.log(solution(input[0].split('')));
