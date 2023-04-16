// 외판원 순회 2
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const n = parseInt(input[0]);
const arr = input.slice(1).map(v => v.split(' ').map(Number));

function solution(n, arr) {
  const map = Array.from({length: n + 1}, () => Array(n + 1).fill(0));
  const visited = Array(n + 1).fill(false);
  let answer = Infinity;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      map[i + 1][j + 1] = arr[i][j];
    }
  }

  function dfs(start, v, sum) {
    for (let i = 1; i <= n; i++) {
      if (!visited[i] && map[v][i] > 0) {
        visited[i] = true;
        if (sum + map[v][i] < answer) dfs(start, i, sum + map[v][i]);
        visited[i] = false;
      }
    }

    if (visited.filter(v => v).length === n && start === v) answer = Math.min(answer, sum);
  }

  for (let i = 1; i <= n; i++) {
    dfs(i, i, 0);
  }

  return answer;
}

console.log(solution(n, arr));
