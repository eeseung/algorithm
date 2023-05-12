// 쉬운 최단거리
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [n, m] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(v => v.split(' ').map(Number));

function solution(n, m, arr) {
  let targetX = 0, targetY = 0;
  const visited = Array.from({length: n}, () => Array(m).fill(false));
  const answer = Array.from({length: n}, () => Array(m).fill(0));

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  // 목표지점 위치
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (arr[i][j] === 2) {
        targetX = i;
        targetY = j;
      }
    }
  }

  function bfs(x, y) {
    const queue = [[x, y]];
    
    while (queue.length > 0) {
      const [curX, curY] = queue.shift();

      if (visited[curX][curY]) continue;
      visited[curX][curY] = true;

      for (let i = 0; i < 4; i++) {
        const nx = curX + dx[i];
        const ny = curY + dy[i];
  
        if (nx >= 0 && nx < n && ny >= 0 && ny < m && !visited[nx][ny] && arr[nx][ny] === 1) {
          answer[nx][ny] = answer[curX][curY] + 1;
          queue.push([nx, ny]);
        }
      }
    }
  }

  bfs(targetX, targetY);

  // 갈 수 있는 땅(1)인데 목표지점까지 거리가 0이면 도달할 수 없는 위치(-1)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (arr[i][j] === 1 && answer[i][j] === 0) answer[i][j] = -1;
    }
  }
  
  return answer.map(v => v.join(' ')).join('\n');
}

console.log(solution(n, m, arr));
