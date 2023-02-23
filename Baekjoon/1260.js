// DFS와 BFS
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, _, v] = input[0].split(' ').map(Number);

function solution(n, v, arr) {
  let graph = Array.from(Array(n + 1), () => []); // 인접 리스트
  const visited = Array(n + 1).fill(false);
  const answer = [[], []]; // dfs, bfs 순

  for (const v of arr) {
    const [src, dest] = v.split(' ').map(Number);
    graph[src].push(dest);
    graph[dest].push(src);
  }

  graph = graph.map(v => v.sort((a, b) => a - b));

  function dfs(v) {
    visited[v] = true;
    answer[0].push(v);

    for (const next of graph[v]) {
      if (!visited[next]) dfs(next);
    }
  }

  function bfs(v) {
    const queue = [v];

    while (queue.length > 0) {
      const cur = queue.shift();

      if (visited[cur]) continue;
      visited[cur] = true;
      answer[1].push(cur);

      for (const next of graph[cur]) {
        if (!visited[next]) queue.push(next);
      }
    }
  }

  dfs(v);
  visited.fill(false); // 초기화
  bfs(v);

  return answer.map(v => v.join(' ')).join('\n');
}

console.log(solution(n, v, input.slice(1)));
