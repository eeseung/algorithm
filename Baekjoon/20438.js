// 출석체크
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = parseInt(input[0].split(' ')[0]);
const kArr = input[1].split(' ').map(Number);
const qArr = input[2].split(' ').map(Number);
const mArr = input.slice(3).map(v => v.split(' ').map(Number));

function solution(n, kArr, qArr, mArr) {
  const student = qArr.filter(q => !kArr.includes(q)); // 출석 코드를 보낼 학생
  const preSum = [0, 0, 0]; // 출석 코드를 받은 학생의 누적 합
  const answer = [];

  for (let i = 3; i <= n + 2; i++) {
    preSum[i] = preSum[i - 1];
    if (kArr.includes(i)) continue; // 졸고있는 학생이면 통과

    for (const s of student) {
      if (i % s === 0) { // 출석 코드 받는 경우 +1
        preSum[i] += 1;
        break;
      }
    }
  }

  for (const [s, e] of mArr) {
    answer.push(e - s + 1 - (preSum[e] - preSum[s - 1]));
  }

  return answer.join('\n');
}

console.log(solution(n, kArr, qArr, mArr));
