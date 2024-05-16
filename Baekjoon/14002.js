// 가장 긴 증가하는 부분 수열 4
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const N = parseInt(input[0]);
const arr = input[1].split(" ").map(Number);

function solution(N, arr) {
  const dp = Array.from({ length: N }).fill(1);
  const answer = [];

  for (let i = 1; i < N; i++) {
    let max = 0;

    for (let j = 0; j <= i; j++) {
      if (arr[i] > arr[j]) max = Math.max(max, dp[j]);
    }
    dp[i] = max + 1;
  }

  let dpMax = Math.max(...dp);

  for (let i = N; i >= 0; i--) {
    if (dp[i] === dpMax) {
      answer.unshift(arr[i]);
      dpMax--;
    }
  }

  return Math.max(...dp) + "\n" + answer.join(" ");
}

console.log(solution(N, arr));
