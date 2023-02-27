// 꽃길
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = parseInt(input[0]);
const prices = input.slice(1).map(v => v.split(' ').map(Number));

const dx = [0, 0, 0, -1, 1];
const dy = [0, -1, 1, 0, 0];

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

function isFlowerRoad(n, arr) {
  const planted = Array.from(Array(n + 1), () => Array(n + 1).fill(0));

  for (const [y, x] of arr) {
    for (let i = 0; i < 5; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 1 && nx <= n && ny >= 1 && ny <= n) planted[ny][nx] = 1; 
    }
  }

  return planted.reduce((acc, cur) => acc + cur.reduce((a, c) => a + c, 0), 0) === 15;
}

function solution(n, arr) {
  const seeds = []; // (2,2) ~ (n-1,n-1)
  let answer = Infinity;

  for (let i = 2; i < n; i++) {
    for (let j = 2; j < n; j++) {
      seeds.push([i, j]);
    }
  }

  for (const seed of combination(seeds, 3)) {
    if (isFlowerRoad(n, seed)) {
      let price = 0;
  
      for (const s of seed) {
        for (let i = 0; i < 5; i++) {
          const nx = s[1] + dx[i];
          const ny = s[0] + dy[i];

          price += arr[ny - 1][nx - 1];
        }
      }

      answer = Math.min(answer, price);
    }
  }

  return answer;
}

console.log(solution(n, prices));
