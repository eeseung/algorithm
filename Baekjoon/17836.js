// 공주님을 구해라
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, M, T] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(value) {
    this.queue[this.rear++] = value;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return value;
  }

  size() {
    return this.rear - this.front;
  }
}

function solution(N, M, T, arr) {
  let visited = Array.from({ length: N }, () => Array(M).fill(0));
  const sword = { x: 0, y: 0 };
  let answer = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] === 2) {
        sword.x = i;
        sword.y = j;
      }
    }
  }

  function bfs(targetX, targetY) {
    const queue = new Queue();
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    queue.enqueue([0, 0]);

    while (queue.size() > 0) {
      const [x, y] = queue.dequeue();

      if (x === targetX && y === targetY) return visited[x][y];

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (
          nx >= 0 &&
          nx < N &&
          ny >= 0 &&
          ny < M &&
          !visited[nx][ny] &&
          arr[nx][ny] !== 1
        ) {
          queue.enqueue([nx, ny]);
          visited[nx][ny] = visited[x][y] + 1;
        }
      }
    }

    return Infinity;
  }

  answer = bfs(N - 1, M - 1);
  visited = Array.from({ length: N }, () => Array(M).fill(0));
  answer = Math.min(
    answer,
    bfs(sword.x, sword.y) + (N - sword.x - 1) + (M - sword.y - 1)
  );

  return answer <= T ? answer : "Fail";
}

console.log(solution(N, M, T, arr));
