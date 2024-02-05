function solution(board) {
  const N = board.length;
  const M = board[0].length;
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  const queue = [];
  let answer = 0;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === "R") {
        queue.push([i, j]);
        visited[i][j] = true;
      }
    }
  }

  while (queue.length) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const [x, y] = queue.shift();

      for (let j = 0; j < 4; j++) {
        let nx = x + dx[j];
        let ny = y + dy[j];

        while (
          nx >= 0 &&
          nx < N &&
          ny >= 0 &&
          ny < M &&
          board[nx][ny] !== "D"
        ) {
          nx += dx[j];
          ny += dy[j];
        }
        nx -= dx[j];
        ny -= dy[j];

        if (board[nx][ny] === "G") return answer + 1;
        if (!visited[nx][ny]) {
          visited[nx][ny] = true;
          queue.push([nx, ny]);
        }
      }
    }
    answer += 1;
  }

  return -1;
}
