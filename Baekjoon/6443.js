// 애너그램
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const N = parseInt(input[0]);
const arr = input.slice(1).map((v) => v.split("").sort());

function solution(N, arr) {
  const answer = [];

  function dfs(str, idx) {
    if (idx === str.length - 1) {
      answer.push(str.join(""));
      return;
    }

    for (let i = idx; i < str.length; i++) {
      if (i !== idx && str[i] === str[idx]) {
        continue;
      }
      if (str[i] !== str[idx]) {
        [str[i], str[idx]] = [str[idx], str[i]];
      }
      dfs([...str], idx + 1);
    }
  }

  for (const word of arr) {
    dfs(word, 0);
  }

  return answer.join("\n");
}

console.log(solution(N, arr));
