// 겹치는 건 싫어
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, k] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

function solution(n, k, arr) {
  const count = {};
  let start = 0, end = 0;
  let answer = 0;

  while (n > start && n > end) {
    count[arr[end]] = count[arr[end]] + 1 || 1;

    while (count[arr[end]] > k) {
      count[arr[start]]--;
      start++;
    }

    answer = Math.max(answer, end - start + 1);
    end++;
  }

  return answer;
}

console.log(solution(n, k, arr));
