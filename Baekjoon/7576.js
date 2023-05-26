// 토마토
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [M, N] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(v => v.split(' ').map(Number));

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

function solution(M, N, arr) {
  const grid = Array.from(Array(N), () => Array(M).fill(Infinity)); // 토마토가 익는 최소 일수
  const tomatoes = []; // 처음에 익은 토마토 위치
  let answer = -1;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  function bfs(pos) {
    const queue = new Queue(); // shift() 연산 시간 초과 -> 큐 구현

    for (const p of pos) {
      queue.enqueue(p);
    }

    while (queue.size() > 0) {
      const [curX, curY, cnt] = queue.dequeue();

      for (let i = 0; i < 4; i++) {
        const nx = curX + dx[i];
        const ny = curY + dy[i];
  
        if (nx >= 0 && nx < N && ny >= 0 && ny < M && arr[nx][ny] === 0 && grid[nx][ny] === Infinity) {
          grid[nx][ny] = Math.min(grid[nx][ny], cnt + 1);
          queue.enqueue([nx, ny, cnt + 1]);
        }
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] === 1) { // 처음에 익은 토마토는 최소 일수 0
        tomatoes.push([i, j, 0]);
        grid[i][j] = 0;
      } else if (arr[i][j] === -1) grid[i][j] = -1; // 토마토 없는 칸
    }
  }

  bfs(tomatoes);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (grid[i][j] === Infinity) return -1; // 토마토가 모두 익지는 X
      else if (grid[i][j] !== -1) answer = Math.max(answer, grid[i][j]); // 토마토 없는 칸(-1) 제외하고 최소 날짜 구함
    }
  }

  return answer;
}

console.log(solution(M, N, arr));
