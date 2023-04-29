// 공유기 설치
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [_, C] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(Number).sort((a, b) => a - b);

function solution(c, arr) {
  let left = 1;
  let right = arr[arr.length - 1];

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let count = 1;
    let prev = arr[0];

    for (const cur of arr) {
      if (cur - prev >= mid) {
        count++;
        prev = cur;
      }
    }

    if (count >= c) left = mid + 1;
    else right = mid - 1; 
  }

  return right;
}

console.log(solution(C, arr));
