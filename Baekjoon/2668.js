// 숫자고르기
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const N = parseInt(input[0]);
const arr = [0, ...input.slice(1).map(Number)];

function solution(N, arr) {
  const visited = Array(N + 1).fill(false);
  let check = [];
  const answer = [];

  function dfs(v, target) {
    if (check[v]) return false;
    if (!visited[v]) {
      visited[v] = true;
      return dfs(arr[v], target);
    }

    if (v === target) {
      return true;
    }
    return false;
  }

  for (let i = 1; i <= N; i++) {
    const isCycle = dfs(i, i);

    if (isCycle) {
      for (let j = 1; j <= N; j++) {
        if (visited[j]) {
          check[j] = true;
        }
      }
    }

    visited.fill(false);
  }

  for (let i = 1; i < check.length; i++) {
    if (check[i]) {
      answer.push(i);
    }
  }

  return [answer.length, ...answer].join("\n");
}

console.log(solution(N, arr));
