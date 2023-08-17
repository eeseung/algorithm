// 가르침
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, K] = input[0].split(" ").map(Number);
const arr = input.slice(1);

function combination(arr, selectNum) {
  const result = [];

  if (selectNum === 1) return arr.map((v) => [v]);

  arr.forEach((fixed, i, arr) => {
    const rest = arr.slice(i + 1);
    const c = combination(rest, selectNum - 1).map((v) => {
      v.unshift(fixed); // 메모리 초과 해결
      return v;
    });

    result.push(...c);
  });

  return result;
}

function solution(N, K, arr) {
  if (K < 5) return 0;

  const letters = [
    "b",
    "d",
    "e",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "o",
    "p",
    "q",
    "r",
    "s",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const letterCombinations = combination(letters, K - 5);
  const splitedStrs = [];
  let answer = 0;

  for (const str of arr) {
    splitedStrs.push(str.replace(/a|n|t|i|c/g, "").split("")); // anta-tica
  }

  answer += splitedStrs.filter((str) => str.length === 0).length;

  for (const letterCombination of letterCombinations) {
    let count = 0;
    for (const splitedStr of splitedStrs) {
      if (splitedStr.every((str) => letterCombination.includes(str))) count++;
    }
    answer = Math.max(answer, count);
  }

  return answer;
}

console.log(solution(N, K, arr));
