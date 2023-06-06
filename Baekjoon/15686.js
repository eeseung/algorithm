// 치킨 배달
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [N, M] = input[0].split(' ').map(Number);
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

function solution(N, M, arr) {
  const houseArr = [];
  const chickenArr = [];
  let answer = Infinity;

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (arr[r][c] === 1) houseArr.push([r + 1, c + 1]);
      if (arr[r][c] === 2) chickenArr.push([r + 1, c + 1]);
    }
  }

  for (const cArr of combination(chickenArr, M)) {
    let dist = 0;

    for (const [houseR, houseC] of houseArr) {
      const chickenDist = [];
      for (const [chickenR, chickenC] of cArr) {
        chickenDist.push(Math.abs(chickenR - houseR) + Math.abs(chickenC - houseC));
      }
      dist += Math.min(...chickenDist);
    }

    answer = Math.min(answer, dist);
  }

  return answer;
}

console.log(solution(N, M, arr));
