function solution(maps) {
  const visited = maps.map((v) => v.split(""));
  const answer = [];

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  function dfs(x, y, sum) {
    visited[x][y] = 'X';
    if (maps[x][y] !== 'X') sum += parseInt(maps[x][y]);

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= maps.length || ny >= maps[0].length || visited[nx][ny] === 'X') continue;
      if (maps[nx][ny] !== 'X') sum += dfs(nx, ny, 0);
    }

    return sum;
  }

  for (let i = 0; i < maps.length; i++) {
    for (let j = 0; j < maps[0].length; j++) {
      if (visited[i][j] !== 'X') answer.push(dfs(i, j, 0));
    }
  }

  return answer.length > 0 ? answer.sort((a, b) => a - b) : [-1];
}
