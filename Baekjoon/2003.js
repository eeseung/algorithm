// 수들의 합 2
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

function solution(n, m, arr) {
  let i = 0, j = 0, sum = arr[i];
  let answer = 0;

  while (n > i && n > j) {
    if (sum > m) {
      sum -= arr[i++];
    } else {
      if (sum === m) answer++;
      sum += arr[++j];
    }
  }

  return answer;
}

console.log(solution(n, m, arr));
