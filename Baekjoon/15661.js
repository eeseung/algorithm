// 링크와 스타트
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
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
  const nArr = Array.from({length: n}, (_, i) => i + 1);
  const sumArr = [];
  let answer = Infinity;

  for (let i = 2; i < n - 1; i++) {
    for (const team of combination(nArr, i)) { // 팀 조합
      let sum = 0;

      for (let i = 0; i < team.length; i++) {
        for (let j = 0; j < team.length; j++) {
          sum += arr[team[i] - 1][team[j] - 1];
        }
      }

      sumArr.push(sum);
    }
  }

  for (let i = 0; i <= sumArr.length / 2; i++) {
    answer = Math.min(answer, Math.abs(sumArr[sumArr.length - 1 - i] - sumArr[i]));
  }

  return answer;
}

console.log(solution(n, arr));
