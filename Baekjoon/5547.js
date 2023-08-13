// 일루미네이션
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [W, H] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(W, H, arr) {
  const grid = Array.from({ length: H + 2 }, () => Array(W + 2).fill(0));
  const visited = Array.from({ length: H + 2 }, () => Array(W + 2).fill(false));
  let answer = 0;

  const dx = [
    [1, 0, -1, -1, -1, 0],
    [1, 1, 0, -1, 0, 1],
  ]; // 짝수 / 홀수
  const dy = [0, 1, 1, 0, -1, -1];

  for (let i = 1; i < H + 1; i++) {
    for (let j = 1; j < W + 1; j++) {
      grid[i][j] = arr[i - 1][j - 1];
    }
  }

  function bfs(y, x) {
    const queue = [[y, x]];
    visited[y][x] = true;

    while (queue.length > 0) {
      const [curY, curX] = queue.shift();

      // 흰색 정육각형을 기준으로 6개 벽면 모두 확인
      for (let i = 0; i < 6; i++) {
        const nx = curX + dx[curY % 2][i];
        const ny = curY + dy[i];

        if (0 <= ny && ny < H + 2 && 0 <= nx && nx < W + 2) {
          if (grid[ny][nx] === 0 && !visited[ny][nx]) {
            queue.push([ny, nx]);
            visited[ny][nx] = true;
          } else if (grid[ny][nx] === 1) {
            // 회색 건물과 닿음
            answer++;
          }
        }
      }
    }
  }

  bfs(0, 0);

  return answer;
}

console.log(solution(W, H, arr));
