// 최소비용 구하기
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const n = parseInt(input[0]);
const m = parseInt(input[1]);
const arr = input.slice(2, m + 2).map((v) => v.split(' ').map(Number));
const [s, e] = input[m + 2].split(' ').map(Number);

function solution(n, m, arr, s, e) {
  const costs = Array.from({ length: n + 1 }, () => []);
  const visited = Array(n + 1).fill(false);
  const distance = Array(n + 1).fill(Infinity); // 출발 도시에서 각 도시까지 거리

  distance[s] = 0;
  visited[s] = true;

  for (const [start, end, cost] of arr) {
    costs[start].push({ end, cost });
  }

  for (const { end, cost } of costs[s]) {
    distance[end] = Math.min(distance[end], cost);
  }

  for (let i = 1; i <= n; i++) {
    let min = Infinity;
    let node = 0;

    // 방문하지 않은 도시 중 최단 거리 도시
    for (let j = 1; j <= n; j++) {
      if (!visited[j] && distance[j] < min) {
        min = distance[j];
        node = j;
      }
    }

    visited[node] = true;
    costs[node].forEach(({ end, cost }) => {
      if (!visited[end]) {
        distance[end] = Math.min(distance[end], distance[node] + cost);
      }
    });
  }

  return distance[e];
}

console.log(solution(n, m, arr, s, e));
