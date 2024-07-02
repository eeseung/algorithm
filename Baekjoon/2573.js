// 빙산
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [N, M] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((v) => v.split(' ').map(Number));

function solution(N, M, arr) {
  let grid = arr.map((v) => [...v]);
  let answer = 1;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  function next(grid) {
    const nextGrid = grid.map((v) => [...v]);

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        for (let k = 0; k < 4; k++) {
          const nx = i + dx[k];
          const ny = j + dy[k];
          if (nx >= 0 && nx < N && ny >= 0 && ny < M && grid[nx][ny] === 0 && nextGrid[i][j] > 0) nextGrid[i][j]--;
        }
      }
    }

    return nextGrid;
  }

  function dfs(x, y, visited) {
    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < N && ny >= 0 && ny < M && !visited[nx][ny] && grid[nx][ny] > 0) dfs(nx, ny, visited);
    }
  }

  while (true) {
    const visited = Array.from({ length: N }, () => Array(M).fill(false));
    let count = 0;
    grid = next(grid).map((v) => [...v]);

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (grid[i][j] > 0 && !visited[i][j]) {
          dfs(i, j, visited);
          count++;
        }
      }
    }

    if (count === 1) answer++;
    if (count > 1) break;

    // 빙산이 다 녹을 때 까지 분리되지 않으면 0
    if (grid.every((row) => row.every((v) => v === 0))) {
      answer = 0;
      break;
    }
  }

  return answer;
}

console.log(solution(N, M, arr));
