// 음악프로그램
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [N, M] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((v) => v.split(' ').map(Number));

function solution(N, M, arr) {
  const graph = Array.from({ length: N + 1 }, () => []);
  const indegree = Array(N + 1).fill(0);
  const queue = [];
  const answer = [];

  for (let i = 0; i < M; i++) {
    for (let j = 1; j < arr[i][0]; j++) {
      graph[arr[i][j]].push(arr[i][j + 1]);
      indegree[arr[i][j + 1]]++;
    }
  }

  for (let i = 1; i <= N; i++) {
    if (indegree[i] === 0) {
      queue.push(i);
    }
  }

  while (queue.length) {
    const cur = queue.shift();
    answer.push(cur);

    for (const next of graph[cur]) {
      if (indegree[next] === 1) {
        queue.push(next);
      }
      indegree[next]--;
    }

    if (answer.length < N && queue.length === 0) break;
  }

  return answer.length === N ? answer.join('\n') : 0;
}

console.log(solution(N, M, arr));
