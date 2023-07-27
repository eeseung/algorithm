// 나머지 합
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

function solution(N, M, arr) {
  const sum = Array(N + 1).fill(0);
  const remainder = Array(M).fill(0);
  let answer = 0;

  for (let i = 1; i <= N; i++) {
    sum[i] = (sum[i - 1] + arr[i - 1]) % M;
    if (sum[i] === 0) answer++;
    else remainder[sum[i]]++;
  }

  answer += (answer * (answer - 1)) / 2;

  for (const num of remainder) {
    if (num > 1) answer += (num * (num - 1)) / 2;
  }

  return answer;
}

console.log(solution(N, M, arr));
