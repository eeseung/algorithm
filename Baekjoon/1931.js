// 회의실 배정
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = parseInt(input[0]);
const arr = input.slice(1).map(v => v.split(' ').map(Number));

function solution(n, arr) {
  const sorted = arr.sort((a, b) => a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]);
  let time = sorted[0][1];
  let answer = 1;

  for (let i = 1; i < n; i++) {
    if (sorted[i][0] >= time) {
      time = sorted[i][1];
      answer++;
    }
  }

  return answer;
}

console.log(solution(n, arr));
