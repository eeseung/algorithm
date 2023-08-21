// 친구비
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, _, k] = input[0].split(" ").map(Number);
const costs = [0, ...input[1].split(" ").map(Number)];
const friends = input.slice(2).map((v) => v.split(" ").map(Number));

function solution(N, k, costs, friends) {
  const parents = Array.from({ length: N + 1 }, (_, i) => i);
  const visited = Array.from({ length: N + 1 }).fill(false);
  let answer = 0;

  function find(parent, x) {
    if (parent[x] === x) {
      return x;
    }
    return (parent[x] = find(parent, parent[x]));
  }

  function union(parents, a, b) {
    a = find(parents, a);
    b = find(parents, b);
    if (a < b) {
      parents[b] = a;
    } else {
      parents[a] = b;
    }
  }

  function compare(parents, a, b) {
    a = find(parents, a);
    b = find(parents, b);
    return a === b;
  }

  for (const [v, w] of friends) {
    union(parents, v, w);
  }

  for (let i = 1; i <= N; i++) {
    let cost = costs[i];
    if (visited[i]) continue;
    for (let j = 1; j <= N; j++) {
      if (compare(parents, i, j)) {
        cost = Math.min(cost, costs[j]);
        visited[j] = true;
      }
    }
    answer += cost;
    visited[i] = true;
  }

  return k >= answer ? answer : "Oh no";
}

console.log(solution(N, k, costs, friends));
