// 토마토
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [M, N, H] = input[0].split(' ').map(Number);
const arr = [];

for (let i = 1; i <= H * N; i += N) {
  arr.push(input.slice(i, i + N).map(v => v.split(' ').map(Number)));
}

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

function solution(M, N, H, arr) {
  const grid = Array.from(Array(H), () => Array.from(Array(N), () => Array(M).fill(Infinity))); // 토마토가 익는 최소 일수
  const tomatoes = []; // 처음에 익은 토마토 위치
  let answer = -1;

  // 위, 아래, 왼쪽, 오른쪽, 앞, 뒤 여섯 방향
  const dz = [-1, 1, 0, 0, 0, 0];
  const dx = [0, 0, -1, 1, 0, 0];
  const dy = [0, 0, 0, 0, -1, 1];

  function bfs(pos) {
    const queue = new Queue(); // shift() 연산 시간 초과 -> 큐 구현

    for (const p of pos) {
      queue.enqueue(p);
    }

    while (queue.size() > 0) {
      const [curZ, curX, curY, cnt] = queue.dequeue();

      for (let i = 0; i < 6; i++) {
        const nz = curZ + dz[i];
        const nx = curX + dx[i];
        const ny = curY + dy[i];
  
        if (nz >= 0 && nz < H && nx >= 0 && nx < N && ny >= 0 && ny < M && arr[nz][nx][ny] === 0 && grid[nz][nx][ny] === Infinity) {
          grid[nz][nx][ny] = Math.min(grid[nz][nx][ny], cnt + 1);
          queue.enqueue([nz, nx, ny, cnt + 1]);
        }
      }
    }
  }

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < M; k++) {
        if (arr[i][j][k] === 1) { // 처음에 익은 토마토는 최소 일수 0
          tomatoes.push([i, j, k, 0]);
          grid[i][j][k] = 0;
        } else if (arr[i][j][k] === -1) grid[i][j][k] = -1; // 토마토 없는 칸
      }
    }
  }
  
  bfs(tomatoes);

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < M; k++) {
        if (grid[i][j][k] === Infinity) return -1; // 토마토가 하나라도 안익는 경우
        else if (grid[i][j][k] !== -1) answer = Math.max(answer, grid[i][j][k]); // 토마토 없는 칸(-1) 제외하고 최소 날짜 구함
      }
    }
  }

  return answer;
}

console.log(solution(M, N, H, arr));
