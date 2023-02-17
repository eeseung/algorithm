// DFS와 BFS
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, m, v] = input[0].split(' ').map(Number);

function solution(n, arr) {
  let graph = Array.from(Array(n + 1), () => []); // 인접 리스트
  const visited = Array(n + 1).fill(0);
  const answer = [[], []]; // dfs, bfs 순

  for (const v of arr) {
    const [src, dest] = v.split(' ').map(Number);
    graph[src].push(dest);
    graph[dest].push(src);
  }

  graph = graph.map((e) => e.sort((a, b) => a - b));

  function dfs(v) {
    visited[v] = 1;
    answer[0].push(v);

    for (const i of graph[v]) {
      if (!visited[i]) dfs(i);
    }
  }

  function bfs(v) {
    const queue = [v];

    while (queue.length > 0) {
      const cur = queue.shift();

      if (visited[cur]) continue;
      visited[cur] = 1;
      answer[1].push(cur);

      for (const next of graph[cur]) {
        if (!visited[next]) queue.push(next);
      }
    }
  }

  dfs(v);
  visited.fill(0); // 초기화
  bfs(v);

  return answer.map((e) => e.join(' ')).join('\n');
}

console.log(solution(n, input.slice(1)));
