// 중량제한
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1, M + 1).map((v) => v.split(" ").map(Number));
const [start, end] = input[M + 1].split(" ").map(Number);

function solution(N, arr, start, end) {
  const graph = Array.from({ length: N + 1 }, () => []);
  let max = 0;

  for (const [A, B, C] of arr) {
    max = Math.max(max, C);
    graph[A].push([B, C]);
    graph[B].push([A, C]);
  }

  function bfs(N, graph, start, end, mid) {
    const visited = new Array(N + 1).fill(false);
    const queue = [];

    queue.push(start);
    while (queue.length > 0) {
      const cur = queue.shift();
      visited[cur] = true;

      if (cur === end) {
        return true;
      }

      for (const [nextNode, nextLimit] of graph[cur]) {
        if (!visited[nextNode] && mid <= nextLimit) {
          visited[nextNode] = true;
          queue.push(nextNode);
        }
      }
    }

    return false;
  }

  let left = 1;
  let right = max;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (bfs(N, graph, start, end, mid)) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return right;
}

console.log(solution(N, arr, start, end));
