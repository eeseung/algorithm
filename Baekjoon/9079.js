// 동전 게임
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const t = input[0];

for (let i = 0; i < t; i++) {
  const coins = [];

  for (let j = 0; j < 3; j++) {
    const arr = input[1 + i * 3 + j].split(' ');
    
    arr.forEach((v, i) => {
      if (v === 'T') arr[i] = 1;
      if (v === 'H') arr[i] = 0;
    })
    coins.push(arr);
  }

  console.log(solution(coins));
}

function solution(arr) {
  let answer = Infinity;

  for (let bitMask = 0; bitMask < 2 ** 8; bitMask++) {
    const copyArr = arr.map(v => [...v]); // 2차원 배열 깊은 복사
    const changeBit = bitMask.toString(2).padStart(8, '0').split('1').length - 1;
    let sum;

    if (answer < changeBit) continue;
    
    // 행
    for (let row = 0; row < 3; row++) {
      const changeBitMask = bitMask & (1 << row);
      if (changeBitMask) {
        for (let col = 0; col < 3; col++) {
          copyArr[row][col] = (copyArr[row][col] + 1) % 2;
        }
      }
    }

    // 열
    for (let col = 0; col < 3; col++) {
      const changeBitMask = bitMask & (1 << (col + 3))
      if (changeBitMask) {
        for (let row = 0; row < 3; row++) {
          copyArr[row][col] = (copyArr[row][col] + 1) % 2;
        }
      }
    }

    // 오른쪽 아래 대각선
    const change2 = bitMask & (1 << 6);
    if (change2) {
      for (let row = 0; row < 3; row++) {
        copyArr[row][row] = (copyArr[row][row] + 1) % 2;
      }
    }

    // 왼쪽 아래 대각선
    const change3 = bitMask & (1 << 7)
    if (change3) {
      for (let row = 0; row < 3; row++) {
        copyArr[row][2 - row] = (copyArr[row][2 - row] + 1) % 2;
      }
    }

    sum = copyArr.flat().filter(e => e === 0).length;
    if (sum === 0 || sum === 9) answer = changeBit; // 모두 같은 면이 보이면 연산 횟수 저장
  }
  
  return answer === Infinity ? -1 : answer;
}
