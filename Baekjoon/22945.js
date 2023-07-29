// 팀 빌딩
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const N = parseInt(input[0]);
const arr = input[1].split(" ").map(Number);

function solution(N, arr) {
  let start = 0,
    end = N - 1;
  let answer = 0;

  while (start <= end) {
    answer = Math.max(
      answer,
      (end - start - 1) * Math.min(arr[start], arr[end])
    );

    if (arr[start] < arr[end]) start++;
    else end--;
  }

  return answer;
}

console.log(solution(N, arr));
