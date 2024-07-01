// 연산 최대로
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const N = parseInt(input[0]);
const arr = input[1].split(' ').map(Number);
const [P, Q] = input[2].split(' ').map(Number);

function combination(arr, selectNum) {
  const result = [];

  if (selectNum === 1) return arr.map((v) => [v]);

  arr.forEach((fixed, i, arr) => {
    const rest = arr.slice(i + 1);
    const c = combination(rest, selectNum - 1).map((v) => {
      v.unshift(fixed);
      return v;
    });

    result.push(...c);
  });

  return result;
}

function* permutation(arr) {
  if (arr.length === 1) yield arr;
  else {
    const [fixed, ...rest] = arr;

    for (const p of permutation(rest)) {
      for (let i = 0; i < arr.length; i++) {
        yield [...p.slice(0, i), fixed, ...p.slice(i)];
      }
    }
  }
}

function solution(N, arr, P, Q) {
  const index = Array.from({ length: N - 1 }, (_, i) => i); // 곱하기 연산자 인덱스
  let answer = 0;

  if (P === 0) return arr.reduce((acc, cur) => acc * cur, 1);
  if (Q === 0) return arr.reduce((acc, cur) => acc + cur, 0);

  for (const pArr of permutation(arr, N)) {
    for (const indexC of combination(index, Q)) {
      let result = 0;
      let plusSum = 0;
      let qi = 0;

      for (let i = 0; i < N; i++) {
        plusSum += pArr[i];
        if (i === indexC[qi]) {
          result = (result === 0 ? 1 : result) * plusSum;
          plusSum = 0;
          qi += 1;
        }
      }
      result = (result === 0 ? 1 : result) * plusSum;
      answer = Math.max(answer, result);
    }
  }

  return answer;
}

console.log(solution(N, arr, P, Q));
