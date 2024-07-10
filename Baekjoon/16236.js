// 아기 상어
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const n = parseInt(input[0]);
const arr = input.slice(1).map((v) => v.split(' ').map(Number));

function solution(n, arr) {
  const position = [0, 0]; // 아기 상어 위치
  let size = 2; // 아기 상어 크기
  let count = 0; // 먹은 물고기 수
  let answer = 0;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  function bfs(x, y) {
    const queue = [[x, y]];
    const fish = []; // 먹을 수 있는 물고기 칸 좌표 & 거리
    const visited = Array.from({ length: n }, () => Array(n).fill(-1));
    visited[x][y] = 0;

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx >= 0 && nx < n && ny >= 0 && ny < n && visited[nx][ny] < 0 && arr[nx][ny] <= size) {
          visited[nx][ny] = visited[x][y] + 1;
          queue.push([nx, ny]);
          if (arr[nx][ny] > 0 && arr[nx][ny] < size) {
            fish.push([nx, ny, visited[nx][ny]]);
          }
        }
      }
    }

    return fish.sort((a, b) => (a[2] === b[2] ? (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]) : a[2] - b[2]));
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (arr[i][j] === 9) {
        position[0] = i;
        position[1] = j;
        arr[i][j] = 0;
      }
    }
  }

  while (true) {
    const fish = bfs(...position);

    if (fish.length === 0) break;
    else {
      const [x, y, dist] = fish[0];
      answer += dist;
      count++;
      position[0] = x;
      position[1] = y;
      arr[x][y] = 0;
    }

    if (count === size) {
      size += 1;
      count = 0;
    }
  }

  return answer;
}

console.log(solution(n, arr));
