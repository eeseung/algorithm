// 꿀 따기
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const N = parseInt(input[0]);
const arr = [0, ...input[1].split(" ").map(Number)];

function solution(N, arr) {
  const sum = Array(N + 1).fill(0); // 구간 합

  for (let i = 1; i <= N; i++) {
    sum[i] += sum[i - 1] + arr[i];
  }

  // 벌통 첫번째 위치, 벌 한마리는 마지막 위치
  const firstBeeSum1 = sum[N] - arr[N];
  let secondBeeSum1 = -100000;
  for (let i = 2; i < N; i++) {
    secondBeeSum1 = Math.max(secondBeeSum1, sum[i] - arr[i] * 2);
  }

  // 벌통 마지막 위치, 벌 한마리는 첫번째 위치
  const firstBeeSum2 = sum[N] - arr[1];
  let secondBeeSum2 = -100000;
  for (let i = 2; i < N; i++) {
    secondBeeSum2 = Math.max(secondBeeSum2, sum[N] - sum[i] - arr[i]);
  }

  // 벌통 가운데 위치
  const beeSum3 =
    arr.slice(2, N).reduce((acc, cur) => acc + cur, 0) +
    Math.max(...arr.slice(2, N));

  return Math.max(
    firstBeeSum1 + secondBeeSum1,
    firstBeeSum2 + secondBeeSum2,
    beeSum3
  );
}

console.log(solution(N, arr));
