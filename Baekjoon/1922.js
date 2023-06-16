// 네트워크 연결
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const N = parseInt(input[0]);
const M = parseInt(input[1]);
const arr = input.slice(2).map((v) => v.split(" ").map(Number));

function solution(N, M, arr) {
  const sortedCosts = arr.sort((a, b) => a[2] - b[2]);
  const parent = Array.from({ length: N }, (_, i) => i);
  let answer = 0;

  // 최상위 원소 찾기
  function find(parent, x) {
    if (parent[x] === x) {
      return x;
    }

    // 경로 압축 최적화
    return (parent[x] = find(parent, parent[x]));
  }

  // 두 원소 합치기
  function union(parent, a, b) {
    a = find(parent, a);
    b = find(parent, b);
    if (a < b) {
      parent[b] = a;
    } else {
      parent[a] = b;
    }
  }

  // 두 원소가 같은 집합인지 검사
  function compare(parent, a, b) {
    a = find(parent, a);
    b = find(parent, b);
    return a === b;
  }

  for (const [a, b, cost] of sortedCosts) {
    if (!compare(parent, a, b)) {
      answer += cost;
      union(parent, a, b);
    }
  }

  return answer;
}

console.log(solution(N, M, arr));
