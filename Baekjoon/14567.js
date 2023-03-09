// 선수과목 (Prerequisite)
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, _] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(v => v.split(' ').map(Number));

function solution(n, arr) {
  const graph = Array.from(Array(n + 1), () => []);
  const indegree = Array(n + 1).fill(0);
  const queue = [];
  const answer = Array(n + 1);

  for (let [a, b] of arr) {
    graph[a].push(b);
    indegree[b]++;
  }

  for (let i = 1; i <= n + 1; i++) {
    if (indegree[i] === 0) {
      answer[i] = 1;
      queue.push(i);
    }
  }

  while (queue.length) {
    let cur = queue.shift();

    for (let next of graph[cur]) {
      if (indegree[next] === 1) {
        answer[next] = answer[cur] + 1;
        queue.push(next);
      }
      indegree[next]--;
    }
  }

  return answer.slice(1).join(' ');
}

console.log(solution(n, arr));
