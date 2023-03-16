// 가장 큰 증가하는 부분 수열
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = parseInt(input[0]);
const arr = input[1].split(' ').map(Number);

function solution(n, arr) {
  const dp = [];

  for (let i = 0; i < n; i++) {
    dp[i] = arr[i];

    for (let j = 0; j < i; j++) {
      if (dp[j] + arr[i] > dp[i] && arr[i] > arr[j]) {
        dp[i] = dp[j] + arr[i];
      }
    }
  }

  return Math.max(...dp);
}

console.log(solution(n, arr));
