// 같은 수로 만들기
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const n = parseInt(input[0]);
const arr = input.slice(1).map(Number);

function solution(n, arr) {
  const max = Math.max(...arr);
  const stack = [];
  let answer = 0;

  for (let i = 0; i < n; i++) {
    if (stack.length === 0) {
      stack.push(arr[i]);
    } else {
      if (stack[stack.length - 1] < arr[i]) {
        answer += arr[i] - stack.pop();
        stack.push(arr[i]);
      } else if (stack[stack.length - 1] > arr[i]) {
        stack.pop();
        stack.push(arr[i]);
      }
    }
  }

  answer += stack.reduce((acc, cur) => acc + max - cur, 0);

  return answer;
}

console.log(solution(n, arr));
