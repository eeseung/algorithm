// 뱀과 사다리 게임
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const nArr = input.slice(1, N + 1).map((v) => v.split(" ").map(Number));
const mArr = input.slice(N).map((v) => v.split(" ").map(Number));

function solution(N, M, nArr, mArr) {
  const board = Array.from({ length: 101 }, (_, i) => i);
  const answer = new Array(101).fill(-1);
  const queue = [1];
  answer[1] = 0;

  for (const [x, y] of nArr) {
    board[x] = y;
  }

  for (const [u, v] of mArr) {
    board[u] = v;
  }

  while (queue.length) {
    const cur = queue.shift();

    for (let i = 1; i <= 6; i++) {
      let next = cur + i;

      if (next > 100) continue;
      next = board[next];

      if (answer[next] < 0) {
        answer[next] = answer[cur] + 1;
        queue.push(next);
      }
    }
  }

  return answer[100];
}

console.log(solution(N, M, nArr, mArr));
