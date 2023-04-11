// 단지번호붙이기
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const n = parseInt(input[0]);
const arr = input.slice(1).map(v => v.split('').map(Number));

function solution(n, arr) {
  const graph = Array.from(Array(n + 1), () => Array(n + 1).fill(0));
  const visited = Array.from({length: n + 1}, () => Array(n + 1).fill(false));
  const answer = [];

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (arr[i][j] === 1) graph[i + 1][j + 1] = 1;
    }
  }

  function dfs(x, y, count) {
    visited[x][y] = true;
    count++;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx > 0 && ny > 0 && nx <= n && ny <= n && !visited[nx][ny] && graph[nx][ny] === 1) count = dfs(nx, ny, count);
    }

    return count;
  }

  for (let x = 1; x <= n; x++) {
    for (let y = 1; y <= n; y++) {
      if (!visited[x][y] && graph[x][y] === 1) answer.push(dfs(x, y, 0));
    }
  }

  return answer.length + '\n' + answer.sort((a, b) => a - b).join('\n');
}

console.log(solution(n, arr));
