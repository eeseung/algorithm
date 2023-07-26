// 여행 가자
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const N = parseInt(input[0]);
const M = parseInt(input[1]);
const arr = input.slice(2, 2 + N).map((v) => v.split(" ").map(Number));
const pArr = input[N + 2].split(" ").map((v) => v - 1);

function solution(N, M, arr, pArr) {
  const parent = Array.from({ length: N }, (_, i) => i);

  function find(parent, x) {
    if (parent[x] === x) {
      return x;
    }
    parent[x] = find(parent, parent[x]);
    return parent[x];
  }

  function union(parent, a, b) {
    a = find(parent, a);
    b = find(parent, b);
    if (a < b) {
      parent[b] = a;
    } else {
      parent[a] = b;
    }
  }

  function compare(parent, a, b) {
    a = find(parent, a);
    b = find(parent, b);
    return a === b;
  }

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (arr[i][j] === 1) union(parent, i, j);
    }
  }

  for (let i = 1; i < M; i++) {
    if (!compare(parent, pArr[i - 1], pArr[i])) {
      return "NO";
    }
  }

  return "YES";
}

console.log(solution(N, M, arr, pArr));
