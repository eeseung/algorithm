// 미로 탐색
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [n, m] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(v => v.split('').map(Number));

function solution(n, m, arr) {
  const visited = Array.from({ length: n }, () => Array(m).fill(0));
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  function bfs(x, y) {
    const queue = [[x, y]];
    
    visited[x][y] = 1;

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || ny < 0 || nx >= n || ny >= m || visited[nx][ny] > 0) continue;
        if (arr[nx][ny] === 1) {
          visited[nx][ny] = visited[x][y] + 1;
          queue.push([nx, ny]);
        }
      }
    }
  }

  bfs(0, 0);

  return visited[n - 1][m - 1];  
}

console.log(solution(n, m, arr));
