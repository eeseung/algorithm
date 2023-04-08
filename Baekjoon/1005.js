// ACM Craft
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const t = parseInt(input[0]);
let idx = 1;

function solution(n, dArr, arr, w) {
  const graph = Array.from(Array(n + 1), () => []);
  const prev = Array.from(Array(n + 1).fill(0));
  const dp = [-1, ...dArr];
  const start = [];

  for (let i = 0; i < arr.length; i++) {
    graph[arr[i][0]].push(arr[i][1]);
    prev[arr[i][1]]++;
  }

  function bfs(v) {
    const queue = [...v];

    while (queue.length > 0) {
      const cur = queue.shift();

      for (const next of graph[cur]) {
        dp[next] = Math.max(dp[next], dp[cur] + dArr[next - 1]);
        prev[next]--;
        if (prev[next] === 0) queue.push(next);
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    if (prev[i] === 0) start.push(i);
  }
 
  bfs(start);

  return dp[w];
}

for (let i = 0; i < t; i++) {
  const [n, k] = input[idx].split(' ').map(Number);
  const dArr = input[idx + 1].split(' ').map(Number);
  const arr = input.slice(idx + 2, idx + 2 + k).map(v => v.split(' ').map(Number));
  const w = parseInt(input[idx + 2 + k]);
  idx += k + 3;

  console.log(solution(n, dArr, arr, w));
}
