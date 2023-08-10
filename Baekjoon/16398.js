// 행성 연결
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const N = parseInt(input[0]);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, arr) {
  const graph = [];
  const parent = Array.from({ length: N }, (_, i) => i);
  let answer = 0;

  for (let i = 0; i < N; i++) {
    for (let j = i; j < N; j++) {
      if (arr[i][j] > 0) {
        graph.push([i, j, arr[i][j]]);
      }
    }
  }

  graph.sort((a, b) => a[2] - b[2]);

  function find(x) {
    if (parent[x] === x) {
      return x;
    }
    return (parent[x] = find(parent[x]));
  }

  function union(a, b) {
    a = find(a);
    b = find(b);
    if (a < b) {
      parent[b] = a;
    } else {
      parent[a] = b;
    }
  }

  function compare(a, b) {
    return find(a) === find(b);
  }

  for (const [i, j, cost] of graph) {
    if (!compare(i, j)) {
      answer += cost;
      union(i, j);
    }
  }

  return answer;
}

console.log(solution(N, arr));
