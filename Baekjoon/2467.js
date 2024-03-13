// 용액
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const N = parseInt(input[0]);
const arr = input[1].split(" ").map(Number);

function solution(N, arr) {
  let left = 0;
  let right = N - 1;
  let min = Infinity;
  const answer = [];

  while (left < right) {
    const sum = arr[left] + arr[right];

    if (Math.abs(sum) < min) {
      min = Math.abs(sum);
      answer[0] = arr[left];
      answer[1] = arr[right];
    }

    if (sum < 0) left++;
    else right--;
  }

  return answer.join(" ");
}

console.log(solution(N, arr));
