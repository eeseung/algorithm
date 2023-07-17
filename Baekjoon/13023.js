// ABCDE
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, M, arr) {
  const graph = Array.from({ length: N }, () => []);
  let visited = Array(N).fill(false);
  let answer = 0;

  for (let i = 0; i < M; i++) {
    const [a, b] = arr[i];
    graph[a].push(b);
    graph[b].push(a);
  }

  function dfs(v, depth) {
    visited[v] = true;
    if (depth === 5) return (answer = 1);

    for (const next of graph[v]) {
      if (!visited[next]) dfs(next, depth + 1);
    }
    visited[v] = false;
  }

  for (let i = 0; i < N; i++) {
    dfs(i, 1);

    if (answer === 1) return 1;
    visited.fill(false);
  }

  return 0;
}

console.log(solution(N, M, arr));
