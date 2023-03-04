// N과 M (9)
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [_, m] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').sort((a, b) => a - b);

function permutation(arr, selectNum) {
  const result = [];

  if (selectNum === 1) return arr.map(v => [v]);

  arr.forEach((fixed, i, arr) => {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const permutationArr = permutation(rest, selectNum - 1).map(v => [fixed, ...v]);
    
    result.push(...permutationArr);
  })

  return result;
}

function solution(n, arr) {
  const nums = permutation(arr, n).join('|').split('|');
  const answer = [...new Set(nums)].map(v => v.split(',').join(' ')).join('\n');

  return answer;
}

console.log(solution(m, arr));
