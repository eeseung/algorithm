// 줄어드는 수
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const N = parseInt(input[0]);

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

function solution(N) {
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const answer = [];

  for (let i = 1; i <= 10; i++) {
    for (const c of combination(nums, i)) {
      answer.push(c.sort((a, b) => b - a).join(''));
    }
  }

  answer.sort((a, b) => Number(a) - Number(b));

  return answer[N - 1] ? answer[N - 1] : -1;
}

console.log(solution(N));
