// 징검다리 건너기 (small)
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, K] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

function solution(N, K, arr) {
  const dp = Array(N).fill(-1);
  dp[0] = 0;

  for (let j = 1; j < N; j++) {
    const powers = [];
    for (let i = 0; i < j; i++) {
      const power = (j - i) * (1 + Math.abs(arr[i] - arr[j]));
      if (power <= K && dp[i] >= 0) {
        powers.push(dp[i] + power);
      }
    }

    if (powers.length > 0) {
      dp[j] = Math.min(...powers);
    }
  }

  return dp[N - 1] > 0 ? "YES" : "NO";
}

console.log(solution(N, K, arr));
