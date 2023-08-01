// 괄호 추가하기
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const N = parseInt(input[0]);
const arr = input[1].split("");

function calculate(op, a, b) {
  if (op === "+") {
    return a + b;
  } else if (op === "-") {
    return a - b;
  } else if (op === "*") {
    return a * b;
  }
}

function solution(N, arr) {
  const numbers = [];
  const operators = [];
  let answer = -Infinity;

  for (let i = 0; i < N; i++) {
    if (i % 2 === 0) numbers.push(Number(arr[i]));
    else operators.push(arr[i]);
  }

  function addBracket(idx, num) {
    if (idx === numbers.length - 1) {
      answer = Math.max(answer, num);
      return;
    }

    addBracket(idx + 1, calculate(operators[idx], num, numbers[idx + 1]));

    if (idx + 2 < numbers.length) {
      const temp = calculate(
        operators[idx + 1],
        numbers[idx + 1],
        numbers[idx + 2]
      );
      addBracket(idx + 2, calculate(operators[idx], num, temp));
    }
  }

  addBracket(0, numbers[0]);

  return answer;
}

console.log(solution(N, arr));
