// 선발 명단
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const C = parseInt(input[0]);

function solution(arr) {
  const visited = Array(11).fill(false);
  const answer = [];

  function dfs(playerNum, sum) {
    for (let i = 0; i < 11; i++) {
      if (!visited[i] && arr[playerNum][i] > 0) {
        visited[i] = true;
        dfs(playerNum + 1, sum + arr[playerNum][i]);
        visited[i] = false;
      }
    }

    if (visited.every((v) => v === true)) {
      answer.push(sum);
    }
  }

  dfs(0, 0);

  return Math.max(...answer);
}

for (let i = 1; i < C * 11; i += 11) {
  const arr = input.slice(i, i + 11).map((v) => v.split(" ").map(Number));

  console.log(solution(arr));
}
