// 동전 2
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [_, k] = input[0].split(" ").map(Number);
const arr = input.slice(1).map(Number);

function solution(k, arr) {
  const dp = Array(k + 1).fill(0);

  // 주어진 동전 가치일 때 만들 수 있는 최소 동전 개수 -> 1
  for (const coin of arr) {
    dp[coin] = 1;
  }

  for (let i = arr[0]; i <= k; i++) {
    if (dp[i] > 0) continue;
    const counts = [];

    for (const coin of arr) {
      if (dp[i - coin] > 0) {
        counts.push(dp[i - coin] + 1);
        dp[i] = Math.min(...counts);
      }
    }
  }

  return dp[k] ? dp[k] : -1;
}

console.log(solution(k, arr));
