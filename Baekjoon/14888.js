// 연산자 끼워넣기
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const n = parseInt(input[0]);
const arr = input[1].split(' ').map(Number);
const oArr = input[2].split(' ').map(Number);

// TODO: DFS로 풀어보기
function* permutation(arr) { // 메모리 초과 해결
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

function solution(n, arr, oArr) {
  const operators = ['+', '-', '*', '/'];
  const operatorArr = [];
  const answer = [-Infinity, Infinity];

  oArr.forEach((v, i) => {
    for (let j = 0; j < v; j++) {
      operatorArr.push(operators[i]);
    }
  })

  for (const p of permutation(operatorArr)) {
    let result = arr[0];

    for (let i = 0; i < n - 1; i++) {
      if (p[i] === operators[0]) result += arr[i + 1];
      else if (p[i] === operators[1]) result -= arr[i + 1];
      else if (p[i] === operators[2]) result *= arr[i + 1];
      else result = parseInt(result / arr[i + 1]);
    }

    answer[0] = Math.max(answer[0], result);
    answer[1] = Math.min(answer[1], result);
  }

  return answer.map(v => v ? v : 0).join('\n'); // 자바스크립트의 Number는 0을 +0, -0으로 표현할 수 있기 때문에 부호 생략하기
}

console.log(solution(n, arr, oArr));
