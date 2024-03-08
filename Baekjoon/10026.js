// 적록색약
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const N = parseInt(input[0]);
const arr = input.slice(1).map((v) => v.split(""));

function solution(N, arr) {
  let visited = Array.from({ length: N }, () => Array(N).fill(false));
  const answer = [0, 0];

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  function rgb(x, y, color, count) {
    visited[x][y] = true;
    count++;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        nx >= 0 &&
        nx < N &&
        ny >= 0 &&
        ny < N &&
        !visited[nx][ny] &&
        arr[nx][ny] === color
      )
        rgb(nx, ny, color, count);
    }

    return count;
  }

  function rb(x, y, color, count) {
    // 적록색약
    visited[x][y] = true;
    count++;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < N && ny >= 0 && ny < N && !visited[nx][ny]) {
        if (color !== "B" && arr[nx][ny] !== "B") rb(nx, ny, color, count);
        else if (color === "B" && arr[nx][ny] === "B") rb(nx, ny, color, count);
      }
    }

    return count;
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) answer[0] += rgb(i, j, arr[i][j], 0);
    }
  }

  visited = Array.from({ length: N }, () => Array(N).fill(false));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) answer[1] += rb(i, j, arr[i][j], 0);
    }
  }

  return answer.join(" ");
}

console.log(solution(N, arr));
