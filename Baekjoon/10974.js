// 모든 순열
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

function permutation(arr, selectNum) {
  const result = [];

  if (selectNum === 1) return arr.map(v => [v]);

  arr.forEach((fixed, i, arr) => {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const p = permutation(rest, selectNum - 1);
    const r = p.map(v => [fixed, ...v]);

    result.push(...r);
  })

  return result;
}

function solution(n) {
  const nums = Array.from({length: n}, (v, i) => i + 1);
  const answer = permutation(nums, nums.length);

  return answer.map(v => v.join(' ')).join('\n');
}

console.log(solution(input));
