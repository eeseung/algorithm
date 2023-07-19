// 무기 공학
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, M, arr) {
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  let answer = 0;

  function rightUp(x, y) {
    return arr[x][y + 1] + arr[x - 1][y] + arr[x][y] * 2;
  }

  function rightDown(x, y) {
    return arr[x][y + 1] + arr[x + 1][y] + arr[x][y] * 2;
  }

  function leftUp(x, y) {
    return arr[x][y - 1] + arr[x - 1][y] + arr[x][y] * 2;
  }

  function leftDown(x, y) {
    return arr[x][y - 1] + arr[x + 1][y] + arr[x][y] * 2;
  }

  function dfs(x, y, sum) {
    if (y === M) {
      y = 0;
      x++;
    }
    if (x === N) {
      answer = Math.max(answer, sum);
      return;
    }

    if (!visited[x][y]) {
      if (x - 1 >= 0 && y + 1 < M && !visited[x - 1][y] && !visited[x][y + 1]) {
        visited[x][y] = true;
        visited[x - 1][y] = true;
        visited[x][y + 1] = true;
        dfs(x, y + 1, sum + rightUp(x, y));
        visited[x][y] = false;
        visited[x - 1][y] = false;
        visited[x][y + 1] = false;
      }
      if (x + 1 < N && y + 1 < M && !visited[x + 1][y] && !visited[x][y + 1]) {
        visited[x][y] = true;
        visited[x + 1][y] = true;
        visited[x][y + 1] = true;
        dfs(x, y + 1, sum + rightDown(x, y));
        visited[x][y] = false;
        visited[x + 1][y] = false;
        visited[x][y + 1] = false;
      }
      if (
        x - 1 >= 0 &&
        y - 1 >= 0 &&
        !visited[x - 1][y] &&
        !visited[x][y - 1]
      ) {
        visited[x][y] = true;
        visited[x - 1][y] = true;
        visited[x][y - 1] = true;
        dfs(x, y + 1, sum + leftUp(x, y));
        visited[x][y] = false;
        visited[x - 1][y] = false;
        visited[x][y - 1] = false;
      }
      if (x + 1 < N && y - 1 >= 0 && !visited[x + 1][y] && !visited[x][y - 1]) {
        visited[x][y] = true;
        visited[x + 1][y] = true;
        visited[x][y - 1] = true;
        dfs(x, y + 1, sum + leftDown(x, y));
        visited[x][y] = false;
        visited[x + 1][y] = false;
        visited[x][y - 1] = false;
      }
    }
    dfs(x, y + 1, sum);
  }

  dfs(0, 0, 0);

  return answer;
}

console.log(solution(N, M, arr));
