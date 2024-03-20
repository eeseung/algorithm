// 도시 건설
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, M, arr) {
  const sortedArr = arr.sort((a, b) => a[2] - b[2]);
  const parent = Array.from({ length: N + 1 }, (_, i) => i);
  let answer = arr.reduce((acc, cur) => acc + cur[2], 0);

  function find(x) {
    if (parent[x] === x) return x;
    return (parent[x] = find(parent[x]));
  }

  function union(a, b) {
    a = find(a);
    b = find(b);
    if (a < b) parent[b] = a;
    else parent[a] = b;
  }

  function compare(a, b) {
    a = find(a);
    b = find(b);
    return a === b;
  }

  for (const [a, b, c] of sortedArr) {
    if (!compare(a, b)) {
      answer -= c;
      union(a, b);
    }
  }

  return parent.filter((e, i) => i > 0 && e === i).length > 1 ? -1 : answer;
}

console.log(solution(N, M, arr));
