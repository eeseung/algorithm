// 우체국
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const N = parseInt(input[0]);
const arr = input
  .slice(1)
  .map((v) => v.split(" ").map(Number))
  .sort((a, b) => a[0] - b[0]);

function solution(N, arr) {
  const peopleCount = arr.reduce((acc, cur) => acc + cur[1], 0);
  let sum = 0;

  // 마을 전체 사람 수의 절반보다 크거나 같은 지점 -> 우체국
  for (let i = 0; i < N; i++) {
    const [pos, count] = arr[i];
    sum += count;
    if (peopleCount / 2 <= sum) return pos;
  }

  return arr[N - 1][0];
}

console.log(solution(N, arr));
