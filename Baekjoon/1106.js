// 호텔
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [C, N] = input[0].split(" ").map(Number);
const arr = input
  .slice(1)
  .map((v) => v.split(" ").map(Number))
  .sort((a, b) => a[0] - b[0]);

function solution(C, N, arr) {
  const dp = Array(C + 1).fill(Infinity);
  dp[0] = 0;

  for (const [cost, num] of arr) {
    if (dp[num] > cost) dp[num] = cost;

    for (let i = 1; i <= C; i++) {
      dp[i] =
        num > i
          ? Math.min(dp[i], cost)
          : Math.min(dp[i], dp[num] + dp[i - num]);
    }
  }

  return dp[C];
}

console.log(solution(C, N, arr));
