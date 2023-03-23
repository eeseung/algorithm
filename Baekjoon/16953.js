// A → B
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [a, b] = input[0].split(' ').map(Number);

function solution(a, b) {
  let answer = 1;

  while (b > a) {
    let bStr = b.toString();

    if (b % 2 === 0) {
      b /= 2;
    } else if (bStr[bStr.length - 1] === '1') {
      b = parseInt(bStr.slice(0, bStr.length - 1));
    } else break;
    
    answer++;
  }

  return a === b ? answer : -1;
}

console.log(solution(a, b));
