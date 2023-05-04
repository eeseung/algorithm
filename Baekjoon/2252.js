// 줄 세우기
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [N, _] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(v => v.split(' ').map(Number));

function solution(n, arr) {
  const graph = Array.from(Array(n + 1), () => []);
  const indegree = Array(n + 1).fill(0);
  const queue = [];
  const answer = [];

  for (let [a, b] of arr) {
    graph[a].push(b);
    indegree[b]++;
  }

  for (let i = 1; i <= n + 1; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  while (queue.length) {
    const cur = queue.shift();
    answer.push(cur);

    for (const next of graph[cur]) {
      if (indegree[next] === 1) queue.push(next);
      indegree[next]--;
    }
  }

  return answer.join(' ');
}

console.log(solution(N, arr));
