// 암벽 등반
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [_, T] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number).reverse());

function solution(T, arr) {
  const map = {};
  let answer = -1;

  const dx = [-2, -1, 0, 1, 2];
  const dy = [-2, -1, 0, 1, 2];

  for (const [y, x] of arr) {
    if (map[y]) {
      map[y][x] = 1;
    } else {
      map[y] = { [x]: 1 };
    }
  }

  function bfs(x, y, count) {
    const queue = [{ x, y, count }];

    while (queue.length > 0) {
      const { x, y, count } = queue.shift();

      if (y === T) {
        answer = count;
        return;
      }

      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (dy[i] === 0 && dx[j] === 0) continue;

          const ny = y + dy[j];
          const nx = x + dx[i];

          if (ny < 0 || ny > T || nx < 0) continue;
          if (map[ny] && map[ny][nx] === 1) {
            queue.push({ x: nx, y: ny, count: count + 1 });
            map[ny][nx] = 2;
          }
        }
      }
    }
  }

  bfs(0, 0, 0);

  return answer;
}

console.log(solution(T, arr));
