// 잃어버린 괄호
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

function solution(str) {
  const arr = str.split('-');
  let answer = arr[0].split('+').reduce((acc, cur) => acc + parseInt(cur), 0);
  
  answer += arr.slice(1).reduce((acc, cur) => acc - cur.split('+').reduce((a, c) => a + parseInt(c), 0), 0);

  return answer;
}

console.log(solution(input[0]));
