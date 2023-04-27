// Fly me to the Alpha Centauri
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const T = parseInt(input[0]);
const arr = input.slice(1).map(v => v.split(' ').map(Number));

function solution(t, arr) {
  const answer = [];

  for (let i = 0; i < t; i++) {
    const [x, y] = arr[i];
    const dist = y - x;
    let count = 0;

    for (let i = 1; i <= dist; i++) {
      count++;
      if (dist <= i * i) {
        answer.push(count);
        break;
      } else {
        count++;
        if (dist <= i * (i + 1)) {
          answer.push(count);
          break;
        }
      }
    }
  }
 
  return answer.join('\n');
}

console.log(solution(T, arr));
