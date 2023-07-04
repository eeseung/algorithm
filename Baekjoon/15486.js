// 퇴사 2
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const N = parseInt(input[0]);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, arr) {
  const dp = new Array(N + 1).fill(0);
  let max = 0;

  for (let i = 0; i < N; i++) {
    const [t, p] = arr[i]; // 기간, 이익
    max = Math.max(max, dp[i]);

    if (i + t <= N) {
      // N + 1일에는 회사에 없음
      dp[i + t] = Math.max(dp[i + t], max + p);
    }
  }

  return Math.max(...dp);
}

console.log(solution(N, arr));
