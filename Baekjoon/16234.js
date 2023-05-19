// 인구 이동
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [N, L, R] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(v => v.split(' ').map(Number));

function solution(N, L, R, arr) {
  let visited = Array.from({length: N}, () => Array(N).fill(false));
  let union = [];
  let answer = 0;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  function dfs(x, y) {
    visited[x][y] = true;
    union.push({r: x, c: y, count: arr[x][y]});

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < N && ny >= 0 && ny < N && !visited[nx][ny]) {
        const diff = Math.abs(arr[x][y] - arr[nx][ny]);
        if (L <= diff && diff <= R) dfs(nx, ny);
      } 
    }
  }

  while (true) {
    let moveCount = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (!visited[i][j]) {
          dfs(i, j);
          
          if (union.length > 1) { // 국경선을 공유하는 나라가 있는 경우 인구 이동
            const sum = union.reduce((acc, cur) => acc + cur.count, 0);
            for (const country of union) {
              arr[country.r][country.c] = parseInt(sum / union.length);
            }
            moveCount++;
          }
          union = [];
        }
      }
    }
    
    if (moveCount === 0) break; // 인구 이동한 연합이 없으면 종료
    answer++;
    visited = Array.from({length: N}, () => Array(N).fill(false));
  }

  return answer;
}

console.log(solution(N, L, R, arr));
