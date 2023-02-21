// 랜선 자르기
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [k, n] = input[0].split(' ').map(Number);
const lines = input.slice(1).sort((a, b) => a - b);

function solution(num, arr) {
  let left = 1;
  let right = arr[arr.length - 1];

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const count = arr.map(v => parseInt(v / mid)).reduce((acc, cur) => acc + cur, 0);

    if (count >= num) left = mid + 1;
    else right = mid - 1;
  }

  return right;
}

console.log(solution(n, lines));
