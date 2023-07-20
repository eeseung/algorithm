// 세 용액
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const N = parseInt(input[0]);
const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

function solution(N, arr) {
  let min = Infinity;
  let answer = [];

  for (let i = 0; i < N - 2; i++) {
    let left = i + 1;
    let right = N - 1;

    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right];

      if (Math.abs(sum) < min) {
        min = Math.abs(sum);
        answer = [arr[i], arr[left], arr[right]];
      }
      if (sum < 0) left++;
      else right--;
    }
  }

  return answer.join(" ");
}

console.log(solution(N, arr));
