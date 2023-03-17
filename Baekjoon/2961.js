// 도영이가 만든 맛있는 음식
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = parseInt(input[0]);
const arr = input.slice(1).map(v => v.split(' ').map(Number));

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

function solution(n, arr) {
  let answer = Infinity;

  for (let i = 1; i <= n; i++) {
    const cArr = combination(arr, i);

    for (const c of cArr) {
      let sSum = 1;
      let bSum = 0;

      for (const [s, b] of c) {
        sSum *= s;
        bSum += b;
      }

      answer = Math.min(Math.abs(sSum - bSum), answer);
    }
  }

  return answer;
}

console.log(solution(n, arr));
