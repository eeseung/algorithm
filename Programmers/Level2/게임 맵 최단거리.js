function solution(maps) {
  const visited = maps.map((map) => Array(map.length + 1).fill(false));
  const n = maps.length - 1; // y
  const m = maps[0].length - 1; // x
  const queue = [[0, 0, 1]]; // 위치(y, x), 위치까지 최단 거리
  let answer = -1;

  // 상하좌우
  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];

  while (queue.length > 0) {
    const [y, x, dist] = queue.shift();

    if (x === m && y === n) { // 도착
      answer = dist;
    }

    for (let i = 0; i < dx.length; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx <= m && ny >= 0 && ny <= n && !visited[ny][nx] && maps[ny][nx] === 1) {
        queue.push([ny, nx, dist + 1]);
        visited[ny][nx] = true;
      }
    }
  }

  return answer;
}
