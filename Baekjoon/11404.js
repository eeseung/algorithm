// 플로이드
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const n = parseInt(input[0]);
const m = parseInt(input[1]);
const arr = input.slice(2).map((v) => v.split(" ").map(Number));

function solution(n, m, arr) {
  const graph = Array.from({ length: n }, () => Array(n).fill(Infinity));

  for (const [a, b, c] of arr) {
    graph[a - 1][b - 1] = Math.min(c, graph[a - 1][b - 1]);
  }

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) graph[i][j] = 0; // 시작 도시, 도착 도시가 같은 경우 0
        else graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (graph[i][j] === Infinity) graph[i][j] = 0; // 갈 수 없는 경우 0
    }
  }

  return graph.map((v) => v.join(" ")).join("\n");
}

console.log(solution(n, m, arr));
