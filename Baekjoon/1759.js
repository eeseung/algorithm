// 암호 만들기
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [L, C] = input[0].split(" ").map(Number);
const arr = input[1].split(" ");

function combination(arr, selectNum) {
  const result = [];

  if (selectNum === 1) return arr.map((v) => [v]);

  arr.forEach((fixed, i, arr) => {
    const rest = arr.slice(i + 1);
    const c = combination(rest, selectNum - 1);
    const r = c.map((v) => [fixed, ...v]);

    result.push(...r);
  });

  return result;
}

function solution(L, C, arr) {
  const VOWELS = ["a", "e", "i", "o", "u"];
  const vowels = arr.filter((v) => VOWELS.includes(v));
  const consonants = arr.filter((v) => !VOWELS.includes(v));
  const answer = [];

  if (vowels.length < 1 || consonants.length < 2) return "";

  for (let i = 1; i <= L - 2; i++) {
    for (const vowelsC of combination(vowels, i)) {
      for (const consonantsC of combination(consonants, L - i)) {
        answer.push(vowelsC.concat(consonantsC).sort().join(""));
      }
    }
  }

  return answer.sort().join("\n");
}

console.log(solution(L, C, arr));
