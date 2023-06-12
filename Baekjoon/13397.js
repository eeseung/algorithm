// 구간 나누기 2
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test.txt')
  .toString()
  .trim()
  .split('\n');
const [N, M] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

function solution(N, M, arr) {
  let min = Infinity, max = -Infinity;

  for (let i = 0; i < N; ++i) {
    min = Math.min(min, arr[i]);
    max = Math.max(max, arr[i]);
  }

  function isValid(value) {
    let count = 1;
    let min = arr[0];
    let max = arr[0];

    for (let i = 1; i < N; ++i) {
      if (arr[i] < min) min = arr[i];
      else if (arr[i] > max) max = arr[i];

      if (max - min > value) {
        count += 1;
        min = arr[i];
        max = arr[i];
      }
    }

    return count <= M;
  }

  let left = 0;
  let right = max - min;
  let answer = -1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (isValid(mid)) {
      right = mid - 1;
      answer = mid;
    } else {
      left = mid + 1;
    }
  }

  return answer;
}

console.log(solution(N, M, arr));
