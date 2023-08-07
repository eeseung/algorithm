// 주지수
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1, N + 1).map((v) => v.split(" ").map(Number));
const kArr = input.slice(N + 2).map((v) => v.split(" ").map(Number));

function solution(N, M, arr, kArr) {
  const sum = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));
  const answer = [];

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      sum[i][j] =
        arr[i - 1][j - 1] + sum[i][j - 1] + sum[i - 1][j] - sum[i - 1][j - 1];
    }
  }

  for (const [x1, y1, x2, y2] of kArr) {
    answer.push(
      sum[x2][y2] - sum[x1 - 1][y2] - sum[x2][y1 - 1] + sum[x1 - 1][y1 - 1]
    );
  }

  return answer.join("\n");
}

console.log(solution(N, M, arr, kArr));
