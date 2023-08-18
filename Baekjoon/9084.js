// 동전
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const T = parseInt(input[0]);

function solution(N, arr, M) {
  const dp = Array(M + 1).fill(0);
  dp[0] = 1;

  for (const coin of arr) {
    for (let i = coin; i <= M; i++) {
      dp[i] += dp[i - coin];
    }
  }

  return dp[M];
}

for (let i = 1; i <= T; i++) {
  const N = parseInt(input[i * 3 - 2]);
  const arr = input[i * 3 - 1].split(" ").map(Number);
  const M = parseInt(input[i * 3]);

  console.log(solution(N, arr, M));
}
