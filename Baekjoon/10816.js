// 숫자 카드 2
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const nArr = input[1].split(' ').map(Number);
const mArr = input[3].split(' ').map(Number);

function solution(nArr, mArr) {
  const map = new Map();
  const answer = [];

  for (const num of nArr) {
    if (map.has(num)) map.set(num, (map.get(num) + 1));
    else map.set(num, 1);
  }
  
  for (const findValue of mArr) {
    if (map.has(findValue)) answer.push(map.get(findValue));
    else answer.push(0);
  }

  return answer.join(' ');
}

console.log(solution(nArr, mArr));
