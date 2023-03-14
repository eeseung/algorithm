// N과 M (10)
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number).sort((a, b) => a - b);

function solution(m, arr) {
  const answer = new Set();

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

  for (const c of combination(arr, m)) {
    answer.add(c.toString()); // 문자열로 set 추가
  }
  
  return [...answer].map(v => v.split(',').join(' ')).join('\n');
}

console.log(solution(m, arr));
