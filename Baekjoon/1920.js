// 수 찾기
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = parseInt(input[0]);
const nArr = input[1].split(' ').map(Number);
const m = parseInt(input[2]);
const mArr = input[3].split(' ').map(Number);

function solution(n, nArr, m, mArr) {
  const sorted = nArr.sort((a, b) => a - b);
  const answer = [];

  for (let i = 0; i < m; i++) {
    let left = 0;
    let right = n - 1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (sorted[mid] < mArr[i]) left = mid + 1;
      else if (sorted[mid] > mArr[i]) right = mid - 1;
      else {
        answer.push(1);
        break;
      }
    }
  
    if (i >= answer.length) answer.push(0);
  }

  return answer.join('\n');
}

console.log(solution(n, nArr, m, mArr));
