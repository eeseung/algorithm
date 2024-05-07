// 가장 긴 증가하는 부분 수열
const fs = require("fs");
const input = fs.readFileSync("test.txt").toString().trim().split("\n");
const n = input[0];
const arr = input[1].split(" ").map(Number);

function solution(n, arr) {
  const dp = Array.from({ length: n }).fill(1);

  for (let i = 1; i < n; i++) {
    let max = 0;

    for (let j = 0; j <= i; j++) {
      if (arr[i] > arr[j]) max = Math.max(max, dp[j]);
    }
    dp[i] = max + 1;
  }

  return Math.max(...dp);
}

console.log(solution(n, arr));
