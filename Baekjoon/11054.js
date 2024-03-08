// 가장 긴 바이토닉 부분 수열
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const N = parseInt(input[0]);
const arr = input[1].split(" ").map(Number);

function solution(N, arr) {
  const increaseDP = Array.from({ length: N }).fill(1);
  const decreaseDP = Array.from({ length: N }).fill(1);

  for (let i = 0; i < N; i++) {
    let max = 0;

    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) max = Math.max(max, increaseDP[j]);
    }
    increaseDP[i] = max + 1;
  }

  for (let i = N - 1; i >= 0; i--) {
    let min = 0;

    for (let j = i + 1; j < N; j++) {
      if (arr[i] > arr[j]) min = Math.max(min, decreaseDP[j]);
    }
    decreaseDP[i] = min + 1;
  }

  return Math.max(...increaseDP.map((v, i) => v + decreaseDP[i])) - 1;
}

console.log(solution(N, arr));
