// 유기농 배추
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const t = parseInt(input[0]);
let idx = 0;

function solution(m, n, arr) {
  const map = Array.from({length: m}, () => Array(n).fill(0));
  const visited = Array.from({length: m}, () => Array(n).fill(false));
  let answer = 0;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  for (const [x, y] of arr) {
    map[x][y] = 1;
  }

  function dfs(x, y) {
    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && ny >= 0 && nx < m && ny < n && !visited[nx][ny] && map[nx][ny] === 1) dfs(nx, ny);
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && map[i][j] === 1) {
        answer++;
        dfs(i, j);
      }
    }
  }
  
  return answer;
}

for (let i = 1; i <= t; i++) {
  const [m, n, k] = input[idx + i].split(' ').map(Number);
  const arr = [];

  for (let j = 1; j <= k; j++) {
    arr.push(input[idx + i + j].split(' ').map(Number));
  }
  idx += k;

  console.log(solution(m, n, arr));
}
