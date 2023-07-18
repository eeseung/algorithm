// 테트로미노
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, M, arr) {
  let visited = Array.from({ length: N }, () => Array(M).fill(false));
  let answer = 0;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  function dfs(x, y, sum, depth) {
    if (depth === 4) {
      answer = Math.max(answer, sum);
      return;
    }

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < N && ny >= 0 && ny < M && !visited[nx][ny]) {
        visited[nx][ny] = true;
        dfs(nx, ny, sum + arr[nx][ny], depth + 1);
        visited[nx][ny] = false;
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      visited[i][j] = true;
      dfs(i, j, arr[i][j], 1);
      visited[i][j] = false;
    }
  }

  // T자 테트로미노 (ㅗ, ㅜ)
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M - 2; j++) {
      const sum = arr[i][j] + arr[i][j + 1] + arr[i][j + 2];
      if (i > 0) answer = Math.max(answer, sum + arr[i - 1][j + 1]);
      if (i < N - 1) answer = Math.max(answer, sum + arr[i + 1][j + 1]);
    }
  }

  // T자 테트로미노 (ㅏ, ㅓ)
  for (let j = 0; j < M; j++) {
    for (let i = 0; i < N - 2; i++) {
      const sum = arr[i][j] + arr[i + 1][j] + arr[i + 2][j];
      if (j > 0) answer = Math.max(answer, sum + arr[i + 1][j - 1]);
      if (j < M - 1) answer = Math.max(answer, sum + arr[i + 1][j + 1]);
    }
  }

  return answer;
}

console.log(solution(N, M, arr));
