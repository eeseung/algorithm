// 바이러스
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const n = parseInt(input[0]);
const arr = input.slice(2).map(v => v.split(' ').map(Number));

function solution(arr) {
  const graph = Array.from({length: n + 1}, () => []);
  const visited = Array.from(Array(n + 1).fill(false));
  let answer = 0;

  for (const [src, dest] of arr) {
    graph[src].push(dest);
    graph[dest].push(src);
  }

  function dfs(v) {
    visited[v] = true;
    answer++;

    for (const next of graph[v]) {
      if (!visited[next]) dfs(next);
    }
  }

  dfs(1);

  return answer - 1;
}

console.log(solution(arr));
