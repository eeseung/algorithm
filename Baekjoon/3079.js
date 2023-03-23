// 입국심사
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [n, m] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(Number).sort((a, b) => a - b);

function solution(n, m, arr) {
  let left = 0;
  let right = m * arr[arr.length - 1];
  let answer = 0;

  if (n === 1) return m * arr[0];

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let count = arr.reduce((acc, cur) => acc + parseInt(mid / cur), 0);

    if (count >= m) {
      right = mid - 1;
    } else {
      left = mid + 1;
      answer = left;
    }
  }

  return answer;
}

console.log(solution(n, m, arr));
