// 좌표 정렬하기 2
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const arr = input.slice(1).map(e => e.split(' ').map(Number));

function solution(arr) {
  const answer = arr.sort((a, b) => a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]);
  return answer.map(e => e.join(' ')).join('\n');
}

console.log(solution(arr));
