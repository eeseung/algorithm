// 경로 찾기
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const n = parseInt(input[0]);
const arr = input.slice(1).map(v => v.split(' ').map(Number));

function solution(n, arr) {
  const graph = Array.from(Array(n), () => []);
  const visited = Array.from(Array(n).fill(false));
  const answer = Array.from(Array(n), () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (arr[i][j] === 1) graph[i].push(j);
    }
  }

  function dfs(v, i) {
    visited[v] = true;

    for (const next of graph[v]) {
      answer[i][next] = 1;
      if (!visited[next]) dfs(next, i);
    }
  }

  for (let i = 0; i < n; i++) {
    dfs(i, i);
    visited.fill(false);
  }

  return answer.map(v => v.join(' ')).join('\n');
}

console.log(solution(n, arr));
