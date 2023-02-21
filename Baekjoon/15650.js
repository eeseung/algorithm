// N과 N (2)
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);

function combination(arr, selectNum) {
  const result = [];

  if (selectNum === 1) return arr.map(v => [v]);

  arr.forEach((fixed, i, arr) => {
    const rest = arr.slice(i + 1);
    const c = combination(rest, selectNum - 1);
    const r = c.map(v => [fixed, ...v]);

    result.push(...r);
  })

  return result;
}

function solution(n, m) {
  const nums = Array.from({length: n}, (v, i) => i + 1);
  const answer = combination(nums, m);
  
  return answer.map(v => v.join(' ')).join('\n');
}

console.log(solution(n, m));
