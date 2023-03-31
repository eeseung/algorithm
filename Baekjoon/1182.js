// 부분수열의 합
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [n, s] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

function combination(arr, selectNum) {
  const result = [];

  if (selectNum === 1) return arr.map(v => [v]);
  
  arr.forEach((fixed, i, arr) => {
    const rest = arr.slice(i + 1);
    const c = combination(rest, selectNum - 1).map(v => {
      v.unshift(fixed); // 메모리 초과 해결
      return v;
    });

    result.push(...c);
  })

  return result;
}

function solution(n, s, arr) {
  let answer = 0;

  for (let i = 1; i <= n; i++) {
    for (const cArr of combination(arr, i)) {
      const sum = cArr.reduce((acc, cur) => acc + cur, 0);
      if (sum === s) answer++;
    }
  }

  return answer;
}

console.log(solution(n, s, arr));
