// 트리의 부모 찾기
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = parseInt(input[0]);
const arr = input.slice(1).map(v => v.split(' ').map(Number));

function solution(n, arr) {
  const graph = Array.from(Array(n + 1), () => []);
  const visited = Array(n + 1).fill(false);
  const answer = Array(n + 1);

  for (const [src, dest] of arr) {
    graph[src].push(dest);
    graph[dest].push(src);
  }

  function bfs(v) {
    const queue = [v];

    while (queue.length > 0) {
      const cur = queue.shift();

      if (visited[cur]) continue;
      visited[cur] = true;

      for (const next of graph[cur]) {
        if (!visited[next]) {
          queue.push(next);
          answer[next] = cur;
        }
      }
    }
  }

  bfs(1);

  return answer.slice(2).join('\n');
}

console.log(solution(n, arr));
