// 특정 거리의 도시 찾기
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, _, k, x] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(v => v.split(' ').map(Number));

function solution(n, k, x, arr) {
  const graph = Array.from(Array(n + 1), () => []); // 인접 리스트
  const visited = Array.from(Array(n + 1), () => 0); // 방문 여부 & 거리
  const answer = [];

  for (const [src, dest] of arr) {
    graph[src].push(dest);
  }

  function bfs(v) {
    const queue = [v];
    visited[v] = 1;

    while (queue.length > 0) {
      const cur = queue.shift();

      if (visited[cur] === k + 1) {
        answer.push(cur);
        continue;
      }

      for (const next of graph[cur]) {
        if (visited[next] === 0) {
          queue.push(next);
          visited[next] = visited[cur] + 1;
        }
      }
    }
  }

  bfs(x);

  return answer.length > 0 ? answer.sort((a, b) => a - b).join('\n') : -1;
}

console.log(solution(n, k, x, arr));
