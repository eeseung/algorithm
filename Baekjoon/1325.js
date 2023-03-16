// 효율적인 해킹
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, _] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(v => v.split(' ').map(Number));

function solution(n, arr) {
  const graph = Array.from(Array(n + 1), () => []); // 인접 리스트
  const visited = Array.from(Array(n + 1).fill(false)); // 방문 여부
  const hacking = Array.from(Array(n + 1).fill(0)); // 해킹할 수 있는 컴퓨터 수
  let max = 0;
  let answer = [];

  for (const [src, dest] of arr) {
    graph[dest].push(src);
  }

  function dfs(v, idx) {
    const next = graph[v];

    visited[v] = true;
    hacking[idx]++;

    for (let i = 0; i < next.length; i++) {
      if (!visited[next[i]]) {
        dfs(next[i], idx);
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    dfs(i, i);
    max = Math.max(max, hacking[i]);
    visited.fill(false);
  }

  hacking.forEach((v, i) => {
    if (v === max) answer.push(i);
  })

  return answer.join('\n');
}

console.log(solution(n, arr));
