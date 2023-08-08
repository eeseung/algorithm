// 기차가 어둠을 헤치고 은하수를
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, M, arr) {
  const trains = Array.from({ length: N }, () => Array(20).fill(0)); // 0 -> 사람 X, 1 -> 사람 O
  const answer = new Set();

  function command(num, i, x) {
    if (num === 1) {
      trains[i][x] = 1;
    } else if (num === 2) {
      trains[i][x] = 0;
    } else if (num === 3) {
      for (let k = 19; k > 0; k--) {
        trains[i][k] = trains[i][k - 1];
      }
      trains[i][0] = 0;
    } else if (num === 4) {
      for (let k = 0; k < 19; k++) {
        trains[i][k] = trains[i][k + 1];
      }
      trains[i][19] = 0;
    }
  }

  for (const [num, i, x] of arr) {
    command(num, i - 1, x - 1);
  }

  for (let i = 0; i < N; i++) {
    answer.add(trains[i].join(""));
  }

  return answer.size;
}

console.log(solution(N, M, arr));
