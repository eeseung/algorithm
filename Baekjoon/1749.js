// 점수따먹기
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, M, arr) {
  const sum = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));
  let answer = -Infinity;

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      sum[i][j] =
        sum[i][j - 1] + arr[i - 1][j - 1] + sum[i - 1][j] - sum[i - 1][j - 1];
    }
  }

  for (let x1 = 1; x1 <= N; x1++) {
    for (let y1 = 1; y1 <= M; y1++) {
      for (let x2 = x1; x2 <= N; x2++) {
        for (let y2 = y1; y2 <= M; y2++) {
          answer = Math.max(
            answer,
            sum[x2][y2] -
              sum[x1 - 1][y2] -
              sum[x2][y1 - 1] +
              sum[x1 - 1][y1 - 1]
          );
        }
      }
    }
  }

  return answer;
}

console.log(solution(N, M, arr));
