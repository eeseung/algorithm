// 호석이 두 마리 치킨
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, _] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, arr) {
  const dist = Array.from({ length: N }, () => Array(N).fill(0));
  const answer = { sum: Infinity, buildings: [N, N] };

  for (const [A, B] of arr) {
    dist[A - 1][B - 1] = 1;
    dist[B - 1][A - 1] = 1;
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (i !== j && !dist[i][j]) {
        dist[i][j] = Infinity;
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < N; k++) {
        if (dist[j][i] === Infinity || dist[i][k] === Infinity) {
          continue;
        }
        dist[j][k] = Math.min(dist[j][k], dist[j][i] + dist[i][k]);
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let sum = 0;
      for (let k = 0; k < N; k++) {
        sum += Math.min(dist[k][i] * 2, dist[k][j] * 2);
      }
      if (answer.sum > sum) {
        answer.sum = sum;
        answer.buildings = [i + 1, j + 1];
      }
    }
  }

  return `${answer.buildings.join(" ")} ${answer.sum}`;
}

console.log(solution(N, arr));
